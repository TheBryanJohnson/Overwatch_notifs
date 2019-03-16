function timeConverterDate(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  	var month = months[a.getMonth()];
  	var date = a.getDate();
	return month + ' ' + date;
}

function timeConverterTime(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp);
  	var period;
  	var hour = a.getHours();

 	if (hour > 12) {
    	hour -= 12;
    	period = "PM";
  	}
  	else {
    	period = "AM";
  	}
	hour = hour == 0 ? 12 : hour;

  	var min = "0" + a.getMinutes();
  	return time = hour + ':' + min.substring(min.length - 2) + ' ' + period;
}
