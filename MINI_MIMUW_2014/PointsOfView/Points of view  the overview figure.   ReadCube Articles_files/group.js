var com = com || {};
com.nature = com.nature || {};

(function ($) {
	com.nature.rjHomePage = {
		hasLoaded: false,
		pageManager: com.nature.PageManager,
		trendingTabs: function (activeTab) {
			if (this.hasLoaded === false) {
				var self = this;
				var currentSite = com.nature.Configuration.get('siteName');
				var $contentDestination = $('#home-trending .tab-inner .holder');
				$contentDestination.prepend("<span id='ajax-loader'></span>");

				$.ajax({
					url: "/ajax/home-trending.html",
					cache: false,
					data: {"currentSite" : currentSite },
					dataType: "html",
					success: function (data) {
						$('#ajax-loader').remove();
						$contentDestination.html(data);
						$('.trending .more-link').show();
						self.pageManager.trackhomePageTabList();
					}
				});
			}
			this.hasLoaded = true;
		},
		checkTrending: function (t, tabSwitch) {
			var self = this;
			if (t.active === "home-trending" && tabSwitch === true) {
				this.trendingTabs(t.active);
			} else if (t.active === "home-trending") {
				window.setTimeout(function () {
					self.trendingTabs(t.active);
					self.hasLoaded = true;
				}, 500);
			}
		},
		initTabs: function () {
			var self = this;
			$('#home-main-content').each(function () {
				var $this = $(this);
				var t = new com.nature.TabGroup($this);
				t = $.extend(t, new com.nature.Broadcaster());
				t.isAddressable = true;
				t.tabTypes = ["latest-research", "news-and-comment", "most-read", "trending"];
				t.tabPrefix = "home-";
				t.init();
				t.subscribe('switch', function () {
					self.checkTrending(t, true);
				});
				self.checkTrending(t, false);
			});
		},
		coverWrap: function () {
			$("#about-the-cover h3").wrapInner('<a href="#about-the-cover"/>').find("a").click(function () {
				$("#about-the-cover").toggleClass("visible");
				return false;
			});
		},
		initArchiveDisplay: function () {
			$("#per-page-select select").change(function () {
				$(this).closest('form').submit();
			});
			$("#select-articles input").change(function () {
				$(this).closest('form').submit();
			});
		},
		initDescriptionTrigger: function () {
			/* show or hide the altmetrics description */
			var descTrigger = $('p.trigger');
			var descTriggered = $('p.triggered');
			descTrigger.wrapInner('<a role="button" href="#view"></a>').click(function (e) {
				if (descTriggered.is(':visible')) {
					descTriggered.slideUp();
				} else {
					descTriggered.slideDown();
				}
				return false;
			});
		},
		initListTracking: function () {
			this.pageManager.trackhomePageTabList();
		},
		init: function () {
			this.initTabs();
			this.coverWrap();
			this.initArchiveDisplay();
			this.initListTracking();
			this.initDescriptionTrigger();
		}
	};

	// Display more authors
	$(function () {
		// Obvs, we only hide the author and add the ellipsis if JS is enabled
		$('.more-authors').addClass('visually-hidden');
		$('.more-authors').after('<span class="ellipsis-wrapper"> <a href="javascript:;" class="ellipsis" role="button"><span class="visually-hidden">Show more authors</span><span aria-hidden="true">[&hellip;]</span></a> </span>');

		$('.ellipsis').on('click', function () {
			$(this).parents('.ellipsis-wrapper').addClass('hide');
			$(this).parents('.ellipsis-wrapper').prev('.more-authors').removeClass('visually-hidden');
			$(this).parents('.authors').next('.show-fewer').removeClass('hide');
		});
		$('.show-fewer').on('click', function () {
			$(this).addClass('hide');
			$(this).prev('.authors').find('.more-authors').addClass('visually-hidden');
			$(this).prev('.authors').find('.ellipsis-wrapper').removeClass('hide');
		});
	});

	/*
	 * Global 'click' navigation
	 */
	$(function () {
		var navLinks = $('.banner-nav-links'),
			subnavLinks = $('.banner-subnav-links');

		/* add small-screen navigation menu */
		$('<div class="small-screen-menu hide js-small-show"><a href="javascript:;" class="small-screen-nav block"><span class="block strong text-size-mars">Menu</span></a></div>').prependTo('.js-search-form-header');

		/* disable parent link click (link duplicated in sub-navigation) */
		navLinks.children('.js-nav-parent').on('click', 'a', function (e) {
			if ($(this).parent('.js-nav-parent').length > 0) {
				e.preventDefault();
			}
		});

		/* highlight the parent link in the sub-navigation if it is the current page */
		navLinks.children('.js-nav-parent').each(function () {
			if ($(this).hasClass('active')) {
				var childActive = false;
				$(this).find('li').each(function () {
					if ($(this).hasClass('active')) {
						childActive = true;
					}
				});
				/* if none of the child pages are active, then the parent must be */
				if (!childActive) {
					$('li:first', this).addClass('active');
				}
			}
		});

		/* hide any visible sub-navigation, and small screen navigation */
		var hideDropdown = function (isSubnav, callback) {
			subnavLinks.filter('.js-banner-subnav-show').each(function () {
				var $this = $(this);
				$this.slideUp(150).promise().done(function () {
					$this.parent('li').removeClass('js-nav-click');
					$this.removeClass('js-banner-subnav-show').removeAttr('style');
				});
			}).promise().done(function () {
				if (typeof callback === 'function') {
					callback();
				}
			});
		};

		/* show main navigation dropdown in small screen mode */
		$('.small-screen-nav').on('click', function (e) {
			/* if main navigation is closed, then open it */
			var navOpen = navLinks.hasClass('small-screen-nav-show');
			hideDropdown(false, function () {
				if (!navOpen) {
					navLinks.hide().addClass('small-screen-nav-show').slideDown(150).promise().done(function () {
						$(this).removeAttr('style');
					});
				}
			});
			e.stopPropagation();
		});

		/* remove hover effect from main navigation, and show sub-navigation on click (if closed) */
		navLinks.children('.js-nav-parent').removeClass('nav-parent-hover').on('click', function (e) {
			/* hide all open dropdowns on click first */
			var $this = $(this),
				classExists = $this.hasClass('js-nav-click');

			if ($(e.target).closest('li').hasClass('js-nav-parent')) {
				hideDropdown(true, function () {
					if (!classExists) {
						$this.addClass('js-nav-click');
						$this.children('.js-banner-subnav-links').hide().addClass('js-banner-subnav-show').slideDown(150).promise().done(function () {
							$(this).removeAttr('style');
						});
					}
				});
			}
			e.stopPropagation();
		});

		/* clicking away from the menu slides up any open dropdown */
		$(document).on('click', function () {
			hideDropdown(false, null);
		});

		/* make dropdown menus keyboard accessible with tab */
		navLinks.children('li').removeAttr('tabindex');
		subnavLinks.find('a').focus(function () {
			$(this).parents('.js-nav-parent').addClass('js-nav-click');
			$(this).parents('.js-banner-subnav-links').addClass('js-banner-subnav-show').show();
		}).blur(function () {
			$(this).parents('.js-nav-click').removeClass('js-nav-click');
			$(this).parents('.js-banner-subnav-links').removeClass('js-banner-subnav-show').removeAttr('style');
		});
		/* open the small screen menu when first item has focus. close when last element blurs */
		navLinks.find('a').filter(':first').focus(function () {
			navLinks.addClass('small-screen-nav-show').show();
			navLinks.find('a').filter(':last').blur(function () {
				navLinks.removeClass('small-screen-nav-show').removeAttr('style');
			});
		});
	});
}(jQuery));

com.nature.rjHomePage.init();
