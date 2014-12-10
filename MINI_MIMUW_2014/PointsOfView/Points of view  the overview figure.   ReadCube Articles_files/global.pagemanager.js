var com = com || {};
com.nature = com.nature || {};

(function ($) {
	com.nature.PageManager = {
		_cookie: com.nature.Cookie,
		_path: document.location.href.replace(/^https?:\/\/[^\/]+/i, ''),

		saveSectionState: function (ev, article) {
			this._cookie.set('expsec', article.getExpandedSections().join('|'), null, this._path);
			this._cookie.set('colsec', article.getCollapsedSections().join('|'), null, this._path);
		},
		saveTabState: function (ev, panel) {
			this._cookie.set(panel.id, panel.active);
		},
		restoreTabState: function (panel) {
			var active = this._cookie.get(panel.id);
			if (active) {
				panel.switchTo(active);
			}
		},
		trackAuthorPopup: function (ev, popup) {
			var params = {
				action: 'author',
				source: popup.id
			};
			this.track(params);
		},
		trackSharePopup: function (ev, popup) {
			var params = {
				action: 'share',
				source: popup.id.replace(/\d/g, "")
			};
			this.track(params);
		},
		trackDownloadPopup: function (ev, popup) {
			var params = {
				action: 'popup-download',
				source: popup.id.substring(14, 1).replace(/\d/g, "")
			};
			this.track(params);
		},
		trackSupInfoPopup: function (ev, popup) {
			var params = {
				action: popup.wtAction,
				destination: popup.destination,
				source: popup.id.split('-')[1]
			};
			this.track(params);
		},
		trackSocialBookmarking: function (ev, popup) {
			$(popup._$popup).find('.bookmarking li a').click(function (ev) {
				var serviceClass = $(this).parent().attr('class');
				ev.preventDefault();
				var params = {
					dl: '1',
					ndl: '1',
					action: serviceClass,
					source: 'popup-bookmarking-links'
				};
				com.nature.PageManager.track(params);
				window.location.href = ($(this).attr('href').indexOf('http://') !== -1) ? $(this).attr('href') : 'http://' + window.location.hostname + $(this).attr('href');
			});
		},
		trackCompoundNumberClick: function (obj) {
			var params = {
				type: obj.type,
				action: 'compound_number_click',
				source: obj.section,
				destination: obj.destination,
				dl: '1',
				ndl: '1'
			};
			this.track(params);
		},
		trackDbLinksClick: function (obj) {
			var params = {
				action: 'database_link_click',
				source: obj.section,
				destination: obj.destination,
				dl: '1',
				ndl: '1'
			};
			this.track(params);
		},
		trackSections: function (ev, article, srcId, destId) {
			var params = {
				action: ev,
				source: srcId,
				destination: destId || ''
			};
			this.track(params);
		},
		/**
		* Event tracking when changing tabs
		*
		* @param {string} ev event, can be either 'switch' or 'tab_switch'
		* @param {string} article the TabGroup (not sure why it's called article)
		* @param {string} srcId tab the user is currently seeing
		* @param {string} destId tab the user has clicked on
		*/
		trackTabs: function (ev, article, srcId, destId) {
			if (article.id === "figure-browser-group") {
				srcId = srcId.substring(7) + "-browser";
				destId = destId.substring(7) + "-browser";
			}
			var params = {
				action: ev,
				source: srcId,
				destination: destId
			};
			if (article.id === "home-main-content") {
				params["mod_name"] = "read-latest-trending";
			}
			this.track(params);
		},
		trackMetricTabs: function (ev, article, srcId, destId, destName) {
			if (srcId === "online-metrics-1") {
				srcId = "article-metrics-news-articles";
			} else if (srcId === "online-metrics-2") {
				srcId = "article-metrics-blogs";
			} else if (srcId === "online-metrics-3") {
				srcId = "article-metrics-googleplus";
			}
			var params = {
				action: ev,
				source: srcId,
				destination: destName,
				dl: '51',
				ndl: '51'
			};
			this.track(params);
		},
		trackNavigation: function (ev, article, srcId, destId) {
			var params = {
				action: 'internal_navigation',
				source: srcId,
				destination: destId
			};
			this.track(params);
		},
		trackHighlighting: function (ev, highlighter, type, checked) {
			var type = type.replace(/-+/g, '_') + 's';
			var params = {
				action: (checked) ? type : 'un' + type
			};
			this.track(params);
		},
		trackFigureBrowser: function (ev, pm, offset, type) {
			var params = {
				action: type + "_preview_scroll",
				direction: offset > 0 ? "next" : "prev"
			};
			this.track(params);
		},
		trackFigurePopup: function (ev, obj, id) {
			var params = {
				action: id.substring(0, id.indexOf('-preview-')).substring(15) + "_preview",
				source: id.substring(15)
			};
			this.track(params);
		},
		trackVideoCarouselScroll: function (ev, pm, offset) {
			var params = {
				action: "video_popover_carousel_scroll",
				direction: offset > 0 ? "next" : "prev"
			};
			this.track(params);
		},
		trackVideoCarouselThumbs: function (ev, pm, id) {
			var params = {
				action: "video_popover_carousel_thumb",
				source: id
			};
			this.track(params);
		},
		trackPrint: function () {
			this.track({action: 'print'});
		},
		trackAuthorListDisplay: function (mode) {
			this.track({action: mode + '_author_list'});
		},
		trackAnnotation: function (ev, id, type, parentSection) {
			var params = {
				action: "annotation_" + type,
				source: parentSection,
				type: id
			};
			this.track(params);
		},
		trackZoom: function (data) {
			var params = {
				source: data.parentSection,
				action: data.action,
				dl: "51",
				ndl: "51",
				es: window.location.href
			};
			this.track(params);
		},
		trackAudioPlayer: function (action, file, position) {
			var params = {
				source: "audio",
				action: action,
				destination: file,
				mod_name: "audio_interview",
				duration: (position) ? position : ""
			};
			this.track(params);
		},
		// used to track interactive graphics, expects two parameters the event and the element which called the tracking method
		trackInteractive: function (ev, element) {
			var $element = element,
				_data = {},
				theDoi = 'doi:' + com.nature.Configuration.get("articleDoi"),
				actn = ($element.parent().hasClass('track-encode')) ? "illustration" : "interactive";
			_data.dl = "1";
			_data.ndl = "1";
			_data.source = theDoi;
			_data.destination = 'link:' + $element.attr('href');
			_data.action =  actn;
			_data.es = window.location.href;
			if (_data) {
				this.track(_data);
			}
		},
		// Attempt to track links with data bindings
		trackDataBinding: function (ev, element) {
			var $el = element;
			var _data = {};
			if ($el.data()) {
				var i;
				for (i in $el.data()) {
					if (i !== 'webtrack') {
						_data[i] = $el.data(i).toString() || null;
					}
				}
			}
			// some defaults
			if (!_data.action || _data.action === "") {
				_data.action = "click";
			}
			if (!_data.destination || _data.destination === "") {
				_data.destination = $el.attr('href');
			}
			if (!_data.source || _data.source === "") {
				_data.source = window.location.href;
			}
			if (_data) {
				this.track(_data);
			}
		},
		trackClick: function (data) {
			this.track(data);
		},
		track: function (params) {
			var wt = window._tag || window.dcs;
			if (com.nature.Configuration.get('webtrendsEnabled') === 'true' && wt) {
				// WT requires all of our custom params to be set
				var required = ['action', 'source', 'destination', 'type', 'direction'];
				var n = required.length;
				while (n--) {
					if (!(required[n] in params)) {
						params[required[n]] = '';
					}
					//console.log(required[n] + ' = ' + params[required[n]]);
				}
				//Default settings for JS tags, if not already specified
				if (!params['dl']) { params['dl'] = '51'; }
				if (!params['ndl']) { params['ndl'] = '51'; }
				var args = [];
				for (var prop in params) {
					if (params.hasOwnProperty(prop)) {
						args.push('WT.' + prop);
						args.push(params[prop]);
					}
				}
				wt.dcsMultiTrack.apply(wt, args);
			}
		},
		getParentSection: function ($el) {
			var normalise = function (txt) {
				return txt.replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s+/g, '-');
			};

			var $parentSection = $el.parents('.section').find('h1');
			if ($parentSection.length) {
				return normalise($parentSection.text());
			}

			var subPageTypes = [{type: 'fig_tab-page', urlPart: '/fig_tab/'}, {type: 'compound-index', urlPart: '_ci.html'}, {type: 'compound-page', urlPart: '/compound/'}];
			for (var i = 0; subPageTypes[i]; ++i) {
				if (document.location.href.indexOf(subPageTypes[i].urlPart) !== - 1) {
					return subPageTypes[i].type;
				}
			}

			return $el.closest('[id]').attr('id');
		},
		trackhomePageTabList: function () {
			/* initialise webtrends on tab load */
			var self = this;
			$('body.home #home-trending.tab-box a[data-webtrack="true"]').click(function (ev) {
				var el = $(this);
				self.trackDataBinding(ev, el);
			});
		},
		initPlaceholders: function () {
			// moved from global.articlesetup.js & nature/site.js
			$('form').initPlaceholders();
		},
		toString: function () {
			return '[object com.nature.PageManager]';
		}
	};
}(jQuery));

(function ($) {
	$(function () {
		this.PageManager = com.nature.PageManager;
		var pm = this.PageManager;
		$('body.home a[data-webtrack="true"],body #responsive-menu a[data-webtrack="true"], body.palgrave-connect a[data-webtrack="true"]').click(function (ev) {
			var el = $(this);
			pm.trackDataBinding(ev, el);
		});
		pm.initPlaceholders();
	});
}(jQuery));
