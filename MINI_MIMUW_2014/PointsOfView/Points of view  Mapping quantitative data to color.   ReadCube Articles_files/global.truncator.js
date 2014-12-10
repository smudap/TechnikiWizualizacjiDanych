var com = com || {};
com.nature = com.nature || {};
com.nature.Truncator = (function ($) {
	var openTags = [];
	var closedTags = [];
	var selfClosingTags = {area: 1, base: 1, br: 1, col: 1, command: 1, embed: 1, hr: 1, img: 1, input: 1, keygen: 1, link: 1, meta: 1, param: 1, source: 1, track: 1, wbr: 1};
	var elMap = []; // map of DOM fragment
	var sentences = []; // sentences found
	var lastHaystackEl = null; // detect parsed DOM
	var contNonTermRegex = [ // non-sentence-stopping phrases with a "." in them
			/* e.g. <i>C. elegans</i> */
			/\x00[A-Z]\x00?\.\x00?\s+\x00?\w+(\s+\w+)?\.?\x00/g,
			/* e.g., i.e., etc. */
			/\b(e\.?g|i\.?e|cf|viz|sic|vs|gen|fam|sp)\.\W/g,
			/* e.g. Ref. 4, Fig. S4, fig.<span="mb">&thinsp;</span>4 */
			/\b[Ff]igs?\.\x00*\s+\x00*S?[1-9]/g,
			/\b[Rr]efs?\.\x00*\s+\x00*[1-9]/g,
			/* e.g. dotted initials */
			/\s(?!\s)\W?(?:[A-Z]\.\s)+(?=[A-Z]\w+)/g,
			/* Phrases in braces (nested up to 4 levels) */
			/\((?:\((?:\((?:\((?:\(.*?\)|.)*?\)|.)*?\)|.)*?\)|.)*?\)/g
		];
	var midSentenceMatch = '((?!\\x00)\\W)*((\\x00[0-9]+|\\x00,\\s*|\\x00)+|\\s*)((?!\\x00\\s)\\W)*([0-9a-z]|;\\s*\\w)';
	var contTermRegex = [ // non-sentence-stopping phrases that terminate with a "." but may appear at the end of a sentence anyway
			/* e.g. Smith et al., gen. et sp. nov. */
			new RegExp('\\b(et\\s+al|nov)\\x00*\\.' + midSentenceMatch, 'g'),
			/* e.g. etc. */
			new RegExp('\\b(etc|Inc)\\.' + midSentenceMatch, 'g'),
			/* dotted abbreviations e.g. p.p.t.v., J.F.K. */
			new RegExp('\\b(\\w\\.){2,}' + midSentenceMatch, 'g')
		];
	var sentRegex = /.*?[^\s].[?!.](((?!\x00)\W)*(\x00+([0-9]+|,\s*))+(\x00((?![\s\x00])\W)+|(?=\x00)|)|((?![\s\x00])\W)*(\s+|$))/g; // finds sentences, without lookbehind
	var ellipsis = '&hellip;';
	var defaultContextChars = 150; // how near needle to look for sentences
	var reachedEnd = false;
	var getTrailing = function (context, pos, chars) {
		var inOpenTag = false;
		var inCloseTag = false;
		var inAttr = false;
		var inEntity = false;
		var out = [];
		var len = context.length;
		var keepLooking = true;
		while (pos < len && keepLooking) {
			var c = context.charAt(pos);
			if (c === '<') {
				var tag = context.substring(pos, context.indexOf('>', pos) + 1).toLowerCase();
				var parts = /<\s*(\/)?([^\s>]+)/.exec(tag);
				var isCloseTag = !!parts[1];
				var tagName = parts[2];
				if (isCloseTag) {
					if (openTags.length) {
						openTags.pop();
					} else {
						closedTags.unshift(tagName);
					}
					inCloseTag = true;
				} else {
					if (!(tagName in selfClosingTags)) {
						openTags.push(tagName);
					}
					inOpenTag = true;
				}
			} else if (c === '>') {
				inOpenTag = false;
				inCloseTag = false;
			} else if (c === '"' && inOpenTag && !inAttr) {
				inAttr = true;
			} else if (c === '"' && inOpenTag && inAttr) {
				inAttr = false;
			} else if (c === ';' && inEntity) {
				inEntity = false;
			} else if (!inOpenTag && !inCloseTag && !inAttr && !inEntity) {
				if (c === '&') {
					inEntity = true;
				}
				if (chars) {
					--chars;
					if (chars === 0) {
						keepLooking = false;
					}
				} else {
					if (c === '.') {
						if (pos > 2) {
							var prev = context.substring(0, pos);
							if (!prev.match(/((et al(<\/i>)?)|(fig)|(ref))$/i)) {
								keepLooking = false;
							}
						} else {
							keepLooking = false;
						}
					} else if (c === '!' || c === '?') {
						keepLooking = false;
					}
				}
			}
			out.push(c);
			++pos;
		}
		var n = out.length - 1;
		if (out[n] === '.' || out[n] === '?' || out[n] === '!') {
			out.pop();
		}
		if (keepLooking) {
			reachedEnd = true;
		}
		return out.join('');
	};
	// get context, without parsing HTML
	var getContextSnippet = function ($haystack, $needle, leadingchars, trailingchars) {
		"use strict";
		var newContext, fragLength, incr, sInit, sOver, leadEllipsis, trailEllipsis, allIds, preserveNodes, needleFound, needleAncestors, afterNeedleIdx, needleNodes, el2, textIds, sentenceStart, sentenceEnd, el, chars, init, overflow, clear, i, j, k, finalNodeParents, directions, direction;
		// Map some DOM nodes, recursively
		function mapNodes(el, path) {
			var id2, path2;
			path = (undefined === path) ? [ -1 ] : path;
			$(el).contents().each(function () {
				if (3 === this.nodeType || 1 === this.nodeType) { // ignore comments etc
					id2 = elMap.push({
						id: elMap.length,
						type: this.nodeType,
						src: ((3 === this.nodeType) ? this.nodeValue : null),
						ancestors: path,
						textIds: [],
						out: null, // output
						node: this
					}) - 1;
					if (1 === this.nodeType) {
						path2 = path.slice(0);
						path2.unshift(id2);
						mapNodes(this, path2); // recurse
					}
					else if (3 === this.nodeType) {
						for (i = 0;i < path.length - 1;i++) {
							elMap[path[i]].textIds.push(id2); // text within
						}
					}
				}
			});
		}
		// Get the location of innerHtml in an tag in the elMap (assume well-formed end tag)
		function mapInnerHtml(el) {
			var $el;
			el.out = true; // Flag for output by default, but may be later cleared
			if (el.src === null) {
				$el = $(el.node);
				el.src = $el.clone().wrap('<div>').parent().html(); // outerHtml
				el.name = el.node.tagName.toLowerCase();
				el.length = el.src.length;
				el.innerEnd = el.src.lastIndexOf('<') - 1;
				el.innerStart = el.innerEnd - $el.html().length + 1;
			}
		}
		// make a plain text version of the elMap, locate tag start/end and insert a marker for it
		function getMarkedText() {
			var tmp, text;
			text = '';
			for (i = 0;i < elMap.length;i++) {
				el = elMap[i];
				el.start = text.length;
				if (3 === el.type) {
					text += '\x00';
					tmp = el.src;
					text += tmp;
					el.end = el.start + el.src.length;
				}
				else {
					el.end = el.start;
				}
			}
			return text;
		}
		// Escape continuation phrases, then parse text for sentences (using Regexes)
		function findSentences(text) {
			var i, j, k, rxRes, contRegexes, contRegex;
			function replaceCont(str) {
				return str.replace(/\./g, '_');
			}
			text = text.replace(/[\n\f\r]/g, ' '); // Standardise whitespace
			contRegexes = [ contNonTermRegex, contTermRegex ];
			for (k = 0; k < contRegexes.length; k++) {
				contRegex = contRegexes[k];
				for (i = 0;i < contRegex.length;i++) {
					text = text.replace(contRegex[i], replaceCont);
				}
			}
			sentRegex.lastIndex = 0;
			sentences = [];
			while (null !== (rxRes = sentRegex.exec(text))) {
				sentences.push([rxRes[0], rxRes.index, sentRegex.lastIndex]);
			}
			//for (i = 0;i < sentences.length;i++) { console.log(sentences[i][0].replace(/\x00/g, '`'), sentences[i][1], sentences[i][2]); }
			return sentences;
		}
		// find the needle
		function findNeedleNodes() {
			var i, needleNodes, needleEl;
			needleNodes = [];
			needleEl = $needle.get(0);
			for (i = 0;i < elMap.length;i++) {
				if (elMap[i].node === needleEl) {
					needleNodes = [ i ];
					break;
				}
			}
			// Find all the child nodes too
			if (0 !== needleNodes.length) {
				for (i = needleNodes.length; i < elMap.length; i++) {
					if (-1 !== $.inArray(needleNodes[0], elMap[i].ancestors)) {
						needleNodes.push(i);
					}
				}
			}
			return needleNodes;
		}
		// Map els in the haystack
		function mapEls() {
			var haystackEl;
			haystackEl = $haystack.get(0);
			if (lastHaystackEl !== haystackEl) {
				elMap = [];
				mapNodes(haystackEl);
				lastHaystackEl = haystackEl;
				return true;
			}
			return false;
		}
		// Iterate though the elMap and output tags, closing where necessary
		function generateOutput() {
			var i, out, stack, close, fakeEl, empty;
			out = [];
			stack = [-1];
			for (i = 0;i <= elMap.length; i++) { // loops once more after all els to clear stack
				el = (elMap.length === i) ? null : elMap[i];
				while (stack.length && (null === el || el.ancestors[0] < stack[0])) {
					close = elMap[stack[0]];
					if (close) {
						if (null !== close.innerEnd) {
							out.push(close.src.substring(close.innerEnd + 1));
						}
					}
					else {
						break; // close of root node
					}
					stack.shift();
				}
				if (null !== el && null !== el.src && '' !== el.src) {
					if (1 === el.type && null !== el.innerStart && el.out !== null) { // el with content
						if ('img' === el.name) { // Show uncleared images
							empty = false;
						}
						else {
							// check if there are any text nodes in this el
							empty = true;
							for (j = 0;j < el.textIds.length;j++) {
								empty = !(elMap[el.textIds[j]].out) && empty;
							}
						}
						if (!empty) {
							stack.unshift(i);
							if (i === needleNodes[0]) {
								// mark the needle node for output with added className
								fakeEl = { src: null, node: $(elMap[needleNodes[0]].node).clone().addClass('ref-in-context').get(0) };
								mapInnerHtml(fakeEl);
								el = fakeEl;
							}
							out.push(el.src.substring(0, el.innerStart));
						}
					}
					else { // text, or self-closing el
						out.push(el.out);
					}
				}
			}
			return out.join('');
		}
		// We look around leading/trailing chars and truncate to closest sentence boundaries (if found)
		newContext = mapEls();
		// init the output
		for (i = 0;i < elMap.length;i++) {
			elMap[i].out = null;
		}
		// find needle
		needleNodes = findNeedleNodes($needle, elMap);
		if (0 === needleNodes.length) {
			return ''; // bail here, not found
		}
		afterNeedleIdx = Math.max.apply(null, needleNodes) + 1;
		needleAncestors = elMap[needleNodes[0]].ancestors;
		// find sentences, if necessary
		if (newContext) {
			sentences = findSentences(getMarkedText(elMap));
		}
		directions = [ -1, 0, 1 ]; // back, forwards (in needleNodes), forwards (after needleNodes)
		preserveNodes = []; // trail
		leadEllipsis = trailEllipsis = null;
		while (undefined !== (direction = directions.shift())) {
			// Prepare for node crawl
			if (-1 === direction) {
				chars = (typeof leadingchars === 'undefined') ? defaultContextChars : leadingchars;
				init = needleNodes[0] - 1;
				overflow = -1;
				incr = -1;
			}
			else if (0 === direction) {
				chars = 99999;
				init = needleNodes[0];
				overflow = afterNeedleIdx;
				incr = 1;
			}
			else {
				chars = (typeof trailingchars === 'undefined') ? defaultContextChars : trailingchars;
				init = afterNeedleIdx;
				overflow = elMap.length;
				incr = 1;
			}
			i = init;
			if (i === overflow || 0 !== preserveNodes.length) { // nothing to do in this direction, bail
				continue;
			}
			clear = false;
			finalNodeParents = [];
			do {
				el = elMap[i];
				if (clear) {
					if (-1 === $.inArray(i, preserveNodes) && -1 === $.inArray(i, finalNodeParents) && -1 === $.inArray(i, needleAncestors)) { // not ancestor, can discard
						el.out = null;
					}
					else {
						if (1 === el.type) {
							mapInnerHtml(el);
						}
						else if (-1 === $.inArray(i, preserveNodes)) { // not marked to preserve, discard
							el.out = null;
						}
					}
				}
				if (3 === el.type) {
					if (!clear && 0 !== direction) {
						chars = chars - el.src.length;
						if (0 > chars) { // We truncate to nearest sentence if over the limit
							sInit = ((-1 === direction) ? sentences.length - 1 : 0);
							sOver = ((-1 === direction) ? -1 : sentences.length);
							for (j = sInit; j !== sOver; j += incr) {
								needleFound = false;
								sentenceStart = sentences[j][1];
								sentenceEnd = sentences[j][2];
								if (el.end >= sentenceStart && el.start < sentenceEnd) {
									// find all the other nodes in this sentence
									textIds = [];
									allIds = [];
									for (k = 0; k < elMap.length; k++) {
										el2 = elMap[k];
										if (el2.end >= sentenceStart && el2.start < sentenceEnd) {
											allIds.push(k);
											if (!needleFound && -1 !== $.inArray(k, needleNodes)) {
												needleFound = true;
											}
											if (3 === el2.type) {
												textIds.push(k);
											}
										}
									}
									if (needleFound) {
										k = textIds[0]; // first text node within this sentence
										fragLength = sentenceStart - elMap[k].start - 1;
										elMap[k].out = elMap[k].src.substring(fragLength); // truncate
										k = textIds[textIds.length - 1]; // last text node within this sentence
										fragLength = sentenceEnd - elMap[k].start - 1;
										elMap[k].out = elMap[k].src.substring(0, fragLength); // truncate
										for (k = 0; k < allIds.length; k++) {
											el2 = elMap[allIds[k]];
											if (3 === el2.type) {
												if (null === el2.out) {
													el2.out = el2.src;
												}
											}
											else {
												mapInnerHtml(el2);
											}
										}
										preserveNodes = allIds.slice(0);
										k = (-1 === direction) ? textIds[0] : textIds[textIds.length - 1];
									}
									else {
										if (-1 === direction) {
											k = textIds[textIds.length - 1]; // last text node within this sentence
											fragLength = sentenceEnd - elMap[k].start - 1;
											elMap[k].out = elMap[k].src.substring(fragLength);
										}
										else {
											k = textIds[0]; // first text node within this sentence
											fragLength = sentenceStart - elMap[k].start - 1;
											elMap[k].out = elMap[k].src.substring(0, fragLength);
										}
									}
									i = k;
									el = elMap[i];
									finalNodeParents = el.ancestors;
									clear = true;
									break;
								}
							}
							if (!clear) { // overflowed, but didn't find sentence
								el.out = ((1 === direction) ? el.src.substring(0, (el.src.length + chars)) : el.src.substring(0 - chars));
								leadEllipsis = (leadEllipsis === null && 1 !== direction);
								trailEllipsis = (trailEllipsis === null && -1 !== direction);
								finalNodeParents = el.ancestors;
								clear = true;
							}
						}
						else {
							el.out = el.src;
						}
					}
					if (0 === direction) {
						el.out = el.src; // retain all needle nodes
					}
				}
				else {
					if (!clear) {
						mapInnerHtml(el);
					}
				}
				i += incr;
			}
			while (overflow !== i);
		}
		return (true === leadEllipsis ? ellipsis : '') + $.trim(generateOutput()) + (true === trailEllipsis ? ellipsis : '');
	};
	var truncate = function (str, chars) {
		openTags = [];
		closedTags = [];
		reachedEnd = false;
		if (str.length <= chars) {
			return str;
		}
		var txt = getTrailing(str, 0, chars);
		if (openTags.length) {
			txt += '</' + openTags.reverse().join('></') + '>';
		}
		if (!reachedEnd) {
			txt = txt.replace(/((\s*<\/[^>]+>\s*)*)$/i, ellipsis + '$1');
		}
		return txt;
	};
	return {
		truncate: truncate,
		getContextSnippet: getContextSnippet,
		toString: function () {
			return '[object com.nature.Truncator]';
		}
	};
}(jQuery));
