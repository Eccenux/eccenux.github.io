/**
 * Show details for events
 *
 * Supported browsers
 * <li>.classList: IE 10+, Android 3.0+
 *
 * @param {String} url URL for details.
 */
function openDetailsUrl(url) {
	window.open(url, '_blank');
}

(function (){
	function addClick(item, title) {
		if (title) {
			title.classList.add('clickable');
			title.setAttribute('data-href', item.getAttribute('data-href'));
			title.addEventListener('click', function () {
				openDetailsUrl(this.getAttribute('data-href'));
			});
		}
	}
	function prepare() {
		// talks
		var items = document.querySelectorAll('.item.fancybox-ajax');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.getAttribute('data-href')) {
				var title = item.querySelector('.i-title');
				addClick(item, title);
			}
		}
		// other events
		var items = document.querySelectorAll('.i-type-sponsor');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.getAttribute('data-href')) {
				var title = item.querySelector('strong');
				addClick(item, title);
			}
		}
	}
	// assuming content is ready
	prepare();
})();
