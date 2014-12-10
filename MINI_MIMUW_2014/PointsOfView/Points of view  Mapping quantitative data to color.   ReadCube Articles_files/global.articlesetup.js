var com = com || {};
com.nature = com.nature || {};
var brightcove = window.brightcove || {};

com.nature.ArticleSetup = (function ($) {

	var ArticleSetup = function () {
		this.isAbstract = $('meta[name="abstract"]').attr('content') === 'yes';
		this.PageManager = com.nature.PageManager;
		this.highlighter = null;
		com.nature.compoundGroup = new com.nature.PopupGroup(true);

		var pm = this.PageManager;
		$('.compound_link').click(function (ev) {
			var t = $(this),
			href = t.attr('href');

			pm.trackCompoundNumberClick({
				destination: (href.indexOf('http://') !== -1) ? href : 'http://' + window.location.hostname + href,
				section: pm.getParentSection(t)
			});
			window.location.href = href;
			return false;
		});

	};
	ArticleSetup.prototype = {
		initHighlighting: function () {

			// -AIP-1189 unwrap compound highlighting in tables

			//$('table.data th span.annotation a').contents().unwrap();
			this.highlighter = new com.nature.Highlighter();
			this.highlighter = $.extend(this.highlighter, new com.nature.Broadcaster());
			this.highlighter.init();

			this.highlighter.subscribe('toggle', this.PageManager.trackHighlighting, this.PageManager);
		},
		initBookmarking: function () {
			var pm = this.PageManager;
			var $tbl = $('#toggle-bookmarking-links');
			if ($tbl.length) {
				var popup = new com.nature.Popup($tbl, $('#bookmarking-links').addClass('bookmarking-popup'), {
					hasArrow: false,
					position: 'below',
					closeOnClickOutside: true
				});
				popup.title('Bookmark &amp; Share');
				popup = $.extend(popup, new com.nature.Broadcaster());
				popup.init();
				popup.subscribe('open', pm.trackSocialBookmarking, pm);
			}
		},
		initCitations: function () {
			var pm = this.PageManager;
			var $tbl = $('#toggle-citation-links');
			if ($tbl.length) {
				var popup = new com.nature.Popup($tbl.linkify().find('a'), $('#citation-links').addClass('citation-popup'), {
					hasArrow: false,
					position: 'below'
				});
				popup.title('Citation Formats');
				popup = $.extend(popup, new com.nature.Broadcaster());
				popup.init();
			}
		},
		initDeliveryServices: function () {
			var pm = this.PageManager;
			var $tbl = $('.toggle-delivery-services');
			if ($tbl.length) {
				var popup = new com.nature.Popup($tbl.linkify(), $('.document-delivery').addClass('delivery-popup'), {
					hasArrow: false,
					position: 'below'
				});
				popup.title('Available document delivery services');
				popup = $.extend(popup, new com.nature.Broadcaster());
				popup.init();
			}
		},
		initExcerptToggle: function () {
			// js to toggle the opening and closing of thread excerpts
			var pm = this.PageManager;
			$('a.toggle-excerpt').click(function (e) {
				var $this = $(this);
				var _data = {};
				var $theExcerpt = $this.parents('.thread-excerpt');
				var $theExcerptContent = $theExcerpt.find('.excerpt-content');
				$theExcerptContent.toggle();
				
				if ($theExcerptContent.is(':visible')) {
					$this.html("Hide excerpt").toggleClass('open');
					_data.action = "expand";
					
				} else {
					$this.html("Show excerpt").toggleClass('open');
					_data.action = 'collapse';

				}
				// webtrends trackings
				_data.destination = "none";
				_data.nl = "51";
				_data.ndl = "51";
				_data.source = $theExcerpt.find('.excerpt-doi').text();
				pm.trackClick(_data);
				e.preventDefault();
			});
		},
		initAuthors: function () {
			var setupAuthors = function ($authors, cutoff) {
				var buildAuthorPopup = function ($target) {
					var authorDetailsId = $target.attr('href').replace(/^[^#]*#/, ''),
						popupId = 'author-' + authorDetailsId,
						popupHtml = '',
						$affiliations = null,
						$footnotes = null,
						$details = null,
						$popupHtml = null,
						details = '',
						$img,
						trunch,
						trunc,
						$bio,
						popup = group.get(popupId),
						$orcid,
						$corresAuthorContact;

					if (popup) {
						return popup;
					}

					popupHtml = '<div id="' + popupId + '" class="author-details-popup">';

					$details = $('#' + authorDetailsId).clone();
					$details.find('h3').remove();
					$img = $details.find('img.photo').remove();
					$orcid = $details.find('li.orcid a');

					var $corresAuthorContact = $details.find('p.email');
					if ($corresAuthorContact.length) {
						$corresAuthorContact.before('<h3 class="corres-auth-title" data-test="corres-label">Corresponding author</h3>');
						$corresAuthorContact.attr('data-test', 'corres-contact');
					}

					$bio = $details.find('.author-about');
					if ($bio.size()) {
						trunc = com.nature.Truncator.truncate($bio.html(), 1000);
						trunch = trunc.lastIndexOf('&hellip;</');
						if ((trunch > 0) && (30 > (trunc.length - trunch))) {
							$bio.removeAttr('id').html(trunc.substring(0, trunch + 8) + ' <a href="#' + authorDetailsId + '-about">Read&nbsp;more</a>' + trunc.substring(trunch + 8));
						}
					}

					if ($orcid.length) {
						popupHtml += '<span class="orcid"><span class="hidden">ORCID:</span> <a target="_blank" href="' + $orcid.attr('href') + '">' + $orcid.text() + '</a></span>';
						// Removing last bullet if last list item is Orcid.
						// Orcid is hidden, so we were ending up with a stray bullet in the list (see screenshot in COPS-369)
						var lastBull = $details.find('li.orcid').prev('li').find('span.bullet');
						if (lastBull) {
							$(lastBull).remove();
						}
					}

					details = $details.html();
	
					$affiliations = $target.closest('li').children('sup').children('a:not(#ft)');
					if ($affiliations.length) {
						popupHtml += '<ul data-test="af-popup" class="author-affiliations';
						if ($img.length) {
							popupHtml += ' author-img-wrapper" style="background-image:url(' + $img.attr('src') + ')">';
						} else {
							popupHtml += '">';
						}

						$affiliations.each(function () {
							var affiliationId = this.href.replace(/^[^#]*/, ''),
								$affiliation = $(affiliationId);
							if ($affiliation.length) {
								popupHtml += '<li>' + $affiliation.find('h3').html() + '</li>';
							} else {
								$affiliation = $(affiliationId + '-c');
								if ($affiliation.length) {
									popupHtml += '<li>' + $affiliation.html() + '</li>';
								}
							}
						});
						popupHtml += '</ul>';
					}

					// An id has been added to the footnotes in the bibliography to identify them
					$footnotes = $target.closest('li').children('sup').children('a#ft');
					if ($footnotes.length) {
						popupHtml += '<ul class="author-footnotes" data-test="af-popup">';
						$footnotes.each(function () {
							var footnoteId = this.href.replace(/^[^#]*/, ''),
								$footnote = $(footnoteId);
							if ($footnote.length) {
								popupHtml += '<li><h3 data-test="af-popup-statement">' + $footnote.find('h3').html() + '</h3>';
								popupHtml += '<ul class="author-footnotes-details" data-test="af-popup-authors">';
								$footnote.find('ul.footnote-authors li').each(function () {
									popupHtml += '<li>' + $(this).html() + '</li>';
								});
								popupHtml += '</ul></li>';
							}
						});
						popupHtml += '</ul>';
					}

					if (!com.nature.StringUtils.isEmpty(details)) {
						popupHtml += '<div class="author-details">' + details + '</div>';
					}

					popupHtml += '</div>';


					popup = new com.nature.Popup($target, $(popupHtml), {id: popupId});
					popup = $.extend(popup, new com.nature.Broadcaster());
					popup.init(true);
					popup.subscribe('open', group.onOpen, group);
					popup.subscribe('close', group.onClose, group);

					group.add(popup);
					return popup;
				};

				var $authorItems = $authors.children('li'),
					$hiddenAuthors = null,
					$lastVisibleAuthor = null,
					hasHiddenAuthors = false;

				if ($authorItems.length > 1) {
					$hiddenAuthors = $authorItems.filter('li:gt(' + cutoff + ')');

					hasHiddenAuthors = $hiddenAuthors.length !== 0;
					if (hasHiddenAuthors) {
						$lastVisibleAuthor = $authorItems.filter('li:eq(' + cutoff + ')');
					}

					renderAuthors($authorItems, $hiddenAuthors, $lastVisibleAuthor);
				}

				$authors.bind('click', function (e) {
					var $target = $(e.target).closest('a'),
						target = null,
						cls = '',
						isCollapsed = false,
						isExpanded = false,
						popup = null,
						popupId = null,
						etal = null;

					if (!$target.length) {
						return false;
					}
					if ($target.parent().hasClass('group-name')) {
						return true;
					}

					target = $target.get(0);
					cls = $target.attr('class') || '';
					isCollapsed = cls.indexOf('collapsed') !== -1;
					isExpanded = cls.indexOf('expanded') !== -1;

					if (isExpanded || isCollapsed) {
						while (target.hasChildNodes()) {
							target.removeChild(target.firstChild);
						}

						if (isCollapsed) {
							$hiddenAuthors.css({display: 'inline'});
							$lastVisibleAuthor.find('span.comma').css({display: 'inline'});
							$target.removeClass('collapsed').addClass('expanded');

							target.appendChild(document.createTextNode('Show fewer authors'));

							pm.trackAuthorListDisplay('expand');
						} else {
							$hiddenAuthors.each(function () {
								var id = 'author-' + $(this).find('a').attr('href').replace(/^[^#]*#/, ''),
									popup = group.get(id);

								if (popup && popup.isOpen) {
									popup.close();
									return false;
								}
							});

							$hiddenAuthors.hide();
							$lastVisibleAuthor.find('span.comma').hide();
							$target.removeClass('expanded').addClass('collapsed');

							etal = document.createElement('i');
							etal.appendChild(document.createTextNode('et al.'));
							target.appendChild(etal);

							pm.trackAuthorListDisplay('collapse');
						}
					} else {
						buildAuthorPopup($target).toggle(e);
					}
					e.stopPropagation();
					return false;
				});
			};


			var renderAuthors = function ($authors, $hidden, $last) {
				$authors.filter('li.last-in-group, li:last').each(function () {
					var $el = $(this);

					$el.addClass('no-comma');
					$el.prev('li').addClass('no-comma');

					if (!$el.hasClass('group-with-authors') && !$el.hasClass('collab')) {
						// only if more than 2 groups with authors
						if ($el.prev().length !== 0) {
							$el.find('a.name, a[href*="#group-"]').before("<span>&amp; </span>");
						}
					}
					// VIEW-3454 collab authors
					if ($el.hasClass('collab')) {
						// only if more than 2 authors
						if ($el.prev().prev().length !== 0) {
							$el.prev().find('a.name, a[href*="#group-"]').before('&amp; ');
							$el.prev().prev().addClass('no-comma');
						}
					}
				});
				$authors.filter('li:not(.no-comma)').children('a.name, a[href*="#group-"]').after('<span class="comma">,</span>');

				if (!$hidden.length) {
					return;
				}
				$hidden.hide();
				$last.find('span.comma').hide();

				$authors.parent().append('<li class="authors-toggle"><a href="javascript:;" class="collapsed"><i>et al.</i></a></li>');
			};

			var pm = this.PageManager,
				group = new com.nature.PopupGroup(true),
				correspondingAuthors = [],
				$primaryAuthorList = $('#content.article-template ul.authors:first, #content.related-content ul.authors:first, .video-header ul.authors:first, #constrain-content .metrics-head ul.authors:first'),
				$sibling = $primaryAuthorList.prev();
			$primaryAuthorList.remove();


			setupAuthors($primaryAuthorList, com.nature.Configuration.get('authorLimit') || 24);

			//$('h1.article-heading, h1.main-heading').after($primaryAuthorList);
			$sibling.after($primaryAuthorList);

			$('ul.authors:gt(0)').each(function () {
				setupAuthors($(this), 5);
			});

			$('#author-extra-details').find('p.email').each(function () {
				correspondingAuthors.push($(this).html().replace(/>contact\s+/i, '>'));
			});

			if (correspondingAuthors.length) {
				var html = '<div id="author-correspondence-popup"><ul class="corresponding-authors">';
				html += '<li>' + correspondingAuthors.join('</li><li>') + '</li>';
				html += '</ul></div>';

				var popup = new com.nature.Popup(
					$('#author-links').find('a[href$="#corres-auth"]'),
					$(html)
				);
				popup = $.extend(popup, new com.nature.Broadcaster());
				popup.init();

				popup.subscribe('open', group.onOpen, group);
				popup.subscribe('close', group.onClose, group);
				group.add(popup);
			}
		},
		initCommenting: function () {
			/*
			var hiddenComments = $('#comments ol.comments:first > li:gt(2)');

			var hidden = true;
			if (hiddenComments.length > 1) {
				hiddenComments.css({display: 'none'});

				$('#comments ol.comments:first').after('<p class="right-arrow view-all"><a href="javascript:;" id="comments-toggle">View all comments</a></p>');
				$('#comments-toggle').click(function () {
					if (hidden) {
						$(this).text('Hide comments');
						hiddenComments.css({display: 'block'});
					} else {
						$(this).text('View all comments');
						hiddenComments.css({display: 'none'});
					}
					hidden = !hidden;
				});
			}
			*/
			var active = null;
			var showLinks = function (e) {
				var $target = $(e.target).closest('li[id]');
				if (!$target) { return; }

				hideLinks();

				$target.find('p.moderation').first().css({position: 'static', left: '0'});
				active = $target.attr('id');
			};
			var hideLinks = function () {
				if (active) {
					$('#' + active).find('p.moderation').css({position: 'absolute', left: '-9999em'});
				}
				active = null;
			};

			$('#comments ol.comments').mouseover(showLinks).mouseout(hideLinks).find('a').focus(showLinks);

			if (!$('#comment-preview').length) {
				return;
			}

			var helpHidden = true;
			$('#comment-help h3').linkify().find('a').click(function () {
				if (helpHidden) {
					$('#comment-help ul').slideDown('fast');
					$(this).addClass('collapse');
				} else {
					$('#comment-help ul').slideUp('fast');
					$(this).removeClass('collapse');
				}
				helpHidden = !helpHidden;
			});

			$('#comment-body').preview('#comment-preview dd', 'textile').grow(); //resizeTextarea();
		},
		initCompoundNumbers: function (scope) {
			var pm = this.PageManager,
			group = com.nature.compoundGroup,
			selector = scope ? scope + ' a[class*="compound-ref-"]' : ' a[class*="compound-ref-"]',
			$selector = $(selector);

			var processCompounds = function (i, item, context) {
				item.style.display = "none";
				var $this = $(item);
				var  $parent = $this.parent();
				if ($parent.hasClass('main-heading') || $parent.hasClass('legend') || $parent.is('h2') || $parent.is('thead th')) {
					$this.replaceWith('<b>' +  $this.html() + "</b>");
				} else if ($this.parents('ul.section-nav').length === 0) {

					var compId = /compound-ref-[\-a-z0-9]+/i.exec(item.className)[0],
						href = $this.attr('href');
					$this.one('click', function (e) {
						var WtIdent = pm.getParentSection($this),
						popupContent = $('#' + compId),
						popup = new com.nature.Popup($this, popupContent, {
							hasTitle: false,
							hasCloseButton: true,
							event: 'click',
							closeOnClickOutside: true
						});
						popup = $.extend(popup, new com.nature.Broadcaster());
						popup.init();
						popup.subscribe('open', group.onOpen, group);
						popup.subscribe('close', group.onClose, group);
						group.add(popup);
						var popupImgWidth = popup._$content.find('img').width();
						var popUpHead = popup._$content.find('h3');
						var mobileDisplay = $("#mobile-css-test").css("display");
						if (mobileDisplay === "block") {
							popUpHead.css('width', "100%");
						} else if (popupImgWidth <= 240 && mobileDisplay !== "block") {
							popUpHead.css('width', "240px");
						} else {
							popUpHead.css('width', popupImgWidth + "px");
						}

						popup.subscribe('open', function () {
							$("ul.compound-links li a.database_link, .popup-content h2 a").click(function (ev) {
								var theHref = $(this).attr('href');
								ev.preventDefault(ev);
								var tracking = {};
								tracking.destination = (theHref.indexOf('pubchem') !== -1) ?  "link: PubChem" : "compound-page";
								tracking.section = (WtIdent && WtIdent.indexOf("figure-browser-preview") !== -1) ? "figure-browser-preview" : WtIdent;
								pm.trackDbLinksClick(tracking);
								if (theHref.indexOf('pubchem') !== -1) {
									window.open(theHref,  '_blank');
								} else {
									window.location.href = theHref;
								}
							});
							var tracking = {
								type: popup._$content.find('h2').text(),
								section: (WtIdent && WtIdent.indexOf("figure-browser-preview") !== -1) ? "figure-browser-preview" : WtIdent
							};
							pm.trackCompoundNumberClick(tracking);
						});
						popup.open();
						e.preventDefault(e);

					});
				} else {
					// AIP-1131 - don't highlight compounds in section nav; remove link to compounds
					var pText = $parent.text(),
					replacer = $parent.find('a:first').text(pText);
					$this.remove();
					$parent.empty().append(replacer);

				}
				item.style.display = "";
			};
			if ($selector.length > 0) {
				com.nature.timedChunk($.makeArray($selector), processCompounds, this);
			}
		},
		initGlossaryTerms: function (scope) {
			var pm = this.PageManager,
				sel = 'a.glossary-ref',
				$links = scope ? $(sel, $(scope)) : $(sel),
				group
			;
			if (0 < $links.size()) {
				group = new com.nature.PopupGroup(true);
				$links.each(function () {
					var t = $(this),
						href = t.attr('href'),
						defId = href.split('#')[1],
						popup_content = $('#' + defId).closest('dt').next('dd'),
						popup = new com.nature.Popup(t, popup_content, {
							hasTitle: false,
							hasCloseButton: true,
							event: 'click',
							position: 'below',
							closeOnClickOutside: true
						})
					;
					popup = $.extend(popup, new com.nature.Broadcaster());
					popup.init();
					popup.subscribe('open', group.onOpen, group);
					popup.subscribe('close', group.onClose, group);
					group.add(popup);
				});
			}
		},
		initDbLinks: function (scope, parentSection) {
			var pm = this.PageManager,
				selector = scope ? scope + ' a.database_link' : 'a.database_link';
			$(selector).each(function () {
				var t = $(this);
				t.click(function (event) {
					var thisClicked = $(this),
						href = thisClicked.attr('href'),
						db = thisClicked.attr('data-database'),
						dbType = thisClicked.attr('data-dbType'),
						theDestination;
					if (db) {
						theDestination = 'link: ' + db.replace(' ', '');
					}
					var theSection;
					if (t.closest('ol').hasClass('gene-protein-index')) {
						theSection = "geneprot-index";
					}
					else if (t.closest('ol').hasClass('compound-index')) {
						theSection =  "compound-index";
					}
					else {
						theSection = (parentSection) ? parentSection : pm.getParentSection(t);
					}
					event.preventDefault();
					var tracking = {
						dl: "1",
						ndl: "1",
						action: "database_link_click",
						destination: theDestination,
						section: theSection,
						type: dbType
					};
					pm.trackDbLinksClick(tracking);
					if (db) {
						window.open(href, '_blank');
					} else {
						window.location.href = href;
					}
					return false;
				});
			});
		},
		initDraggable: function () {
			var suppGroup = new com.nature.PopupGroup(true),
				pm = this.PageManager,
				$generator = new com.nature.ThumbGenerator();

			var togglezoom = function () {
				var $target = $(this);
				if ($target.attr('class') === 'zoom-off') {
					var data = {
						parentSection: pm.getParentSection($target),
						action: "enable_zoom"
					};
					pm.trackZoom(data);
					$target.attr('class', 'zoom-on').text('Disable zoom');
					// enable zoomer, but don't show it yet (user's mouse will not be over the image)
					$('#zoomer').css({'visibility': 'visible', 'display': 'none'});
					// handle fade out & positioning of info box
					var parentel = $target.parents('div.popup-content:first');
					// there are several images on the page; grab dimensions of the right one
					var zoomimg = $(parentel).children('div.supp-wrapper:first').children('img:first');
					$('div.zoom-info').css({'top': ($(zoomimg).height() / 2) + 50, 'left': ($(zoomimg).width() / 2) - 30}).show();
					setTimeout(function () {$('div.zoom-info').fadeOut('slow'); }, 2500);
				}
				else {
					$target.attr('class', 'zoom-off').text('Enable zoom');
					var data = {
						parentSection: pm.getParentSection($target),
						action: "disable_zoom"
					};
					pm.trackZoom(data);
					// hide zoomer
					$('#zoomer').css({'visibility': 'hidden', 'display': 'none'});
				}
				return false;
			};

			$("a.draggable").each(function (i) {
				var relatedId = '#' + $(this).attr('data-related-id'),
					popupContent = $($(relatedId)[0]).clone(),
					$wrapper = $(relatedId).closest('li'),
					showMoreLink = $('<a href="#" class="show-more">Show More</a>'),
					captionHeight = 44,
					popup,
					$this = $(this);

				popupContent.find('.meta').append($wrapper.find('div.larger').html());
				popupContent.find('.meta').append($wrapper.find('div.control-zoom').html());
				popupContent.find('.meta').append($wrapper.find('div.source-data').html());
				popup = new com.nature.Popup($(this), popupContent, { hasArrow: false });
				popup.title($wrapper.find('.supp-title').html());
				popup = $.extend(popup, new com.nature.Broadcaster());
				popup.init();
				popup.subscribe('open', suppGroup.onOpen, suppGroup);
				popup.subscribe('close', suppGroup.onClose, suppGroup);
				suppGroup.add(popup);
				popup = $.extend(popup, new com.nature.DraggablePopup(null, '.title-bar'));
				popup.subscribe('open', popup.onOpen, popup);

				if ($this.hasClass('supp-fig') || $this.hasClass('supp-vid') || $this.hasClass('supp-tab')) {
					popup.subscribe('build', function () {
						var $popup = popup._$popup,
							$captionWrapper = $popup.find('.caption-wrapper');
						$captionWrapper.css('max-height', captionHeight * 2);
					});
				}

				if ($this.hasClass('supp-fig')) {
					popup.wtAction = 'figure-supp';
					popup.destination = 'figure_popover';
					popup.fullSizeDestination = 'figure_fullsize';
					popup.subscribe('build', function () {
						this._$popup.find('.supp-figures-wrapper img').addpowerzoom();
						this._$popup.find('.zoom-toggle a').bind('click', togglezoom);
					}, popup);
				}
				else if ($this.hasClass('supp-tab')) {
					popup.wtAction = 'table-supp';
					popup.destination = 'table_popover';
					popup.fullSizeDestination = 'table_fullsize';
					popup.subscribe('build', function () {
						this._$popup.find('.supp-tables-wrapper img').addpowerzoom();
						this._$popup.find('.zoom-toggle a').bind('click', togglezoom);
					}, popup);
				}
				else if ($this.hasClass('supp-vid')) {
					popup.wtAction = 'video-supp';
					popup.destination = 'video_popover';
					popup.fullSizeDestination = 'video_fullsize';
					popup.subscribe('build', function () {
						var maxWidth = 100,
							maxHeight = 80,
							expectedAspect = maxWidth / maxHeight,
							$popup = popup._$popup.append('<div class="simple-carousel"><ol></ol></div>'),
							$meta = $popup.find('.meta'),
							$captionWrapper = $popup.find('.caption-wrapper'),
							$caption = $popup.find('.caption'),
							carouselList = $popup.find('.simple-carousel ol'),
							listItems = $("ul#supplementary-video-list li"),
							loadedCount = 0,
							vidId = $wrapper.data('video'),
							playerStr = '<div style="display:none"></div><object id="' + $popup.attr('id') + '-video" class="BrightcoveExperience"><param name="width" value="100%" /><param name="height" value="284" /><param name="playerID" value="' + brightcove.settings.playerId + '" /><param name="playerKey" value="' + brightcove.settings.playerKey + '" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="' + vidId + '" /><param name="bgcolor" value="#EEEEEE" /><param name="includeAPI" value="true" /></object>';


						$popup.find('.vid-loader').append(playerStr);
						brightcove.createExperiences();
						if (listItems.length) {
							listItems.each(function (idx, li) {
								var brightcoveId = $(li).data('video'),
									padding = 0,
									calculateLength = false,
									generateThumb = function (imageUrl, maxWidth, maxHeight, padding, len) {
										// add items to page
										var carouselItem = '<li class="carousel-item"><img src="' + imageUrl + '" style="padding:' + padding + '; width:' + maxWidth + 'px; height:' + maxHeight + 'px;" data-video="' + brightcoveId + '" /></li>';
										carouselList.append(carouselItem);
										loadedCount++;
										if (listItems.length === loadedCount) {
											var suppid = popup.id.split('-')[1].substr(2),
												caro = new com.nature.SimpleCarousel(popup._$popup.find('div.simple-carousel'), {
													showLoader: false,
													thumbSpacing: 6,
													initialActive: (suppid - 1),
													height: maxHeight,
													title: 'More videos from this article',
													inView: 4
												});
											caro = $.extend(caro, new com.nature.Broadcaster());
											caro.subscribe('scrolled', pm.trackVideoCarouselScroll, pm);
											caro.subscribe('thumbClicked', pm.trackVideoCarouselThumbs, pm);
											caro.init();
											$('.thumbs a', $popup).click(function () {
												var objTagId = $popup.attr('id') + '-video',
													player = brightcove.api.getExperience(objTagId),
													modVp = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER),
													index = $(this).parent().prevAll().length,
													hiddenDataLi = listItems.eq(index);

												$popup.find('.title-bar h2').html(hiddenDataLi.find('.supp-title').html());
												$popup.find('.caption').html(hiddenDataLi.find('.caption').html());
												$popup.find('a.view-full-size').attr('href', hiddenDataLi.find('a.view-full-size').attr('href'));
												modVp.loadVideoByID($(this).find('img').data('video'));

												if ($caption.height() < 50) {
													showMoreLink.hide();
												} else {
													showMoreLink.show();
												}
												$captionWrapper.css('height', captionHeight);
												showMoreLink.text('Show More');
												showMoreLink.data('isClosed', true);

												return false;
											});
										}
									};
								$generator.requestThumb(brightcoveId, brightcove.settings.playerToken, maxWidth, maxHeight, padding, calculateLength, generateThumb);
							});
						}
					}, pm);
				}
				popup.subscribe('open', pm.trackSupInfoPopup, pm);
				popup.subscribe('build', function () {
					$('p.full-size a', popup._$popup).click(function (ev) {
						ev.preventDefault();
						var params = {
							action: popup.destination,
							destination: popup.fullSizeDestination,
							source: popup.id.split('-')[1]
						};
						pm.track(params);
						window.location.href = $(this).attr('href').indexOf('http://') !== -1 ? $(this).attr('href') : 'http://' + window.location.hostname + $(this).attr('href');
					});
				}, pm);
			});
		},
		initRelatedFigureTabs: function () {
			var $theWindow  = $(window);
			var $figTabs = $('#figure-tabs');
			var $interactiveTabs = $figTabs.find('#figure-interactive');
			var tableauLoad = function (active) {
				if (active === "figure-interactive") {
					$.ajax({
						'url': "http://public.tableausoftware.com/javascripts/api/viz_v1.js",
						'dataType': 'script',
						'cache': true,
						'success': jQuery.noop
					});
				}
			};
			var tabSetup = function () {
				var self = this;
				if ($theWindow.width() > 970) {
					$interactiveTabs.find('.tableauPlaceholder').css('height', "auto");
					$figTabs.addClass('primary-tabs');
					$figTabs.each(function () {
						var $this = $(this);
						var t = new com.nature.TabGroup($this);
						t = $.extend(t, new com.nature.Broadcaster());
						t.isAddressable = true;
						t.tabTypes = ["static", "interactive"];
						t.init();
						tableauLoad(t.active);
						t.subscribe('switch', function () {
							tableauLoad(t.active);
						});
					});
				} else {
					$figTabs.removeClass('primary-tabs');
					$interactiveTabs.find('.tableauPlaceholder').css('height', "1px");
				}
			};
			tabSetup();
			var resizeTimer;
			$theWindow.resize(function () {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(tabSetup, 100);
			});
		},
		initFigureBrowserTabs: function () {
			var pm = com.nature.PageManager;
			var self = this;
			$('#figure-browser-group').each(function () {
				var $this = $(this);
				var t = new com.nature.TabGroup($this);
				// all figure tab types must be added to this array required for addressable tabs
				t.tabTypes = ["genesandproteins", "figures", "videos", "compounds", "tables"];
				t.isAddressable = true;
				t = $.extend(t, new com.nature.Broadcaster());
				t.init();
				t.subscribe('switch', function () {
					$this.trigger('switched'); // custom jQ event on $el
				});
				t.subscribe('switch', pm.saveTabState, pm);
				t.subscribe('switch', pm.trackTabs, pm);
			});
		},
		initFigureBrowser: function () {
			var pm = this.PageManager;
			var ifb = this;
			$('#figure-browser-group div.figure-browser').each(function () {
				var $this = $(this);
				var figs = new com.nature.FigureBrowser($this);
				figs = $.extend(figs, new com.nature.Broadcaster());
				figs.subscribe('scrolled', pm.trackFigureBrowser, pm);
				figs.subscribe('popupShown', pm.trackFigurePopup, pm);
				var self = ifb;
				figs.subscribe('close', function (ev, obj, id) {
					com.nature.Popups.redraw('close', id);
				});
				figs.start();

				$this.find('a.view-all').click(function (e) {
					e.preventDefault();
					var $t = $(this);
					var tabType = $t.parents(".figure-browser").attr('id').substring(15);
					var href = $t.attr('href');
					var _data = {};
					_data.source = tabType + "-browser";
					_data.action = "view_all_" + tabType + "s";
					_data.destination = href;
					_data.dl = 1;
					_data.ndl = 1;
					pm.trackClick(_data);
					window.location.href = href;
				});
			});
		},
		initReferenceContextLinks: function () {
			var self = this;
			var getRefContext = function () {
				var $parent = $(this).closest('li[id^="ref"]');
				var id = $parent.attr('id');

				var $contextBlock = $('#' + id + '-context');
				if ($contextBlock.length && $contextBlock.css('display') !== 'none') {
					$contextBlock.css({display: 'none'});
					$(this).removeClass('collapse').text('Show context');
				} else {

					if ($contextBlock.length) {
						$contextBlock.css({display: 'block'});
					} else {
						var html = '';
						$('#content a[href$="#' + id + '"]').each(function () {
							if ($(this).parents('ol.references, div.figure-browser, div#extended-data, div#supplementary-information').length) {
								return true;
							}
							var haystack = $(this).closest('h1,h2,h3,h4,span.legend,p,li,div');
							var item = com.nature.Truncator.getContextSnippet(
								haystack, // haystack
								$(this), // needle
								150 // number of leading characters
							);
							html += '<li>' + item;
							if ($(haystack).parents('#supplementary-tables-list').length === 0 && $(haystack).parents('#supplementary-video-list').length === 0) {
								html += ' <a href="#' + $(this).attr('id') + '" title="Skip to this reference in the article" class="ref-return">in article</a>';
							}
							html += '</li>';
						});

						html = html.replace(/ id="[^"]+"/ig, '');
						html = '<ul id="' + id + '-context" class="context">' + html + '</ul>';

						$parent.append(html);
						self.initCompoundNumbers('#' + id + '-context');
						self.highlighter.initPopups($('#' + id + '-context'));
					}
					$(this).addClass('collapse').text('Hide context');
				}
				self.PageManager.trackClick({"action": "context_link", "source": id});
			};

			if (!this.isAbstract) {
				var $refs = $('#references ol.references li[id^="ref"]');
				$refs.each(function () {
					if ($('#content a[href$="#' + $(this).attr('id') + '"]').length) {
						var $uls = $(this).find('ul');
						if (!$uls.length) {
							$(this).append('<ul class="cleared has-ref-links"></ul>');
						} else {
							$uls.addClass('has-ref-links');
						}
					}
				});
				$refs.find('ul.has-ref-links').append('<li class="show-context-item"><a href="javascript:;">Show context</a></li>').find('li.show-context-item').find('a').click(getRefContext);
			}
		},
		initSummBox: function () {
			$('#summary-box div.full-snippet').each(function () {
				var $this = $(this);
				if ($this.find('p').text().length > 200) {
					$this.parent().append('<div class="snippet">' + com.nature.Truncator.truncate($this.find('p').html(), 200) + '</div><a href="javascript:;" class="toggle-bar"><span>Toggle</span></a>');
				} else if ($this.parent()[0].id === "sidebar-video") {
					$this.parent().append('<div class="snippet"></div><a href="javascript:;" class="toggle-bar"><span>Toggle</span></a>');
				} else {
					$this.css({display: 'block'});
				}
			});
			$('#summary-box a.toggle-bar').click(function () {
				var $parent = $(this).closest('div.summary-item');
				var $divSnippet = $parent.find('div.snippet');
				if ($(this).hasClass('collapse')) {
					var startHeight = $divSnippet.height();

					var targetHeight = $divSnippet.css({display: 'block', visibility: 'hidden'}).height();
					$parent.find('div.full-snippet').css({display: 'none'});
					$divSnippet.css({height: startHeight + 'px', visibility: 'visible', overflow: 'hidden'}).animate({
						height: targetHeight + 'px'
					}, 'fast', function () {
						$divSnippet.css({visibility: 'visible'});
					});
					$(this).removeClass('collapse');
				} else {
					var startHeight = $divSnippet.height();
					var targetHeight = $parent.find('div.full-snippet').css({display: 'block', visibility: 'hidden', height: 'auto'}).height();
					$divSnippet.css({display: 'none'});
					$parent.find('div.full-snippet').css({height: startHeight + 'px', visibility: 'visible', overflow: 'hidden'}).animate({
						height: (targetHeight) + 'px'
					}, 'fast');
					$(this).addClass('collapse');
				}
			});
		},
		initBoxes: function () {
			$('.box-internal').each(function () {
				if ($(this).text().length > 200) {
					$(this).append('<a href="javascript:;" class="toggle-bar collapse"><span>Reduce</span></a>');
				} else {
					$(this).css({display: 'block'});
				}
			});
			$('.box-internal a.toggle-bar').click(function () {
				var $box = $(this).parent().find('.item-content', '.figure-content');

				if ($(this).hasClass('collapse')) {
					if (!$box.prop("data-startHeight")) {
						var boxHeight = $box.height(),
							boxSection = $box.parents('div.content');
						/*
						[VIEW 2135]
						All element heights inside of a display: none container
						will calcuate to 0 - we know it isn't true because the
						inner text is over 2000 chars so need to flash display
						block on the container to get the correct value
						*/
						if (boxHeight === 0) {
							boxSection.addClass("calculateHeights");
							boxHeight = $box.height();
							boxSection.removeClass("calculateHeights");
						}
						$box.prop("data-startHeight", boxHeight);
					}
					$box.css({overflow: 'hidden'}).animate({
						height: '50px'
					}, 'fast');
					$(this).removeClass('collapse');
					$(this).find("span").text("Expand");
				} else {
					$box.animate({
						height: $box.prop("data-startHeight") + 'px'
					}, 'fast');
					$(this).addClass('collapse');
					$(this).find("span").text("Reduce");
				}
			});
			//Boxes should start collapsed but we need to render open initially to get the height, and then simulate a click
			$('.box-internal a.toggle-bar').click();
		},
		initArticleNavigation: function () {
			var a = new com.nature.Article();
			a = $.extend(a, new com.nature.Broadcaster());
			a.init();

			a.subscribe('expand', this.PageManager.saveSectionState, this.PageManager);
			a.subscribe('expand', this.PageManager.trackSections, this.PageManager);
			a.subscribe('expand', function (ev, section, id) {
				com.nature.Popups.redraw('open', id);
			});
			a.subscribe('collapse', this.PageManager.saveSectionState, this.PageManager);
			a.subscribe('collapse', this.PageManager.trackSections, this.PageManager);
			a.subscribe('collapse', function (ev, section, id) {
				com.nature.Popups.redraw('close', id);
			});
			a.subscribe('scroll', this.PageManager.trackNavigation, this.PageManager);
		},
		initToggleAll: function () {
			$("span.toggleAll").linkify();
			$("span.toggleAll a").addClass("toggleAll collapsed");
			$("a.toggleAll").click(function () {
				if ($(this).hasClass('expanded')) {
					$(this).removeClass('expanded').addClass('collapsed').text('Expand all');
					$(this).parent().parent().find('.sub-section').each(function () {
						$(this).removeClass('expanded').addClass('collapsed');
					});
				} else {
					$(this).removeClass('collapsed').addClass('expanded').text('Collapse all');
					$(this).parent().parent().find('.sub-section').each(function () {
						$(this).removeClass('collapsed').addClass('expanded');
					});
				}
			});
		},
		//Generic handler to track items which do not have their own functions/non-js
		initClickTrack: function () {
			var pm = this.PageManager;
			var _trackData = {
				"print-link": {
					"action": "print",
					"source": "print-link"
				},
				"next-article": {
					"action": "next_article",
					"source": 'doi:' + com.nature.Configuration.get("articleDoi"),
					"destination": 'doi:' + com.nature.Configuration.get("nextDoi"),
					"dl": "1",
					"ndl": "1"
				},
				"prev-article": {
					"action": "prev_article",
					"source": 'doi:' + com.nature.Configuration.get("articleDoi"),
					"destination": 'doi:' + com.nature.Configuration.get("prevDoi"),
					"dl": "1",
					"ndl": "1"
				},
				"supp-fig": {
					"action" : "figure_supp",
					"source": 'supp-fig',
					"destination": "figure_fullsize"
				},
				"supp-video": {
					"action" : "video_supp",
					"source": 'supp-video',
					"destination": "video_fullsize"
				},
				"reprints": {
					"action" : "reprints",
					"source": "reprints-link",
					"destination": "",
					"dl": "1",
					"ndl": "1"
				},
				"permissions": {
					"source": "permissions-link",
					"action" : "permissions",
					"dl": "1",
					"ndl": "1",
					"destination": ""
				},
				"readcube-purchase": {
					"source": 'doi:' + com.nature.Configuration.get("articleDoi"),
					"action" : "mop_access_options",
					"dl": "1",
					"ndl": "1",
					"destination": "link:readcube"
				},
				"supp-table": {
					"action" : "table_supp",
					"source": 'supp-tab',
					"destination": "table_fullsize"
				},
				"citations-box": {
					"action": "metrics",
					"source": 'doi:' + com.nature.Configuration.get("articleDoi")
				},
				"mop-access": {
					"action": "mop_access_options",
					"ndl": "1",
					"dl": "1",
					"source": "doi:" + com.nature.Configuration.get("articleDoi")
				},
				"reshigh-carousel": {
					"source": "doi:" + com.nature.Configuration.get("articleDoi"),
					"action": "reshigh-carousel-click"
				},
				"loop_widget_claim_article": {
					"action": "loop_widget_claim_article",
					"source": "loop_widget:doi:"  + com.nature.Configuration.get("articleDoi"),
					"destination" : "loop_article_claim",
					"si_n" : "Loop Article Claim",
					"si_x" : "1",
					"ndl": "1",
					"dl": "1"
				},
				'loop_widget_more_on_loop': {
					"action": "loop_widget_more_on_loop",
					"source": "loop_widget:doi:"  + com.nature.Configuration.get("articleDoi"),
					"destination" : "authorprofiles",
					"ndl": "1",
					"dl": "1"
				},
				'loop_widget_profile_click': {
					"action": "loop_widget_profile_click",
					"source": "loop_authorprofiles:doi:" + com.nature.Configuration.get("articleDoi"),
					"destination" : "authorprofiles",
					"ndl": "1",
					"dl": "1"
				},
				"loop_authorprofiles_add_your_profile" : {
					"action": "loop_authorprofiles_add_your_profile",
					"source": "loop_authorprofiles",
					"destination" : "loop_article_claim",
					"si_n" : "Loop Article Claim",
					"si_x" : "1",
					"ndl": "1",
					"dl": "1"
				},
				"loop_authorprofiles_profile_click" : {
					"action": "loop_authorprofiles_profile_click",
					"source": "loop_authorprofiles",
					"destination" : "loop_article_claim",
					"si_n" : "Loop Article Claim",
					"ndl": "1",
					"dl": "1"
				},
				"loop_authorprofiles_sign_up" : {
					"action": "loop_authorprofiles_sign_up",
					"source": "loop_authorprofiles",
					"destination" : "loop_registration",
					"ndl": "1",
					"dl": "1"
				}
			};

			$(".track").click(function () {
				var _data = _trackData[$(this).attr('id')] || null;
				if (_data) {
					pm.trackClick(_data);
				}
			});
			if ($(document.body).hasClass('small-screen')) {
				$(".draggable").click(function () {
					var _data;
					if ($(this).hasClass('supp-vid')) {
						var _data = _trackData['supp-video'];
						_data.source = $(this).attr('data-related-id');
					}
					else if ($(this).hasClass('supp-tab')) {
						var _data = _trackData['supp-table'];
						_data.source = $(this).attr('data-related-id');
					} else {
						var _data = _trackData['supp-fig'];
						_data.source = $(this).attr('data-related-id');
					}
					if (_data) {
						pm.trackClick(_data);
					}
				});
			}
			$(".order-reprints a").click(function () {
				var _data = _trackData['reprints'] || null;
				if (_data) {
					pm.trackClick(_data);
				}
			});
			$(".rights a").click(function () {
				var _data = _trackData['permissions'] || null;
				if (_data) {
					pm.trackClick(_data);
				}
			});

			$("#citations-box").click(function () {
				var _data = _trackData['citations-box'] || null;
				if (_data) {
					pm.trackClick(_data);
				}
			});

			$(".track-encode a, .interactive-link a, a.interactive-link").click(function () {
				var _data = _trackData["interactive-link"];
				var theDoi = 'doi:' + com.nature.Configuration.get("articleDoi");
				var actn = ($(this).parent().hasClass('track-encode')) ? "illustration" : "interactive";
				_data.source = theDoi;
				_data.destination = 'link:' + $(this).attr('href');
				_data.action =  actn;
				_data.es = window.location.href;
				if (_data) {
					pm.trackClick(_data);
				}
			});

			$(".track-encode a, .interactive-link a, a.interactive-link").click(function (ev) {
				pm.trackInteractive(ev, $(this));
			});
			$('a.citation-wrapper, a.citation-source').click(function (e) {
				var params = {
					action: "article_metrics_citations",
					source: "doi:" + $('dd.doi').text().substr(4),
					destination: "link:" + $(this).data('citation-service'),
					ndl: '1',
					dl: '1'
				};
				pm.track(params);
			});
			$("div.readcube-purchase").on("click", "a", function (e) {
				e.preventDefault();
				var _data = _trackData['readcube-purchase'] || null;
				if (_data) {
					pm.trackClick(_data);
				}
				// Delay following the link long enough that WT data can be logged
				window.location = $(this).attr("href");
				return false;
			});
			/*
				Similar to above, but for options other than ReadCube.
				The ReadCube action won't fire here as it relies on .on('click' [...])
			*/
			$('#access.subscribe-prompt a').click(function () {
				var _data = _trackData['mop-access'] || null;
				if ($(this).attr('id')) {
					var _dest = $(this).attr('id').substr($(this).attr('id').indexOf('-') + 1);
					_data.destination = "link:" + _dest.replace(/-/g, ' ');
					if (_data) {
						pm.trackClick(_data);
					}
				}
			});
			$("body").on("click", "div.document-delivery div.popup-content a", function (e) {
				e.preventDefault();
				var _data = _trackData['mop-access'] || null;
				var _dest = $(this).attr('id').substr($(this).attr('id').indexOf('-'));
				_data.destination = "link:" + _dest.replace(/-/g, ' ');
				if (_data) {
					pm.trackClick(_data);
				}
				// Delay following the link long enough that WT data can be logged
				window.location = $(this).attr("href");
				return false;
			});
			$('ul.authors li.vcard a.name').click(function (e) {
				var params = {
					action: "author",
					source: "doi:" + com.nature.Configuration.get("articleDoi"),
					destination: "author-" + $(this).attr('href').substring(1)
				};
				pm.track(params);
			});
			
			$('html.js-enabled').on("click", "span.orcid a", function (e) {
				var params = {
					action: "ORCID_id_click",
					source: $(this).closest('div.popup').attr('id'),
					destination: "orcid: " + $(this).text().replace('orcid.org/', '')
				};
				pm.track(params);
			});
			$('.reshigh-carousel').on("click", "a", function () {
				var _data = _trackData["reshigh-carousel"];
				if ($(this).hasClass('left')) {
					_data.destination = "left-scroll";
				}
				else if ($(this).hasClass('right')) {
					_data.destination = "right-scroll";
				}
				else {
					_data.destination = "article-click";
				}
				if (_data) {
					pm.trackClick(_data);
				}
			});

			$('[data-track-click]').click(function (ev) {
				var $el = $(this);
				var type = $el.data('track-click');
				var _data;

				switch (type) {

				case 'loop_widget_claim_article':
					_data = _trackData[type] || null;
					break;

				case 'loop_widget_more_on_loop':
					_data = _trackData[type] || null;
					break;

				case 'loop_widget_profile_click':
					_data = _trackData[type] || null;
					_data.destination = "link:" + $el.attr('href');
					break;

				case 'loop_authorprofiles_add_your_profile':
					_data = _trackData[type] || null;
					break;

				case 'loop_authorprofiles_profile_click':
					_data = _trackData[type] || null;
					_data.destination = "link:" + $el.attr('href');
					break;

				case 'loop_authorprofiles_sign_up':
					_data = _trackData[type] || null;
					_data.destination = "loop_registration";
					break;

				}
				if (_data) {
					pm.trackClick(_data);
				}
				
			});


		},
		initBeanData: function () {
			var btn = $("#bakedbean a");
			setTimeout(function () {
				$("#bakedbean .inner").slideDown(1000);
			}, 100);

			btn.click(function (e) {
				$("#bakedbean .inner").slideToggle(1000);
				$("html:not(:animated),body:not(:animated)").animate({ scrollTop: 0}, 500);
				e.preventDefault();
			});
		},
		initReshighCarousel: function () {
			var defaultShowCount = 4;
			var animationEnabled = true;
			$(".reshigh-carousel").each(function () {
				var $carousel = $(this),
					$container = $(".container", $carousel),
					$list = $("> ul", $container),
					$items = $("> li", $list),
					showCount = (this.className.match(/show-(\d)/) || [defaultShowCount]).pop();


				if ($items.length <= showCount) {
					$items.width(Math.floor($container.width() / $items.length));
					return;
				} else {
					$carousel.addClass("active");
				}

				var $left = $('<a href="javascript:;" title="Scroll Left" class="left"><span></span></a>').prependTo($carousel),
					$right = $('<a href="javascript:;" title="Scroll Right" class="right"><span></span></a>').appendTo($carousel),
					idealWidth = Math.floor($container.width() / showCount) + 1,
					width,
					interval;

				var scroll = {
					left: function (shouldAnimate) {
						var newScroll = (parseInt($list.css('left'), 10) || 0) - width;
						$(".reshigh-carousel .left").show();
						var currentItems = -(parseInt($list.css('left'), 10) / width) + defaultShowCount;

						if (currentItems >= $items.length) {
							newScroll += width;
						} else {
							$(".reshigh-carousel .right").show();
						}
						if (currentItems + 1 >= $items.length) {
							$(".reshigh-carousel .right").hide();
						}

						if (shouldAnimate) {
							$list.animate({left: newScroll - 1 }, function () { animationEnabled = true; });
						} else {
							$list.css("left", newScroll);
							animationEnabled = true;
						}
						/*,{
							complete: function ( ) {
								$items = $("li",$list);
								$list.append($items[0]);
								$list.css("left",0);
							}
						});*/
					},
					right: function (shouldAnimate) {
						var newScroll = (parseInt($list.css('left'), 10) || 0) + width;
						$(".reshigh-carousel .right").show();

						if (newScroll >= 0) {
							newScroll = 0;
							$(".reshigh-carousel .left").hide();
						} else {
							$(".reshigh-carousel .left").show();
						}
						$list.animate({left: newScroll + 1 }, function () { animationEnabled = true; });
					},
					click: function (dir) {
						return function (e) {
						/*	clearInterval(timer);
							clearTimeout(timer);
							timer = setTimeout(function () {
								timer = setInterval(scroll.left,5000);
							},15000)*/
							if (animationEnabled) {
								animationEnabled = false;
								scroll[dir](true);
							}
							e.preventDefault();
						};
					},
					init: function () {
						var _current = $list.find("li.current").index();
						for (var i = 0; i < _current; i++) {
							scroll.left(false);
						}
					}
				};

				$(function () {
					width = Math.min(idealWidth, $list.outerWidth());
					$items.css("width", width);
					$list.css("width", $items.length * width);
					$left.click(scroll.click('right'));
					$right.click(scroll.click('left'));
					scroll.init();
				});

			});
		},
		initIcbViewer: function () {
			if (typeof com.nature.Icb !== 'undefined') {
				var icb;
				var datapacks = com.nature.Configuration.get("icb");
				$.each(datapacks, function (key, val) {
					var icb = new com.nature.Icb(key, val);
					icb.init();
				});
			}
		},
		initDownloading: function () {
			var pm = this.PageManager,
				$tbl = $('#toggle-download-links'),
				$theText = $("h1.article-heading"),
				theString = "",
				titleText,
				articleTitle,
				popup,
				$tmpDlLink = $('#download-pdf'),
				$tmpDlContainer = $('#pdf-options');
			//trim unneccesary html
			$theText.find(":not(sup,sub,b,i,span.scp)").replaceWith(function () {
				return this.innerHTML;
			});
			titleText = $theText.html();

			// insert article title in popup and trim if over 125 charachters
			if (titleText && titleText.length) {
				if (titleText.length >= 125) {
					articleTitle = theString.concat(titleText.substring(0, 125), "...");
				} else {
					articleTitle = titleText;
				}
			}

			$('#download-links').prepend('<p>' + articleTitle + '</p>');

			if ($tbl.length) {
				popup = new com.nature.Popup($tbl.linkify().find('a'), $('#download-links').addClass('download-modal'), {
					hasArrow: false,
					position: 'modal',
					hasMask: true
				});
				popup.title('');
				popup = $.extend(popup, new com.nature.Broadcaster());
				popup.init();
				popup.subscribe('open', pm.trackDownloadPopup, pm);

				// now JS is fully loaded, remove the temporary dl links
				$tmpDlContainer.removeClass('hidden');
				$tmpDlLink.remove();
			}
		},
		initVideoDesc: function () {
			$('.in-page-video', '#content').each(function (i) {
				var inPageVid = $(this);
				var vidWidth = inPageVid.find('.video-player').css('width');
				inPageVid.find('.video-information').css("max-width", vidWidth);
			});
		},
		initAudio: function () {
			var $audioPlayer = $('#extranav .audio-link');
			var pm = this.PageManager;
			if ($audioPlayer.length > 0) {
				var audioId = $audioPlayer.attr('id');
				var videoID = $audioPlayer.attr('href');

				/*
					Unfortunately there is a bug with this player, the onPlay event initially fires twice.
					See http://www.longtailvideo.com/support/forums/jw-player/javascript-interaction/20139/events-firing-twice/
					I (LP) have added a workaround. We can remove it if we upgrade the player.

					ALSO, we only want to track play & pause once per impression, hence the hacky counter thing!
				*/

				window.jwplayer(audioId).setup({
					file: videoID,
					skin: "/view/scripts/jwplayer/audioSkinBlue/audioSkinBlue.xml",
					width: 280,
					height: 29,
					events: {
						'onReady': function (event) {
							this.startState = this.getState();
							this.trackedPlay = 0;
							this.trackedPause = 0;
						},
						'onPlay': function (event) {
							if ((this.startState === "IDLE" || this.startState === "PAUSED") && this.trackedPlay === 0) {
								this.startState = this.getState();
								pm.trackAudioPlayer('play', videoID);
								this.trackedPlay = 1;
							}
						},
						'onPause': function (event) {
							if (this.trackedPause === 0) {
								pm.trackAudioPlayer('pause', videoID, this.getPosition());
								this.trackedPause = 1;
							}
						}
					},
					dock: 'false',
					icons: 'false',
					controlbar: 'bottom',
					wmode: 'transparent',
					bgcolor: '#ECECEC',
					modes: [
						{type: 'html5'},
						{type: 'flash', src: '/view/scripts/jwplayer/player.swf'},
						{type: 'download'}
					]
				});
			}
		},
		initCopyLink: function () {
			var pm = this.PageManager;
			var $tbl = $('#toggle-getvideo-link');
			if ($tbl.length) {
				var popup = new com.nature.Popup($tbl.linkify().find('a'), $('#get-video-link').addClass('bookmarking-popup'), {
					hasArrow: false,
					position: 'below'
				});
				popup.title('Get link to video');
				popup = $.extend(popup, new com.nature.Broadcaster());
				popup.init();
			}
		},
		initRelatedVideoThumb: function () {
			var $generator = new com.nature.ThumbGenerator(),
				maxWidth = 179,
				maxHeight = 120,
				expectedAspect = maxWidth / maxHeight,
				listItems = $("ul#related-videos li"),
				numLoaded = 0,
				padding = 0,
				html = '',
				calculateLength = true;

			listItems.each(function (idx, li) {
				var videoNum = $(li),
					brightcoveId = videoNum.data('video'),
					//callback function. name suppled to requestThumb instance
					generateThumb = function (imageUrl, pageWidth, pageHeight, padding, len) {
						// add items to page
						$('a .thumbnail', li).append('<img src="' + imageUrl + '" style="padding:' + padding + '; width:' + pageWidth + 'px; height:' + pageHeight + 'px;" />');
						if (len !== '' && len !== 'undefined') {
							if (len.match(/:$/)) {
								len = len + '00';
							}
						}
						html = '<h4>' + len + '</h4>';
						if (videoNum.hasClass('selected')) {
							html += '<h6>Now Playing</h6>';
						}
						$('a', li).append(html);
					};
				// request thumbnail with thumb module.
				$generator.requestThumb(brightcoveId, brightcove.settings.playerToken, maxWidth, maxHeight, padding, calculateLength, generateThumb);

				numLoaded++;
				// once all thumbnails and data loaded, create equal height boxes
				if (listItems.length === numLoaded) {
					var $cte = $('.equal-height');
					$cte.each(function () {
						var currentTallest = 0;
						$cte.children().each(function (i) {
							if ($('a', this).height() > currentTallest) { currentTallest = $('a', this).height(); }
						});
						// for ie6, set height since min-height isn't supported
						if ($.browser.msie && $.browser.version === 6.0) { $cte.children().find('a').css({'height': currentTallest}); }
						$cte.children().find('a').css({'min-height': currentTallest});
					});
				}
			});
		},
		initTooltips: function () {
			var $tiplinks = $('[data-tooltip], .figure-browser img.carousel-item'),

				$body = $('body'),
				showTip = function () {
					var $el = $(this),
						tipText,
						elOffsetLeft = $el.offset().left,
						elOffsetHeight = $el.offset().top + $el.height();
					if ($el.hasClass('compound')) {
						var figCaption = $el.parents('li').find('span.legend .compound-label').text() + ': ' + $el.parents('li').find('span.legend .compound-name').html();
						tipText = (figCaption && figCaption !== "") ? figCaption : $el.attr('alt');
					} else if ($el.hasClass('carousel-item') && $el.hasClass('vid')) {
						var figCaption = $el.parents('li').find('span.legend').text().substr(0, $el.parents('li').find('span.legend').text().indexOf('('));
						tipText = $.trim(figCaption);
					} else if ($el.hasClass('carousel-item') && $el.hasClass('entity-item') === false) {
						var figCaption = $el.parents('li').find('span.legend').html();
						tipText = $.trim(figCaption);
					} else {
						tipText = ($el.attr("data-tooltip") !== undefined && $el.attr("data-tooltip") !== "") ? $el.attr("data-tooltip") : $el.text();
					}
					if (tipText !== "" && tipText) {
						if ($body.children('.tooltip').length === 0) {
							$body.append("<span class='tooltip' style='left:" + elOffsetLeft + "px;top:" + elOffsetHeight + "px;'>" + tipText + "</span>");
						}
					}
				},
				hideTip = function () {
					var $tip = $('.tooltip', $body);
					if ($tip.length !== 0) {
						$tip.remove();
					}
				};
			$tiplinks.hover(showTip, hideTip);
		},
		initMOPcontainer: function () {
			var thct = $('.subscribe-prompt .subscribe-cta li');
			var currentTallest = 0;
			$(thct).each(function () {
				if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
			});

			$(thct).each(function () {
				if ($(this).children('div.readcube-purchase').length > 0 && $('body.small-screen').length !== 0) {
					// Also hide for mobile devices, as per requirements
					$(this).hide();
				}
				else {
					// for ie6, set height since min-height isn't supported
					if ($.browser.msie && $.browser.version === 6.0) {
						$(thct).css({'height': currentTallest + 45});
					}
					else {
						$(this).css({'min-height': currentTallest + 45});
						$(this).find('a').addClass('aligned');
					}
				}
			});
		},
		initCollapsed: function () { // sections that should start up collapsed
			$('.section.collapse').removeClass('expanded').addClass('collapsed');
		},
		initBrightcoveSettings: function () {
			var brightcoveSettings = {
				playerId: com.nature.Configuration.get('brightcovePlayerId'),
				playerKey: com.nature.Configuration.get('brightcovePlayerKey'),
				playerToken: com.nature.Configuration.get('brightcovePlayerToken')
			};
			if (brightcove) {
				brightcove.settings = brightcoveSettings;
				// removing as part of COPS-388 was added in AIP-1576 not sure its needed
				// $('object.BrightcoveExperience, embed.BrightcoveExperience').removeClass('hidden');
			}
		},
		initReadCube: function () {
			var tag = '<script src="http://content.readcube.com/assets/readcube_purchase.js" type="text/javascript"></script>';
			// All the other article-specific JSs go at the end of the body, so this one will too...
			$('body').append(tag);
		},
		initSequences: function () {
			// See AIP-817. This forces long sequences to break so that they flow in paras nicely.
			var $seqs = $('.sequence');
			$seqs.each(function () {
				$(this).text(($(this).text().replace(/(.{1})/g, "$1\u200b")));
			});
		}
	};

	/* subsection expand/collapse */
	$('.sub-section-heading').linkify();

	$('.sub-section-heading').parent().addClass('collapsed');
	$('.sub-section-heading a').addClass('sub-title');

	$(".sub-section-heading a").click(function () {
		if ($(this).parent().parent().hasClass('collapsed')) {
			$(this).parent().parent().removeClass('collapsed');
			$(this).parent().parent().addClass('expanded');
			return false;

		}
		if ($(this).parent().parent().hasClass('expanded')) {
			$(this).parent().parent().removeClass('expanded');
			$(this).parent().parent().addClass('collapsed');
			return false;

		}
	});
	return ArticleSetup;

}(jQuery));

com.nature.ThumbGenerator = (function ($) {

	var ThumbGenerator = function () {

		/*
		Method to request video thumbnail images from Brightcove.
		*
		* @param brightcoveId
		*	brightcove Id for the video of which you are requesting a thumbnail
		*
		* @param lengthRequired
		* boolean, set true if you want to calculate length of video
		*
		* @param callback
		* The last parameter should be the name of the callback function to run once the image has been loaded.
		*/
		this.requestThumb = function (brightcoveId, playerToken, maxWidth, maxHeight, padding, lengthRequired, callback) {
			var maxWidth = maxWidth,
				maxHeight = maxHeight,
				expectedAspect = maxWidth / maxHeight,
				mathFloor = Math.floor,
				thumbUrl = "http://api.brightcove.com/services/library?command=find_video_by_id&video_id=" + brightcoveId + "&video_fields=thumbnailURL,length&token=" + playerToken + "&callback=?";
			$.getJSON(thumbUrl, function (data) {
				var trashImg = new Image(),
				pageWidth,
				pageHeight,
				padding,
				len;
				trashImg.onload = function () {
					var imgAspect = trashImg.width / trashImg.height;
					if (imgAspect >= expectedAspect) {
						pageWidth = maxWidth;
						pageHeight = mathFloor(maxWidth / imgAspect);
						padding = mathFloor((maxHeight - (maxWidth / imgAspect)) / 2);
						padding = padding + "px 0";
					} else {
						pageHeight = maxHeight;
						pageWidth = mathFloor(maxHeight * imgAspect);
						padding = mathFloor((maxWidth - (maxHeight * imgAspect)) / 2);
						padding = "0 " + padding + "px";
					}
					// calculate the length of the video
					if (lengthRequired) {
						var d,
							h,
							m,
							s;
						len = "";
						s = mathFloor(data.length / 1000);
						m = mathFloor(s / 60);
						s = s % 60;
						h = mathFloor(m / 60);
						m = m % 60;
						d = mathFloor(h / 24);
						h = h % 24;
						if (d !== 0) {len += d + "d"; }
						if (h !== 0) {len += h + ":"; }
						if (m !== 0) {len += m + ":"; }
						if (s !== 0 && s < 10) { len += "0" + s; } else if (s !== 0) { len += s; }
						if (d === 0 && h === 0 && m === 0) {len += "s"; }
					}
					return callback(trashImg.src, pageWidth, pageHeight, padding, len);
				};
				trashImg.src = data.thumbnailURL;
			});
		};
	};
	return ThumbGenerator;

}(jQuery));
