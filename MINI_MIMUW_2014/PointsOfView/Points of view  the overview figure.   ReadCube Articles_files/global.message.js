var com = com || {};
com.nature = com.nature || {};

(function ($) {

	com.nature.AlertMessage = {

		init: function (ev) {
			$(".message-contain .visible .persistent").text("Minimise this message").addClass("arrow");
			$(".message-contain .minimised .persistent").html("Find out more<span class='hidden'> about this message</span>").addClass("arrow");
		},

		hideMessage: function (ev, message) {
			var $msgContainer = $($(message).parents('.message-contain')[0]);
			var scope = $msgContainer.children(0).hasClass('global') ? 'global' : 'local';

			$msgContainer.find(".global-message-content").slideUp('slow', function () {
				$msgContainer.find("." + scope).removeClass("visible").addClass("minimised");
			});

			$msgContainer.find(".global-message-control a.persistent").html("Find out more<span class='hidden'> about this message</span>");
		},

		showMessage: function (ev, message) {
			var $msgContainer = $($(message).parents('.message-contain')[0]);
			var scope = $msgContainer.children(0).hasClass('global') ? 'global' : 'local';

			$msgContainer.find(".global-message-content").slideDown('slow', function () {
				$msgContainer.find("." + scope).removeClass("minimised").addClass("visible");
			});
			$msgContainer.find(".global-message-control a.persistent").text("Minimise this message");
		}

	};

	$(document).ready(function () {
		var am = com.nature.AlertMessage;
		am.init();

		$(".message-contain .persistent").toggle(function (ev, el) {
				am.showMessage(ev, this);
				return false;
			},
			function (ev, el) {
				am.hideMessage(ev, this);
				return false;
			}
		);
		
		$(".message-contain a.remove").click(function () {
			var scope = $(this).parents('.message-contain').children(0).hasClass('global') ? 'global' : 'local';
			com.nature.Cookie.set('message-' + scope, 'remove', 30, '/');
			$(this).parents('.message-contain').slideUp();
			return false;
		});

	});

}(jQuery));
