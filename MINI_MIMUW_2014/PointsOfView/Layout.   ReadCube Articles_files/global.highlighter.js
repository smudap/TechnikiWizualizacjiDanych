
var com = com || {};
com.nature = com.nature || {};

com.nature.Highlighter = (function ($) {
	var Highlighter = function (id) {
		var group = com.nature.compoundGroup;
		var self = this;

		this.init = function (scope) {
			var $megaSelector = $('div:not(#acknowledgments, #author-information, #author-contributions, .figures-at-a-glance .description, #additional-information, .figures-at-a-glance h2) span.annotation, ul:not(.section-nav) span.annotation', '#constrain-content').not('span.legend span.annotation, h1 span.annotation, h2 span.annotation, h3 span.annotation, h4 span.annotation, h5 span.annotation, b span.annotation, table.data thead span.annotation, div.figure-browser .description span.annotation, ol.references ul.context');
			if ($(document.body).hasClass('ie7')) {
				com.nature.timedChunk($.makeArray($megaSelector), function (i, item, context) {
					var $this = $(item);
					$this.addClass('popup-prompt');
					self.initPopups($this);
				}, this);
			} else {
				$megaSelector.addClass('popup-prompt');
				self.initPopups($megaSelector);
			}
		};
		this.initPopups = function ($selector) {

			var pm = com.nature.PageManager;
			$selector.one("click", function (ev) {
				var id = this.getAttribute('data-related-id'),
					popupId = "popup_" + id,
					cls = this.className,
					$content = $('#' + id),
					theTitle = $content.find('h3').html(),
					$tmpContent = $content.clone(),
					parentSection = pm.getParentSection($(this));
				$tmpContent.find('h3').remove();

				if (id) {
					var popup = new com.nature.Popup($(this), $tmpContent, {
						closeOnClickOutside: true,
						title: theTitle
						//id: popupId
					});
					popup = $.extend(popup, new com.nature.Broadcaster());
					popup.init();
					popup.subscribe('build', function () {
						com.nature.articleInstance.initDbLinks('#' + popup.id, parentSection);
					});
					popup.subscribe('open', group.onOpen, group);
					popup.subscribe('close', group.onClose, group);
					popup.subscribe('open', function () {
						var annotationType = /highlight-([a-z]+)/i.exec(cls.replace('highlight-off', ''))[1];
						pm.trackAnnotation(this, id, annotationType, parentSection);
					}, pm);
					group.add(popup);
					if (theTitle) {
						popup.title = theTitle;
					}
					popup.open(ev);
				}
			});
		};
	};
	return Highlighter;
}(jQuery));