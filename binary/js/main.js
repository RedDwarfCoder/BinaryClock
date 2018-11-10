$(document).ready(function() {
	startTime();
});

function startTime() {
	var onColorHour = '#ff0000';
	var onColorMinute = '#00ff00';
	var onColorSecond = '#0000ff';
	var offColor = '#123456';
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();

	// Change time to binary
	var binS = s.toString(2);
	var binM = m.toString(2);
	var binH = h.toString(2);

	/* Loop through each of the time types:
	*  Hours, Minutes, and Seconds
	*/
	for (var i = 3 - 1; i >= 0; i--) {
		//Set Default variables
		var whichBin = binS;
		var timeType = 'S';
		var onColor = onColorSecond;

		// Change variables if needed
		if (i === 2){
			whichBin = binM;
			timeType = 'M';
			onColor = onColorMinute;
		}

		if (i === 1){
			whichBin = binH;
			timeType = 'H';
			onColor = onColorHour;
		}

		/* Loop through each of the 6 possible
		*  spots to 'light up'
		*/
		for (var j = 6 - 1; j >= 0; j--) {
			var denom = Math.pow(10,j);
			var adjBin = whichBin/denom;
			var jPlus1 = j + 1;
			var target = '.' + timeType + jPlus1;

			/* Check if the adjusted Binary number ends in a zero or one
			*  Set the background color accordinly (onColor or offColor)
			*/
			if (parseInt(adjBin)%2 !== 0) {
				$(target).css('background-color', onColor);
			} else {
				$(target).css('background-color', offColor);
			}
		}
	}

	updatePopUpTime(h, m, s);

	// Do every 1/2 second
	var t = setTimeout(startTime, 500);
}

function formatTime(whichTime) {
	if (whichTime < 10) {
		whichTime = '0' + whichTime;
	}

	return whichTime;
}

function updatePopUpTime(hour, minute, second) {
	hour = formatTime(hour);
	minute = formatTime(minute);
	second = formatTime(second);


	$('#popUpTime').text('The time is ' + hour + ':' + minute + ':' + second);

	$('.container').hover(function() {
		$('#popUpTime').show();
	}, function () {
		$('#popUpTime').hide();
	})
}
