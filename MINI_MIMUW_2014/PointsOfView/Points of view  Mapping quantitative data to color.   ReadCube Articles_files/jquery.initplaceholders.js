(function ($) {
	$.fn.initPlaceholders = function () {
		var init, clear, $inputs;
	
		replaceLabel = function () {
			var $el, id;
			$el = $(this);
			id = $el.attr('id');
			$el.closest('form').find('label[for="' + id + '"].placeholder-replaces').addClass('placeholder-replaced');
		};
		$inputs = this.find('input[placeholder]');
		$inputs.each(replaceLabel);
		if ('placeholder' in document.createElement('input')) {
			return this;
		}
		
		init = function ($el) {
			if (!$el.val().replace(/[\s]+/, '').length) {
				$el.val($el.attr('placeholder'));
				$el.addClass('placeholder');
			}
		};
		clear = function ($el) {
			if ($el.val() == $el.attr('placeholder')) {
				$el.val('');
				$el.removeClass('placeholder');
			}
		};
		$inputs.focus(function () {
			clear($(this));
		}).blur(function () {
			init($(this));
		}).each(function () {
			init($(this));
		});
		this.submit(function () {
			$inputs.each(function () {
				clear($(this));
			});
			setTimeout(function () {
				$inputs.each(function () {
					init($(this));
				});
			}, 100);
		});
		return this;
	};
})(jQuery);