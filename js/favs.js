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
		if (rating === null) {
			rating = 0;
		}
		ratings.ids[id] = rating;
		console.log(id, rating);
	}
	function readRating(id) {
		return (id in ratings.ids) ? ratings.ids[id] : 0;
	}

	function prepareRatingHtml(rating) {
		var html = '';
		for (var r = 1; r <= ratingMax; r++) {
			var marker = (r <= rating) ? markers.whole : markers.empty;
			html += '<span data-r="'+r+'" class="clickable">'+marker+'</span>';
		}
		return html;
	}

	function prepareStars(container, stars, id) {
		stars.className = 'rating';
		var rating = readRating(id);
		stars.innerHTML = prepareRatingHtml(rating);
		container.addEventListener("click", function(e) {
			var star = e.target;
			var rating = star.getAttribute('data-r');
			saveRating(id, rating);
			stars.innerHTML = prepareRatingHtml(rating);
		});
		container.appendChild(stars);
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
					prepareStars(container, stars, id);
				}
			}
		}
	}

	// assuming content is ready
	prepare();
})();

