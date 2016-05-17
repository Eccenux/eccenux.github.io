/**
 * Marking favorites
 */
(function (){
	var markers = {
		empty:'☆',
		whole:'★'
	};
	var ratingMax = 3;

	function prepare() {
		// talks
		var items = document.querySelectorAll('.item.fancybox-ajax');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.getAttribute('data-url-hash')) {
				var container = item.querySelector('.i-time');
				if (container) {
					var stars = document.createElement('span');
					stars.className = 'rating';
					var html = '';
					for (var r = 1; r <= ratingMax; r++) {
						html += '<span>'+markers.empty+'</span>';
					}
					stars.innerHTML = html;
					container.appendChild(stars);
				}
			}
		}
	}

	// assuming content is ready
	prepare();
})();

