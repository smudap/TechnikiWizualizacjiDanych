/**
 *  Small screen optimization
 *  Glynn Phillips - 09 July 2010
 *
 *  All js needed for small screens and mobiles
 */

var com = com || {};
com.nature = com.nature || {};
var _tag = window._tag || window.dcs;

com.nature.Layout = (function ($) {
	/* JS layout detection */
	var getActiveLayout = function () {
		return (!!window.getComputedStyle) ? window.getComputedStyle(document.body, ':after').getPropertyValue('content') : '';
	};
	return {
		getActiveLayout: getActiveLayout
	};
}(jQuery));

(function ($) {

	var mobileWt = function () {
		/* Using web trends multi track to monitor the toggle between desktop and mobile */
		var switchView = com.nature.Cookie.get('switchView'),
		argsProp = [],
		argsProp = ["WT.action", "WT.source", "WT.destination", "WT.dl", "1", "WT.ndl", "1", "css_desktop", "css_mobile"];

		if (switchView === 'desktop') {
			$("#toggle").click(function () {
				com.nature.Cookie.set('switchView', '', -1, '/');
				var args = [];
				for (var prop in argsProp) {
					if (argsProp.hasOwnProperty(prop)) {
						args.push(prop);
					}
				}
				args.push("toggle_css_mobile");
				if (_tag) {
					_tag.dcsMultiTrack.apply(_tag, args);
				}
				location.reload();
			});
		} else {
			$("#toggle").click(function () {
				com.nature.Cookie.set('switchView', 'desktop', 1, '/');
				var args = [];
				for (var prop in argsProp) {
					if (argsProp.hasOwnProperty(prop)) {
						args.push(prop);
					}
				}
				args.push("toggle_css_desktop");
				if (_tag) {
					_tag.dcsMultiTrack.apply(_tag, args);
				}
				location.reload();
			});
		}
	};
	
	var smallscreenMenu = function () {
		var $d = $('#responsive-menu');
		$('#js-menu a', $d).click(function () {
			if ($d.hasClass('menu-showing')) {
				$d.removeClass('menu-showing');
			} else {
				$d.addClass('menu-showing');
			}
			return false;
		});
	};

	var breadcrumbPos = function () {
		var moveSibSubNavIntoBody = function () {
			var $breadcrumbs = $('#breadcrumbs ul#sib-sub-navigation').addClass('show');
			$('#content h1.primary-heading:first').after($breadcrumbs);
		};
		var moveSibSubNavIntoHeader = function () {
			var $breadcrumbs = $('#content ul#sib-sub-navigation').removeClass('show');
			$('#breadcrumbs ul#sub-navigation li:last').after($breadcrumbs);
		};
		if ('none' === $('#breadcrumbs ul#sub-navigation li:first *:first').css('background-image')) {
			moveSibSubNavIntoBody();
		} else {
			moveSibSubNavIntoHeader();
		}
	};

	var createSelect = function () {
		/* This converts tabs into a select element which provides a better UI on mobiles, an example is nclimate archive */
		$(".small-screen ul.tab-bar").each(function () {
			var list = $(this),
				select = $(document.createElement("select")).insertBefore($(this).hide()),
				label = $(document.createElement("label")).insertBefore(select);
			label.text("Archive Type:");
			label.addClass("mobile-filter");
			select.addClass("mobile-filter ");
			$(">li", this).each(function () {
				var option = $(document.createElement("option"))
					.appendTo(select)
					.val($(this).find("a").attr("href"))
					.html($(this).text()),

				selected = $(this).hasClass("active");

				if (selected === true) {
					$(option).attr("selected", "selected");
				}
			});

			select.change(function () {
				window.location = $(this).val();
			});
		});
	};

	// v1 & v2 institution and personal access message - self-hide if too tall
	var accessMsg = function () {
		$('#foreword p.access:not(.compact), #header div.logon p.access:not(.compact)').each(
			function () {
				var height, maxHeight, actualHeight, content, $s, $p = $(this);
				maxHeight = $p.height(); // assumes CSS max-height
				$p.css({'height' : 'auto', 'max-height' : 'none', 'overflow' : 'visible'});
				actualHeight = $p.height();
				if (actualHeight > parseInt(maxHeight, 10)) {
					content = $p.html();
					$p.html('<a href="javascript:" class="no-touch">' + content + '</a>');
					$s = $('span', $p);
					$s.eq(0).html($s.eq(0).text() + '<i>&hellip;</i>');
					$('a', $p).one('touchstart', function (e) {
						$(this).closest('a').removeClass('no-touch'); // prevent :hover CSS rules being applied
					}).on('click', function (e) {
						e.stopPropagation();
						e.preventDefault();
						$(this).closest('a').toggleClass('show');
						return false;
					});
					$p.addClass('compact'); // only act once
				}
				$p.removeAttr('style');
			}
		);
	};
	
	var resizeHandle;
	var resizeHandler = function () {
		breadcrumbPos();
		accessMsg();
	};
	
	var init = $(function () {
		mobileWt();
		smallscreenMenu(); // must precede breadcrumbPos
		createSelect();
		// trigger only on the last resize event
		$(window).resize(resizeHandle, function () {
			window.clearTimeout(this.data);
			this.data = window.setTimeout(resizeHandler, 300);
		}).resize();
	});

	/*! Adapted from:
	 * A fix for the iOS<6 orientationchange zoom bug.
	Script by @scottjehl, rebound by @wilto. MIT License.
	* Made it return sooner and retain preset max scale
	*/
	
	(function (w) {
		// This fix addresses an iOS<6 bug, so return early if the UA claims it's something else.
		var ua = navigator.userAgent;
		if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf("AppleWebKit") > -1)) {
			return;
		}
		var doc = w.document;
		if (!doc.querySelector) { return; }
		var meta = doc.querySelector("meta[name=viewport]"),
			initialContent = meta && meta.getAttribute("content"),
			enabled = true,
			x, y, z, aig;
		if (!meta) { return; }
		var maxScale = initialContent.replace(/^.*(,\s*maximum-scale=[0-9.]*)\b.*/, '$1'),
			initialContent = initialContent.replace(/,\s*(maximum-scale=[0-9.]*)\b/, ''),
			disabledZoom = initialContent + ', maximum-scale=1',
			enabledZoom = initialContent + maxScale;
		function restoreZoom() {
			meta.setAttribute("content", enabledZoom);
			enabled = true;
		}
		function disableZoom() {
			meta.setAttribute("content", disabledZoom);
			enabled = false;
		}
		function checkTilt(e) {
			aig = e.accelerationIncludingGravity;
			x = Math.abs(aig.x);
			y = Math.abs(aig.y);
			z = Math.abs(aig.z);
			// If portrait orientation and in one of the danger zones
			if ((!w.orientation || w.orientation === 180) && (x > 7 || ((z > 6 && y < 8 || z < 8 && y > 6) && x > 5))) {
				if (enabled) {
					disableZoom();
				}
			}
			else if (!enabled) {
				restoreZoom();
			}
		}
		w.addEventListener("orientationchange", restoreZoom, false);
		w.addEventListener("devicemotion", checkTilt, false);
	}(this));
}(jQuery));

