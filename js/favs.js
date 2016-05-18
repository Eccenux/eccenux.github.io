/**
 * Marking favorites
 */
(function (){
	var markers = {
		empty:'☆',
		whole:'★'
	};
	var ratingMax = 3;

	var ratingsKey = 'is2016ratings';
	
	var ratings = {
		ids : {}
	};

	function saveRating(id, rating) {
		ratings.ids[id] = rating;
		console.log(id, rating);
		localforage.setItem(ratingsKey, ratings);
	}
	function readRating(id) {
		return (id in ratings.ids) ? ratings.ids[id] : 0;
	}

	function initRatings(callback) {
		localforage.getItem(ratingsKey).then(function(value) {
			if (value === null) {
				console.log('No ratings stored yet');
			} else {
				console.log('Ratings restored');
				ratings = value;
			}
			callback();
		}).catch(function(err) {
			console.error('Problem reading ratings storage!', err);
			callback();
		});
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
		stars.setAttribute('data-id', id);
		var rating = readRating(id);
		stars.innerHTML = prepareRatingHtml(rating);
		container.addEventListener("click", function(e) {
			var star = e.target;
			var rating = star.getAttribute('data-r');
			// target was not a star - reset
			if (rating === null) {
				rating = 0;
			}
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
	initRatings(function() {
		prepare();
	});
	// export / import
	var exportImport = new ExportTools(ratingsKey, function(importedRatings){
		ratings = importedRatings;
		var items = document.querySelectorAll('.item.fancybox-ajax .rating');
		for (var i = 0; i < items.length; i++) {
			var stars = items[i];
			var id = stars.getAttribute('data-id');
			var rating = readRating(id);
			stars.innerHTML = prepareRatingHtml(rating);
		}
	});
	exportImport.init();
})();

