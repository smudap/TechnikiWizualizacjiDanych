var com = com || {};
com.nature = com.nature || {};
var brightcove = window.brightcove;

com.nature.FigureBrowser = (function ($) {

	$.fn.reverse = [].reverse;

	var FigureBrowser = function ($figures, options) {
		var opts = options || {},
			id = $figures.attr('id') || 'figure-browser',
			contentType = $figures.attr('id').substring(15),
			$thumbs = null,
			$fragment = null,
			$mask = null,
			carItemLoc = [],
			carItemsCount = 0,
			carContentsCount = 0,
			activated = false,
			inTab = false,
			$thumbGenerator = new com.nature.ThumbGenerator(),
			self = this;

		// ie6 reports the wrong value for $figures.width() but $('#content').width() is OK so use that instead
		var full = {
			width: $('#content .content:first').width(),
			height: 220
		};
		var mask = {
			width: full.width,
			height: full.height,
			left: 25,
			right: 25
		};

		var current = null, scrollTarget = 0, thumbsWidth = 0, thumbSpacing = opts.thumbSpacing || 10, borderWidth = opts.borderWidth || 1, minWidth = opts.minWidth || 100;

		var resizeMask = function () {

			full.width = $('#content .content:first').width();

			mask.width = full.width - mask.left - mask.right;
			$mask.css({
				width: mask.width + 'px',
				left: mask.left + 'px'
			});
			$mask.find('ol').removeAttr('style');
		};
		var getFilename = function ($img) {
			var src,
				file;
			if ($img.data('video')) {
				src = $img.data('video-id');
				return src;
			} else {
				src = $img.attr('src');
				file = src.substring(src.lastIndexOf('/') + 1);
				return file.substring(0, file.lastIndexOf('.')).replace(/\./g, '-');
			}

		};
		var getPreviewId = function ($img) {
			return id + '-preview-' + getFilename($img);
		};
		var getThumbId = function ($img) {
			return id + '-thumb-' + getFilename($img);
		};
		var updateNavButtons = function () {
			if (scrollTarget === 0) {
				$figures.find('div.page-nav a.first:not(.inactive), a.nav.left:not(.inactive)').addClass('inactive').attr('tabindex', '-1');
			} else {
				$figures.find('div.page-nav a.first, a.nav.left.inactive').removeClass('inactive').removeAttr('tabindex');
			}
			if (thumbsWidth > 0) {
				if (1 > (thumbsWidth + scrollTarget - mask.width)) {
					$figures.find('div.page-nav a.last:not(.inactive), a.nav.right:not(.inactive)').addClass('inactive').attr('tabindex', '-1');
				} else {
					$figures.find('div.page-nav a.last.inactive, a.nav.right.inactive').removeClass('inactive').removeAttr('tabindex');
				}
			}
		};
		var getCarouselItemScrollOffset = function (right, idx) {

			var loc = carItemLoc[idx];
			var offsetLeft = scrollTarget + loc.x;
			if (right) {
				if ((offsetLeft + loc.width) > mask.width) {
					return offsetLeft;
				}
			}
			else {
				if (offsetLeft < 0) {
					return offsetLeft;
				}
			}
			return 0;
		};
		var doImageScroll = function (offset) {
			scrollTarget -= offset;
			if (scrollTarget < 0 && Math.abs(scrollTarget) <= thumbSpacing) {
				scrollTarget = 0;
			}
			$thumbs.animate({
				left: scrollTarget + 'px'
			}, 'fast');
			self.notify('scrolled', offset, $thumbs.parents('.tab-content').attr('id').substring(15));
			updateNavButtons();
			updatePagination();
		};
		var close = function () {
			if (current) {
				$('#' + current).fadeOut('fast');
				$('#' + current.replace('-preview-', '-thumb-')).parent().focus();
				self.notify('close', current);
				current = null;
			}
		};

		var open = function ($img) {
			close();
			var previewId = getPreviewId($img),
				$preview = $('#' + previewId),
				width = $img.data('previewWidth'),
				popupContent = "",
				vidId = $img.data('video'),
				isInteractive,
				$wrapper = $img.closest('li').clone(),
				$fullSizeLink = $wrapper.find('p.full-size a');

			self.notify('popupShown', previewId);

			//check to see if figure in question is interactive
			if ($fullSizeLink.parent().hasClass('interactive-link')) {
				isInteractive = true;
			}

			if (!$preview.length) {

				//if interactive fig add interactive label
				if (isInteractive) {
					popupContent = '<span class="interactive" style="width:' + $img.data('previewWidth') + 'px">Interactive</span>';
				}
	
				if (vidId) {
					popupContent +=  '<div style="display:none"></div><object id="' + $img.attr('id') + '" class="BrightcoveExperience"><param name="width" value="100%" /><param name="height" value="284" /><param name="playerID" value="' + brightcove.settings.playerId + '" /><param name="playerKey" value="' + brightcove.settings.playerKey + '" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="' + vidId + '" /><param name="bgcolor" value="#EEEEEE" /><param name="includeAPI" value="true" /></object>';
				} else {
					popupContent +=  $('<img />').attr({'src': $img.attr('src'), 'alt': $img.attr('alt'), 'title': $img.attr('title'), 'class': $img.attr('class'), 'width': $img.data('previewWidth'), 'height': $img.data('previewHeight') }).prop('outerHTML');
				}


				if ((com.nature.Configuration.get('isLoggedIn') === "yes") || (com.nature.Configuration.get('articleLevel') === "0")) {
					var $fs = $fullSizeLink.clone().empty();
					if ($fs.length !== 0) {
						if (isInteractive) {
							$fs.addClass('interactive-link');
						}
						popupContent = $fs.append(popupContent);
					}
					//strips wrapping anchor if video
					if (vidId) {
						popupContent =  popupContent[0].innerHTML;
					}
				}
				var $wrapImg = $wrapper.find('div.larger');

				var html = '<div id="' + previewId + '" class="box no-padding figure-preview cleared">';

				$wrapper.find('span.timestamp').remove();
				var legend = $wrapper.find('span.legend').html();
				if (legend.indexOf('Fig.') !== -1) {
					legend = legend.replace('Fig.', 'Figure');
				}

				html += '<figure><figcaption><span class="legend cleared">' + legend;

				if ($('body.ie6').length > 0) {
					html += '<button class="close" title="close">x</button>';
				}
				else {
					html += '<button class="close" title="close">close</button>';
				}
				html += '</span></figcaption>';
				html += '<div class="fig"></div><div class="description">';
				html += com.nature.Truncator.truncate($wrapper.find('div.description').html(), 250);
				if (vidId) {
					html += '<p>';
				}
				if (($wrapImg.length) && ((com.nature.Configuration.get('isLoggedIn') === "yes") || (com.nature.Configuration.get('articleLevel') === "0") || $img.hasClass('compound'))) {
					html += $wrapImg.html();
				} else if ((com.nature.Configuration.get('isLoggedIn') === "no") && (com.nature.Configuration.get('articleLevel') !== "0") && $img.hasClass('compound') === false) {
					var siteRegister = com.nature.Configuration.get('mopRegister') || "",
						siteSubscribe = com.nature.Configuration.get('mopSubscribe') || "",
						siteLogin = com.nature.Configuration.get('mopLogin') || "",
						siteTitle = com.nature.Configuration.get('mopTitle') || "";

					html += '<p class="subLinks"><a href="' + siteRegister + '">Purchase Article</a><a href="' + siteSubscribe + '">Subscribe</a><a href="' + siteLogin + '" class="login" title="Login to ' + siteTitle + '">Login</a></p>';
				}
				if (vidId) {
					html += '</p></div>';
				}
				html += '</figure></div>';
				var $preview = $(html);
				//[ AIP-1189] remove compound links from  popup to avoid popup within pop up
				$preview.find('a.compound-ref').each(function () {
					var $this = $(this);
					$this.replaceWith('<b>' + $this.html() + "</b>");
				});
				$preview.find('div.fig').append(popupContent);
				$preview.find('button.close').click(function () {
					close();
				});
				$preview.find('p.fig-link').find('a').click(function () {
					close();
				});
				$preview.find("a.database-link, h2 a").show().click(function (ev) {
					var destination,
					dbType = $(this).data('dbtype');
					if (!dbType) {
						destination = "compound-page";
					} else {
						destination = "link: " + dbType;
					}
					var tracking = {
						destination: destination,
						section: previewId.substring(0, previewId.indexOf('-preview-')).substring(15) + "-preview"
					};
					$(this).target = "_blank";
					ev.preventDefault();
					com.nature.PageManager.trackDbLinksClick(tracking);
					if (dbType) {
						window.open($(this).attr('href'),  '_blank');
					}
					else {
						window.location.href = $(this).attr('href');
					}
				});

				// click tracking for interactive pop up
				if (isInteractive) {
					$preview.find("a.interactive-link, .interactive-link a").show().click(function (ev) {
						var $this = $(this);
						ev.preventDefault();
						com.nature.PageManager.trackInteractive(ev, $this);
						window.location.href = $this.attr('href');
					});
				}
				//append popup to body

				$('body').append($preview);

				self.notify('created', previewId);
			}
			var w = Math.max(Math.min((width * 2), 725), 300);
			if (w < width + 40) {
				w = width + 40;
			}
			var x = Math.max(5, $mask.offset().left + ((mask.width - w) / 2));
			var y = $mask.offset().top - Math.max(($preview.outerHeight() - $mask.outerHeight()) / 2);
			//If the image hasn't loaded yet then shift up to account for it
			if ($preview.find(".carousel-item").length === 0) {
				y -= $img.data('previewHeight') / 2;
			}

			$preview.css({
				width: w + 'px',
				left: x + 'px',
				top: y + 'px'
			});
			$preview.find('span.legend').css({
				width: (w - 40) + 'px'
			});
			if (vidId && window.brightcove) {
				window.brightcove.createExperiences();
			}

			$preview.fadeIn('fast');
			$preview.find('button.close').focus();

		
			current = previewId;
		};
		var updatePagination = function () {
			var counts = paginateCount();
			$figures.find('.item-index span.item-count').html(counts[0] + '-' + counts[1] +  ' of ' + counts[2]);
		};
		var paginateCount = function () {
			var loc,
				i,
				first = 0,
				count = 0,
				unfinished = false;
			for (i = 0;i < carItemsCount; i++) {
				loc = carItemLoc[i];
				if ('undefined' !== typeof loc) {
					if ((loc.x + scrollTarget + thumbSpacing) >= 0) {
						if (0 === first) {
							first = count + 1;
						}
						if (mask.width < (loc.x + scrollTarget + loc.width)) {
							break;
						}
					}
					count += loc.count;
				}
			}
			return [ first, count, carContentsCount ];
		};
		var renderThumb = function ($el, redraw, index, last, isVid) {
			var pw = $el.width(),
				ph = $el.height(),
				tw = 0,
				th = 0,
				aspect,
				isGroup = $el[0].className.indexOf('entity-group') > -1,
				$li = $el.closest('li');
			var	placeThumbs = function (thumbUrl, thumbWidth, thumbHeight, padding, len) {
				var	timestamp,
					itemContentCount;

				if ((!isVid && !thumbUrl) || (isVid && thumbUrl)) {
					//vidoe processing
					if (thumbUrl && isVid) {
						$el.attr('src', thumbUrl);
						if (len !== '' && len !== 'undefined') {
							if (len.match(/:$/)) {
								len = len + '00';
							}
							timestamp = '<span class="timestamp"> (' + len + ')</span>';
							$li.find('span.legend').append(timestamp);
						}
					}

					if (thumbWidth > mask.width) {
						var diff = thumbWidth - mask.width;
						thumbWidth = thumbWidth - diff - (thumbSpacing * 2);
					}
					$el.css({
						width: thumbWidth,
						height: thumbHeight
					});
					// entity-groups have border inside container
					thumbWidth += (isGroup ? 0 : 2 * borderWidth);
					thumbWidth = Math.max(thumbWidth, $li.width(), minWidth + (2 * borderWidth)) + (0 === index ? 0 : thumbSpacing);
					thumbsWidth += thumbWidth;
					if (last) {
						updateNavButtons();
					}
					carItemsCount = Math.max(carItemsCount, index + 1);
					itemContentCount = (isGroup ? $el.find('div.entity-item').length : 1);
					carContentsCount += itemContentCount;
					var tmp = 0;
					for (var it = 0; it < carItemsCount; it++) {
						if (it === index) {
							carItemLoc[it] = {
								x: tmp,
								width: thumbWidth,
								count: itemContentCount
							};
						} else if ('undefined' === typeof carItemLoc[it]) {
							carItemLoc[it] = {
								x: tmp,
								width: 0,
								count: -1
							};
						}
						else {
							carItemLoc[it].x = tmp;
						}
						tmp += carItemLoc[it].width;
					}
					if (last) {
						updatePagination();
					}
				}
			};
		
			//if redraw tw and pw don't need to be halved
			if (redraw || isGroup || (' ' + $el[0].className + ' ').indexOf(' compound ') > -1) {
				tw = pw;
				th = ph;
			} else {
				tw = Math.floor(pw / 2);
				th = Math.floor(ph / 2);
			}
			if (ph > 108 && !isGroup) {
				aspect = pw / ph;
				th = 108;
				tw = Math.floor(100 * aspect);
			}
			if (isVid && !redraw) {
				tw = 179;
				pw = 268;
				ph = 200;
				// ajax request to brightcove to retrieve video thumbnail img
				$thumbGenerator.requestThumb($el.data('video'), brightcove.settings.playerToken, 150, 100, 0, true, placeThumbs);
			} else if (!redraw)  {
				placeThumbs(false, tw, th, 0);
			}
			if (!redraw) {
				$el.data('previewWidth', pw).data('previewHeight', ph);//.data('thumbWidth', tw).data('thumbHeight', th);
			}

		};
		var drawThumbs = function (redraw) {
			var self = this;
			var $carouselItems = $thumbs.find('div.carousel-item, img.carousel-item');
			var last = false;
			var isVid = false;
			self.carouselLength = $carouselItems.length - 1;
			var funcRenderThumb = renderThumb;
			var finishCarousel = function () {
				var toOpen = open;

				$thumbs.append($fragment);
				if (!redraw) {
					$thumbs.find('span.legend').click(function (e) {
						e.preventDefault();
						toOpen($(this).closest('li').find('img.carousel-item'));
					});
					$carouselItems.not('div').filter('.vid').parent().addClass('vidoverlay');

					$thumbs.find(".item-link").click(function (e) {
						toOpen($(this).find('img.carousel-item'));
						e.preventDefault();
					});
					$figures.find('div.figure-browser-loading').fadeOut('fast').remove();
				}

			};
			var theBladeToChunkTheHunk = function (i, item, context) {
				//lots of work to do
				var last = false;
				var isVid = false;
				var $el = $(item);
				var index = i;
				if ((" " + $el[0].className + " ").indexOf(" vid ") > - 1) {
					last = true;
					isVid = true;
					funcRenderThumb($el, redraw, index, last, isVid);
				} else if (index === self.carouselLength) {
					last = true;
					isVid = false;
					funcRenderThumb($el, redraw, index, last, isVid);
				} else {
					last = false;
					isVid = false;
					funcRenderThumb($el, redraw, index, last, isVid);
				}
			};
			//convert jquery selector to array, specify process function, context and callback
			com.nature.timedChunk($.makeArray($carouselItems), theBladeToChunkTheHunk, this, finishCarousel);

		};
		this.active = function () {
			inTab = activated = true;
		};

		this.renderCarousel = function () {
			// Render if displayed
			if ((!inTab || (inTab && activated)) && (null === $thumbs)) {
				//create fragment to speed up image processing
				$thumbs = $figures.find('ol:first');
				$mask = $thumbs.wrap('<div class="thumbs masking"></div>').parent();
				$mask.before('<a href="javascript:;" class="nav left inactive" tabindex="-1"><span>left</span></a>').after('<a href="javascript:;" class="nav right"><span>right</span></a>');
				resizeMask();
				$figures.append('<div class="figure-browser-loading"><img src="/view/images/figure_browser_loading.gif" alt="Loading" class="figure-browser-loading-icon"/></div>');
				var $pagination = $figures.find('div.item-index span.item-count');
				$pagination.wrap('<div class="page-nav"></div>').before('<a href="javascript:;" class="first">First</a> | ').after(' | <a href="javascript:;" class="last">Last</a>');
				$thumbs.find('div.item-index').prepend($pagination);

				$figures.find('a.nav, div.page-nav a').click(function (e) {
					var lastOffset, offset, i, $this;
					if ($thumbs.is(':animated') || $(this).hasClass('inactive')) {
						return false;
					}
					close();
					i = lastOffset = offset = 0;
					$this = $(this);
					if ($this.hasClass('left')) {
						for (i = 0; i < carItemsCount; i++) {
							offset = getCarouselItemScrollOffset(false, carItemsCount - 1 - i);
							if (offset < -1 * (mask.width + thumbSpacing)) {
								break;
							}
							lastOffset = offset;
						}
					} else if ($this.hasClass('right')) {
						for (i = 0; i < carItemsCount; i++) {
							offset = getCarouselItemScrollOffset(true, i);
							if (offset > mask.width) {
								break;
							}
							lastOffset = offset;
						}
					} else if ($this.hasClass('first')) {
						scrollTarget = 0;
						lastOffset = 0;
					} else {
						scrollTarget = 0;
						lastOffset = getCarouselItemScrollOffset(true, carItemsCount - 1);
					}
					doImageScroll(lastOffset + thumbSpacing);
				});

				//adjust pagination and figure display on resize but prevent firing on IE excess resize events
				var winWidth = $(window).width(),
				winHeight = $(window).height();

				$figures.bind('resize', function (ev) {
					ev.stopPropogation();
				});

				var resizeTimeout;

				$(window).resize(function (ev) {
					var onResize = function () {
						resizeMask();
						updateNavButtons();
						updatePagination();
					};
					//New height and width
					var winNewWidth = $(window).width(),
						winNewHeight = $(window).height();

					// compare the new height and width with old one
					if (winWidth !== winNewWidth || winHeight !== winNewHeight) {
						window.clearTimeout(resizeTimeout);
						resizeTimeout = window.setTimeout(onResize, 243);
					}
					//Update the width and height
					winWidth = winNewWidth;
					winHeight = winNewHeight;
				});
				drawThumbs(false);
			}

		};
		this.start = function () {
			var t = this;
			// Detect and notify the FigureBrowser in a tab if it is displayed
			$figures.closest('div.tab-group').bind('switched', function () {
				$figures.closest('.tab-box.active').each(t.active);
				t.renderCarousel();
			}).each(function () {
				inTab = true;
				$figures.closest('.tab-box.active').each(t.active);
			});
			t.renderCarousel();
		};
	};
	return FigureBrowser;

})(jQuery);


