window.onload = function() {
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
          if (match.competitors[0] != null) {
            var competitor1 = {
              id: match.competitors[0].id,
              name: match.competitors[0].name,
              logo: match.competitors[0].logo ,
              primaryColor: match.competitors[0].primaryColor,
              secondaryColor: match.competitors[0].secondaryColor,
              score: match.scores[0].value
            }
          }
          if (match.competitors[1] != null) {
            var competitor2 = {
              id: match.competitors[1].id,
              name: match.competitors[1].name,
              logo: match.competitors[1].logo ,
              primaryColor: match.competitors[1].primaryColor,
              secondaryColor: match.competitors[1].secondaryColor,
              score: match.scores[1].value
            }
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
}
