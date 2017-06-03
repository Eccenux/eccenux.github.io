// ==UserScript==
// @id             opr-plugin-keyboard@winabaseta
// @name           OPR plugin: Keyboard Action
// @category       Usability
// @author         WinaBaseta, Nux
// @version        0.2.0
// @match          https://opr.ingress.com/recon
// @require        https://code.jquery.com/jquery-latest.js
// @grant          none
// ==/UserScript==

(function() {

	var currentSelectable = 0;
	var maxItems = 6;

	$(document).keydown(function(event) {
		if(event.keyCode >= 49 && event.keyCode <= 53)
			numkey = event.keyCode - 48;
		else if(event.keyCode >= 97 && event.keyCode <= 101)
			numkey = event.keyCode - 96;
		else
			numkey = null;
		
		// enter
		if(event.keyCode == 13) {
			if ($('a.button[href="/recon"]').is(':visible')) {
				document.location.href='/recon';
				event.preventDefault();
			// modalne
			} else if ($('.modal-body').is(':visible') && $('.modal-body [ng-click*=confirm]').length == 1) {
				$('.modal-body [ng-click*=confirm]').click();
				currentSelectable = 0;
				event.preventDefault();
			} else if(currentSelectable == maxItems) {
				$('[ng-click="answerCtrl.submitForm()"]').click();
				event.preventDefault();
			}
		// esc
		} else if(event.keyCode == 27 || event.keyCode == 111) {
			// modalne
			if ($('.modal-body').is(':visible') && $('.modal-body [ng-click*=reset]').length == 1) {
				$('.modal-body [ng-click*=reset]').click();
				currentSelectable = 0;
				event.preventDefault();
			} else {
				currentSelectable = 0;
				$('html, body').animate({scrollTop: '0px'}, 300);
			}
		} else if((event.keyCode == 107 || event.keyCode == 9) && currentSelectable < maxItems) {
			currentSelectable++;
			event.preventDefault();
		} else if((event.keyCode == 109 || event.keyCode == 16 || event.keyCode == 8) && currentSelectable > 0) {
			currentSelectable--;
			event.preventDefault();
		} else if(numkey === null || currentSelectable >= maxItems) {
			return;
		} else {
			$($('.btn-group')[currentSelectable]).children('button.button-star')[numkey-1].click();
			currentSelectable++;
		}
		highlight();
	});

	function highlight() {
		$('.btn-group').css('border', 'none');
		if(currentSelectable < maxItems) {
			$($('.btn-group')[currentSelectable]).css('border', '1px solid #f00');
		}
	}

	function loglatlngnick() {
		/*
		[lat, lng] = $('[ng-bind="subCtrl.pageData.streetAddress"]').parent().attr('href').replace(/.*q=@/, '').split(',');
		nickname = $('span.player_nickname').html();

		$.ajax({
			url: 'https://iitc.baseciq.org/oprkeyboardlog.php?lat=' + lat + '&lng=' + lng + '&nickname=' + nickname,
			method: 'GET'
		});
		*/
	}
	
	/*
	$(document).ready(function() {
		$('[ng-bind="subCtrl.pageData.streetAddress"]').bind("DOMSubtreeModified",function(){
			loglatlngnick();
		});
		if($('[ng-bind="subCtrl.pageData.streetAddress"]').html() != '{{subCtrl.pageData.streetAddress}}') {
			loglatlngnick();
		}
	});
	*/

	highlight();
})();
