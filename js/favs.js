/**
 * Marking favorites
 */
(function (){
	var markers = {
		empty:'☆',
		whole:'★'
	};
	var ratingMax = 3;
	
	var ratings = {
		ids : {}
	};

	function saveRating(id, rating) {
		ratings.ids[id] = rating;
		console.log(id, rating);
	}

	function prepare() {
		// talks
		var items = document.querySelectorAll('.item.fancybox-ajax');
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.getAttribute('data-url-hash')) {
				var id = item.getAttribute('data-url-hash');
				var container = item.querySelector('.i-time');
				if (container) {
					var stars = document.createElement('span');
					stars.setAttribute('data-id', id);
					stars.className = 'rating';
					var html = '';
					for (var r = 1; r <= ratingMax; r++) {
						html += '<span data-r="'+r+'" class="clickable">'+markers.empty+'</span>';
					}
					stars.innerHTML = html;
					stars.addEventListener("click", function(e) {
						if(e.target && e.target.nodeName == "SPAN") {
							var star = e.target;
							var id = this.getAttribute('data-id');
							saveRating(id, star.getAttribute('data-r'));
						}
					});
					container.appendChild(stars);
				}
			}
		}
	}

	// assuming content is ready
	prepare();
})();

