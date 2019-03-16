function displayData(matchList) {
//for each match make a div, add text needed, then add to root div
  var titleDiv = $("<div id= 'title'></div>");
  titleDiv.text("OWL Schedule");
  $("#root").append(titleDiv);

  var currStage;
  var currDate;
  matchList.forEach(function(match) {
    console.log(match);
    var stageDiv = $("<div class = 'stage'></div>");
    stageDiv.text(match.stage);
    if (currStage != match.stage){
      $("#root").append(stageDiv);
    }
    currStage = match.stage;

    var dateDiv = $("<div class = 'date'></div>");
    dateDiv.text(match.startDate);
    if (currDate!=match.startDate){
      $("#root").append(dateDiv);
    }
    currDate = match.startDate;

    var timeDiv = $("<div class = 'time'></div>");
    timeDiv.text(match.startTime);
    $("#root").append(timeDiv);

    var matchDiv = $("<div class = 'match'></div>");

    createTeamDiv(match.competitor1, matchDiv, 1);

    if (match.competitor1 != null) {
      var scoreDiv = $("<div class = 'score'></div>");
      scoreDiv.text(match.competitor1.score + ' - ' + match.competitor2.score);
      matchDiv.append(scoreDiv);
    }

    createTeamDiv(match.competitor2, matchDiv, 2);
    $("#root").append(matchDiv);
  });
}

function createTeamDiv(team, container, side) {
  var name;
  var logo;
  if (team != null) {
    name = team.name;
    logo = team.logo;
  }
  else {
    name = "TBD";
    logo = "";
  }
  //create div with class team
  var teamDiv = $("<div class ='team'></div>");
  //create name div with name text
  var nameDiv = $("<div class = 'name'></div>");
  nameDiv.text(name);
  //create logo div
  var logoDiv = $("<div class = 'logo'></div>");
  var imgElement = $("<img src= " + logo + " >");
  logoDiv.append(imgElement);
  //append to container div
  if (side == 1) {
     teamDiv.append(nameDiv);
     teamDiv.append(logoDiv);
  }
  else {
    teamDiv.append(logoDiv);
    teamDiv.append(nameDiv);
  }
  container.append(teamDiv);

}
