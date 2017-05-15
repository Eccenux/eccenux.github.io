var timelines = {
	dateStart : [
		new Date('2017-05-17T09:45:00'),
		new Date('2017-05-18T09:30:00'),
	],
	/**
		Get `now` index in `dateStart` array.
	*/
	getDayIndex: function(now) {
		var notInRange = true;
		var startDate;
		var i;
		for (i = 0; i < this.dateStart.length; i++) {
			if (now > this.dateStart[i]) {
				notInRange = false;
			}
			else {
				break;
			}
			//console.log(i, notInRange)
		}
		console.log('final: ', i, notInRange)
		if (notInRange) {
			return -1;
		}
		return i - 1;
	},
	/**
		Go to current time.
		
		Testing:
		timelines.goToNow(new Date('2017-05-17T10:00:00'))
		timelines.goToNow(new Date('2017-05-17T11:55:00'))
	*/
	goToNow: function(now) {
		if (!(now instanceof Date)) {
			now = new Date();
		}
		var dayIndex = this.getDayIndex(now);
		// not started yet -- scroll top
		if (dayIndex < 0) {
			scrollTo(0,0);
			$('.i-timeline-hour-in.active').removeClass('active');
			return;
		}
		// found day
		// locate appropraite 5-minute line in timeline
		var $dayTimeline = $('.i-timeline-hour')[dayIndex];
		var dayStart = this.dateStart[dayIndex];
		var $lines = $('.i-timeline-hour-in', $dayTimeline);
		var deltaT = (now - dayStart) / 1000 / 60;	// in [min]
		var lineIndex = Math.floor(deltaT / 5);
		var nowLine = $lines[lineIndex]
		nowLine.scrollIntoView();
		window.nowLine = nowLine;
		nowLine.classList.add('active');
	},
}