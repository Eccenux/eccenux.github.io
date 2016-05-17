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
	function prepare() {
		var items = document.querySelectorAll('.item.fancybox-ajax');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.getAttribute('data-href')) {
				var title = item.querySelector('.i-title');
				if (title) {
					title.classList.add('clickable');
					title.setAttribute('data-href', item.getAttribute('data-href'));
					title.addEventListener('click', function () {
						openDetailsUrl(this.getAttribute('data-href'));
					});
				}
			}
		}
	}
	// assuming content is ready
	prepare();
})();
