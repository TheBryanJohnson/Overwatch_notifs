
// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.overwatchleague.com/schedule', true);

request.onload = function () {
  var matchList = [];
  // Begin accessing JSON data here
  var jsonResponse = JSON.parse(this.response);

  jsonResponse.data.stages.forEach(stage => {
    //put each match into an object
    var stageNum = stage.name;
    stage.matches.forEach(match => {
      var competitor1 = {
          id: match.competitors[0].id,
          name: match.competitors[0].name,
          logo: match.competitors[0].logo ,
          primaryColor: match.competitors[0].primaryColor,
          secondaryColor: match.competitors[0].secondaryColor,
          score: match.scores[0].value
      }
      var competitor2 = {
        id: match.competitors[1].id,
        name: match.competitors[1].name,
        logo: match.competitors[1].logo ,
        primaryColor: match.competitors[1].primaryColor,
        secondaryColor: match.competitors[1].secondaryColor,
        score: match.scores[1].value
      }
      var game = {
        competitor1: competitor1,
        competitor2: competitor2,
        startDate: timeConverterDate(match.startDateTS),
        startTime: timeConverterTime(match.startDateTS),
        winner: match.winner != null ? match.winner.id : null,
        stage: stageNum
      }
      matchList.push(game);
    });
  });
  displayData(matchList);
}

// Send request
request.send();


//function to convert Unix time stamp
//source: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
function timeConverterDate(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  //var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  return month + ' ' + date;
}
function timeConverterTime(UNIX_timestamp){
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
  var min = "0" + a.getMinutes();
  //var sec = a.getSeconds();
  return time = hour + ':' + min.substring(-2) + ' ' + period;
}

function displayData(matchList) {
//for each match make a div, add text needed, then add to root div
  matchList.forEach(match => {
    var div = document.createElement("div");
    var node = document.createTextNode(
       match.stage + " " + match.startDate + " " + match.startTime + " " +
       match.competitor1.name + " vs " + match.competitor2.name + " " +
       match.competitor1.score + " - " + match.competitor2.score
    )
    div.appendChild(node);
    var element = document.getElementById("root");
    element.appendChild(div);
  });
}