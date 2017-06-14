// ==UserScript==
// @id             opr-plugin-keyboard@winabaseta
// @name           OPR plugin: Keyboard Action
// @category       Usability
// @author         WinaBaseta, Nux
// @version        0.2.1
// @match          https://opr.ingress.com/recon
// @require        https://code.jquery.com/jquery-latest.js
// @grant          none
// ==/UserScript==

(function() {

	// indeks "bieżącej" grupy gwiazdek (focus)
	var currentSelectable = 0;
	// liczba grup gwiazdek
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
			// modalne końcowe
			if ($('a.button[href="/recon"]').is(':visible')) {
				document.location.href='/recon';
				event.preventDefault();
			// modalne
			} else if ($('.modal-body').is(':visible') && $('.modal-body [ng-click*=confirm]').length == 1) {
				$('.modal-body [ng-click*=confirm]').click();
				currentSelectable = 0;
				event.preventDefault();
			// podgląd duplikatu
			} else if ($('[onclick*=markDuplicate]').length == 1) {
				$('[onclick*=markDuplicate]').click();
				currentSelectable = 0;
				event.preventDefault();
			// submit całości gdy wszystkie ocenione
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
		//
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

	/**
		Zaznaczenie "bieżącej" grupy gwiazdek.
	*/
	function highlight() {
		$('.btn-group').css('border', 'none');
		if(currentSelectable < maxItems) {
			$($('.btn-group')[currentSelectable]).css('border', '1px solid #f00');
		}
	}
	highlight();
})();
