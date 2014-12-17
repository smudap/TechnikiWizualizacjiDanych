var com = com || {};
com.nature = com.nature || {};

/**
 * com.nature.TabGroup
 *
 * Handles everything related to tabs including showing/hiding content, tracking, etc.
 */

com.nature.TabGroup = (function ($) {
	var TabGroup = function (el) {
		this.id = el.attr('id');
		this.active = el.find('div.tab-box.active').attr('id');
		this._el = el;
		this._numTabs = el.find('.tab').length;
		this.isAddressable = false;
		this.tabPrefix = this.tabPrefix || "figure-";
	};
	TabGroup.prototype = {
		init: function () {
			var self = this;
			var prefix  = self.tabPrefix;
			this._redraw();
			$('#' + this.id + ' .tab').linkify();
			$('#' + this.id + ' .tab a').hitch('click', this.click, this).ellipsis();
			$('#' + this.id).css({
				'visibility': 'visible',
				'display': 'block'
			}); // show the tabs again once processed
			if (this.tabName && self.isAddressable) {
				window.location.hash = this.tabName;
			}
			if (self.isAddressable) {
				self.changeByHash(prefix);
			}
		},
		click: function (e) {
			var el = $(e.target);
			var id = el.parents('div.tab-box').attr('id');
			if (id !== this.active) {
				this.switchTo(id);
			}
		},
		switchTo: function (id) {
			var self = this;
			if (this.active !== id) {
				var $next = $('#' + id);
				if (!$next.length) {
					$next = this._el.find('div.tab-box:first');
				}
				$('#' + this.active).removeClass('active');
				$next.addClass('active').css('background-color', '#ff9933');
				this.prev = this.active;
				this.active = id;
				this.tabName = $('#' + id).data('info-type');
				if (this.active && self.isAddressable) {
					window.location.hash = this.active.substring(self.tabPrefix.length);
				}
				if (self.subscribe) {
					this.notify('switch', this.prev, id, this.tabName);
					this.notify('tab_switch', this.prev, id, this.tabName);
				}
			}
		},
		changeByHash: function (prefix) {
			var self = this;
			var theHash = window.location.hash.substring(1);
			// the tab types array must be defined for this functionality to work
			if (self.tabTypes && self.isAddressable) {
				var thePrefix = prefix || "figure-";

				$(window).on('hashchange', function () {
					var currentHash = window.location.hash.substring(1);
					if ($.inArray(currentHash, self.tabTypes) >= 0) {
						var tabHash = thePrefix + currentHash;
						self.switchTo(tabHash);
					}
				});
				if (!theHash || theHash < 0) {
					com.nature.PageManager.restoreTabState(self);
				} else {
					if ($.inArray(theHash, self.tabTypes) >= 0) {
						var tabHash = thePrefix + theHash;
						self.switchTo(tabHash);
					}
				}
			}
		},
		getTitle: function () {
			return $('#' + this.active + ' .tab a').attr('title');
		},
		_redraw: function () {
			var self = this,
				$tabs = $('#' + this.id + ' .tab'),
				numTabs = $tabs.length,
				outerHeight = $tabs.last().outerHeight(); //calculated from last tab to take account of first active tab styles distorting height.
			$tabs.each(function () {
				var	$this = $(this);
				if (numTabs === 1) {
					$this.parent().addClass("active solotab");
				}
			});
		}
	};
	return TabGroup;
}(jQuery));

(function ($) {
	$(document).ready(function () {
		var pm = com.nature.PageManager;

		$('#extranav div.tab-group').each(function () {
			var t = new com.nature.TabGroup($(this));
			t = $.extend(t, new com.nature.Broadcaster());
			t.init();
			t.subscribe('switch', pm.trackTabs, pm);
			if (!$(this).hasClass('random')) {
				t.subscribe('switch', pm.saveTabState, pm);
				pm.restoreTabState(t);
			}
		});
	});
}(jQuery));
