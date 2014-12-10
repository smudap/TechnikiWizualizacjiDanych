
var com = com || {};
com.nature = com.nature || {};

com.nature.Carousel = (function ($) {

	var Carousel = function (useScrollbar) {
		var $coverflip = $('#flip');
		this.useScrollbar = useScrollbar;
		var _self = this;

		var coverflipConfig = {
			items: '',
			beforeCss: (function () {
				/*
				see afterCss for explanations
				*/
				var containerCenterPointX = $coverflip.width() / 2,
					startStackOffsetX = -142,
					overlapValue = -61,
					offsetLeft = containerCenterPointX + startStackOffsetX,
					numItems = $coverflip.children('li').length;

				return function coverflip_beforeCss(el, container, offset) {
					var numOfStates = this.scaledStates.heights.length - 1,
						height = (offset >= numOfStates) ? this.scaledStates.heights[numOfStates] : this.scaledStates.heights[offset + 1],
						width = (offset >= numOfStates) ? this.scaledStates.widths[numOfStates] : this.scaledStates.widths[offset + 1],
						top = (offset >= numOfStates) ? this.scaledStates.tops[numOfStates] : this.scaledStates.tops[offset + 1],
						left = offsetLeft + (overlapValue * offset) + 'px';

					return [
						$.jcoverflip.animationElement(
							el,
							{
								left: left,
								top: top
							},
							{
								// at beginning reset zindex
								'0': {
									zIndex : 0
								}
							}
						),
							$.jcoverflip.animationElement(
								el.find('img'),
								{
									opacity: 1,
									width: width,
									height: height
								},
								{}
							)
							];
				};
			}()),
			afterCss: (function () {
				/*
				containerCenterPointX = center point of ul.
				startStackOffsetX is the start offset from the centerpointX.
				overlap is used to decide how much to overlap depending on position of element in ul (index)

				a bit kludgy. Would be better if it used the offsetLeft of the ul and took into account of the clipping region to determine centerpoint
				*/
				var containerCenterPointX = $coverflip.width() / 2,
					startStackOffsetX = 20,
					overlapValue = 82,
					offsetLeft = containerCenterPointX + startStackOffsetX,
					numItems = $coverflip.children('li').length;

				return function coverflip_afterCss(el, container, offset) {
					var numOfStates = this.scaledStates.heights.length - 1,
						height = (offset >= numOfStates) ? this.scaledStates.heights[numOfStates] : this.scaledStates.heights[offset + 1],
						width = (offset >= numOfStates) ? this.scaledStates.widths[numOfStates] : this.scaledStates.widths[offset + 1],
						top = (offset >= numOfStates) ? this.scaledStates.tops[numOfStates] : this.scaledStates.tops[offset + 1],
						left = offsetLeft + (overlapValue * offset) + 'px';

					return [
						$.jcoverflip.animationElement(
							el,
							{
								left: left,
								top: top
							},
							{
								// change the z-index value to a descending value, 10% into the animation/
								// percentage chosen here might be best if matching one given in currentCSS (approx)
								'0.1': {
									zIndex : (numItems - 1) - offset
								}
							}
						),
							$.jcoverflip.animationElement(
								el.find('img'),
								{
									opacity: 1,
									width: width,
									height: height
								},
								{}
							)
							];
				};
			}()),
			currentCss: (function () {
				/*
					see afterCss for explanations
				*/
				//var containerCenterPointX = $coverflip.width()/2;

				return function coverflip_currentCss(el, container) {

						var centerPosition = 230, //should be using containerCenterPointX but now using clipping so numbers are off, so hardcode.
							titleElement = $('#carouselItemTitle a'),
							elementLink = $(el).children('a');
						//assign the text and link of item to titleElement
						titleElement.html(elementLink.attr('title').replace(' - ', '<br />'));
						titleElement.attr('href', elementLink.attr('href'));
						return [
							$.jcoverflip.animationElement(el,
								{
									left: (centerPosition) + 'px',
									top: this.scaledStates.tops[0]
								},
								{
									//when 10% into the animation that brings it center (*from previous position (+/- 1)*), set the zIndex to highest
									//% value here would depend on overlap value used/more overlap === more percentage
									'0.1': {
										zIndex: '181'
									}
								}
							),
								$.jcoverflip.animationElement(el.find('img'),
									{
										opacity: 1,
										width: this.scaledStates.widths[0] + 'px',
										height: this.scaledStates.heights[0] + 'px'
									},
									{ }
								)
								];
					};
			}()),
			time: 500, // milliseconds
			titles: {
				/*
				* Creates one para element that is to be reused. Link text is set by currentCss method in config.
				* @param {el} LI element of current item
				*/
				create: function createTitle(el) {
					//create one only. Original created one for each item
					if (!createTitle.titleElement)
					{
						createTitle.titleElement = $('<p id="carouselItemTitle"><a href=""></a></p>');
						createTitle.titleElement.data('jcoverflip__origin', 'attribute');
					}
					//add to wrapper div instead of ul as per original
					$('#wrapper').append(createTitle.titleElement);
					//return a empty $ object so jcoverflip doens't do anything with it.
					return $([]);
				},
				/**
				*
				* @param el - title element
				*/
				destroy: function (el) {
				}
			},
			titleAnimateIn: function (titleElement, time, offset) {
				titleElement.css({
					display: 'block'
				});
			},
			titleAnimateOut: function (titleElement, time, offset) {

			},
			change: function (event, ui) {
				_self.notify('changed', ui);
				if (_self.useScrollbar) {
					jQuery('#scrollbar').slider('value', ui.to * 25);
				}
			},
			controls: {
				/**
				* @param containerElement - the jQuery object for the jcoverflip
				* @param length - the number of items
				*/
				create: function () {},
				/**
				* @param containerElement - the jQuery object for the jcoverflip
				*/
				destroy: function () {}
			},
			current: 2,
			//addtional config
			scaledStates :  /**
							* Calculates the correct scaled dimensions for each state.
							*
							* @param sizes {Array} Array of numbers either in absolute or as percentages of the states. eg 100 (pixel)  or 80% (percentage)
							* First is the scaled state of the current image. The last is the smallest state. If percentages
							* then calculated as a percentage of imgHeight
							* @param imgHeight {Number} Default height of image.
							* @param imgWidth {Number} Default width of image.
							* @param currentStateTop {Number} Top offset of current state
							*/
							(function (dims, imgWidth, imgHeight, currentIndexTop) {
								var isAbsolute = (dims[0].match(/%$/)) ? false : true,
									currentStateTop = currentStateTop || 0,
									states = {
										heights: dims,
										widths: dims,
										tops: []
									};
								//convert to absolute
								if (!isAbsolute) {
									states.heights = [];
									var percent = imgHeight / 100;
									for (var i = 0, len = dims.length; i < len; i++) {
										states.heights.push(parseInt(percent * parseInt(dims[i], 10), 10));
									}
									states.widths = [];
									var percent = imgWidth / 100;
									for (var i = 0, len = dims.length; i < len; i++) {
										states.widths.push(parseInt(percent * parseInt(dims[i], 10), 10));
									}
								}
								// work out top value
								// calculate essentially vertical-align:middle
								// algorithm is :
								// for every item calc difference between current offset height and 2nd biggest height and divide by 2
								// then add the default top
								// eg:
								// 2nd biggest height is 150, current pos(offset) is 1 which is a height of 140
								// 150 - 140 = 10 / 2 = 5
								// default top is 20
								// then top value is then 20 + 5 = 25
								var secondBiggestHeight = states.heights[1];
								// states.tops[0]= currentIndexTop;
								for (var i = 0, len = states.heights.length; i < len; i++)
								{
									states.tops[i] = (currentIndexTop + ((secondBiggestHeight - states.heights[i]) / 2));
								}

								return states;
							}(['100%', '81%', '66%', '56%'], 124, 157, 40))
		};

		this.init = function () {
			// initialise
			var cv_carousel = $coverflip.jcoverflip(coverflipConfig);
			// events
			$("#flip_next").click(function () {
				$coverflip.jcoverflip('next', 1);
			});

			$("#flip_previous").click(function () {
				$coverflip.jcoverflip('previous', 1);
			});

			$(".flip_to").click(function () {
				var _offset = $(this).attr("data-flip");
				if (_offset) {
					$coverflip.jcoverflip(_offset < 0 ? 'previous' : 'next', Math.abs(_offset));
				}
			});


			if (this.useScrollbar) {
				$('#scrollbar').slider({
					value: 50,
					stop: function (event, ui) {
						if (event.originalEvent) {
							var newVal = Math.round(ui.value / 12.5);
							$coverflip.jcoverflip('current', newVal);
							jQuery('#scrollbar').slider('value', newVal * 12.5);
						}
					}
				});
			}
		};
	};

	return Carousel;

}(jQuery));