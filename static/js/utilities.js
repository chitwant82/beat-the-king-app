function buttonLogic(currentSelectValue, buttonDivElement, buttonElement, buttonId, buttonText) {
	if(currentSelectValue === "player1") {
		buttonElement.remove();
		if(buttonId === 'btn-1') {
			buttonDivElement.append($('<button type="button" class="btn btn-thumb btn-thumb-active1" id=' + buttonId + '><img src="/static/pictures/lebron.jpg" alt=""> ' + buttonText + '</button>'));
		}
		else {
			buttonDivElement.append($('<button type="button" class="btn btn-thumb btn-thumb-active2" id=' + buttonId + '><img src="/static/pictures/lebron.jpg" alt=""> ' + buttonText + '</button>'));
		}
	}
	else if (currentSelectValue === "player2") {
		buttonElement.remove();
		if(buttonId === 'btn-1') {
			buttonDivElement.append($('<button type="button" class="btn btn-thumb btn-thumb-active1" id=' + buttonId + '><img src="/static/pictures/westbrook.jpg" alt=""> ' + buttonText + '</button>'));
		}
		else {
			buttonDivElement.append($('<button type="button" class="btn btn-thumb btn-thumb-active2" id=' + buttonId + '><img src="/static/pictures/westbrook.jpg" alt=""> ' + buttonText + '</button>'));
		}
	}
	else {
		// if (!currentSelectValue.includes("Select Player")) {
		// if(currentSelectValue !== 'Select Player 1' && currentSelectValue !== 'Select Player 2') {
			buttonElement.remove();
			if(buttonId === 'btn-1') {
				buttonDivElement.append($('<button type="button" class="btn btn-thumb btn-thumb-active1" id=' + buttonId + '><img src="/static/pictures/player1.jpg" alt=""> ' + buttonText + '</button>'));
			}
			else {
				buttonDivElement.append($('<button type="button" class="btn btn-thumb btn-thumb-active2" id=' + buttonId + '><img src="/static/pictures/player2.jpg" alt=""> ' + buttonText + '</button>'));
			}
		// }
	}
}

function generateIconsHtml(winnerName, winnerScore, loserName, loserScore) {
	winnerName = (winnerName === "LeBron James") ? "LeBron \'King\' James" : winnerName;
	$("#icons").empty();
	    $("#icons").append($('<div style="display: flex; justify-content:center; text-align:center;">' + 
	    	'<span class="fa-stack fa-5x"><i class="fa fa-circle fa-stack-2x icon-background4"></i>' +
	    	 '<i class="fa fa-circle-thin fa-stack-2x icon-background6"></i>' + 
	    	 '<span class="fa-stack-1x fa-stack-text file-text" style="font-size: 0.7em;">' + winnerScore + '</span></span></div>' + 
	    	 '<div style="display: flex; justify-content: center; text-align: center;"><a class="btn btn-lg btn-success" href="">' + 
	    	 '<i class="fa fa-trophy fa-1x"></i> ' + winnerName + '</a></div>'));
	    $("#icons").append($('<div style="display: flex; justify-content: center; margin-top:40px;"><span class="fa-stack fa-5x">' +
	    	 '<i class="fa fa-circle fa-stack-2x icon-background8"></i><i class="fa fa-circle-thin fa-stack-2x icon-background7"></i>' +
	    	 '<span class="fa-stack-1x fa-stack-text file-text" style="font-size: 0.7em;">' + loserScore + '</span></span></div>' +
	    	 '<div style="display: flex; justify-content: center;"><a class="btn btn-lg btn-danger" href="">' +
	    	 '<i class="fa fa-times fa-1x"></i> ' + loserName + '</a></div>'));
}


function d3Logic(filename, pl1, pl2) {
	d3.csv(filename, function(row) {
    	return {
    		name: row["PNAME"],
    		'Games Played': +row["GP"],
        Wins: +row["W"],
        Points: +row["PTS"],
        'Field Goal%': +row["FG%"],
        'Three Point%': +row["3P%"],
        Rebounds: +row["REB"],
        Assists: +row["AST"],
        Steals: +row["STL"],
        Blocks: +row["BLK"]
    	}
    }, function(error, data) {
    	if (error) throw error;

    	var dbRow1 = data.filter(function (e) {
    		return e.name === pl1;
    	});

    	var dbRow2 = data.filter(function (e) {
    		return e.name === pl2;
    	});

    	data = dbRow1.concat(dbRow2);

    	var categories = Object.keys(data[0]).filter(key => key !== 'name');

    	var margin = {top: 80, right: 80, bottom: 80, left: 80},
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

      var x = d3.scaleBand()
          .rangeRound([margin.left, width + margin.left])
          .padding(0.1);

      var y = d3.scaleLinear().domain([0, 100]).range([height, margin.bottom]);

      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisLeft(y).ticks(10);

      var viewBoxWidth = width + margin.left + margin.right;
      var viewBoxHeight = height + margin.top + margin.bottom;

      d3.select(".svg-container").remove();

      d3.select("div#chartId")
          .append("div")
          .classed("svg-container", true)
          .append("svg")
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0 " + viewBoxWidth + " " + viewBoxHeight + "")
          .classed("svg-content-responsive", true);

      var svg = d3.select("svg");

      svg
        .append("g")
          .attr("class", "graph")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      x.domain(categories);
      y.domain([0, 100]);

      svg
        .append("g")
          .attr("class", "x axis axisBottom")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg
        .append("g")
	        .attr("class", "y axis axisLeft")
	        .attr("transform", "translate(" + margin.left + ",0)")
	        .call(yAxis);

	    svg
	      .append("text")
	        .text("Metrics")
	        .attr("x", width / 2)
	        .attr("y", height + 40)
	        .style("text-anchor", "middle")
	        // .style("fill", "steelblue");

	    svg
	      .append("text")
	        .text("#")
	        .attr("x", margin.top - 15)
	        .attr("y", margin.top - 20)
	        .style("text-anchor", "middle")
	        // .style("fill", "orange");

	    var bars = svg.selectAll(".bar").data(data)

	    for(var counter=0; counter<categories.length; counter++) {
	    	bars
	    	 .enter()
	       .append("rect")
           .attr("x", function(d, i) { 
           	return i === 0 ? x(categories[counter]) : x(categories[counter]) + 30 })
           .attr("width", x.bandwidth() / 2)
	         .attr("fill", function(_,i) { 
	         	return i === 0 ? '#8cd3ff' : '#fac364'
	         })
	       .merge(bars)
           .attr("y", function(d, i) { return y(d[categories[counter]]); })
	         .attr("height", function(d,i,j) { return height - y(d[categories[counter]]); });
	    }

	    var pl1Sum = Math.floor(data[0]['Wins'] + data[0]['Points'] + data[0]['Field Goal%'] + data[0]['Three Point%'] + data[0]['Rebounds'] + data[0]['Assists'] - data[0]['Games Played']);
	    var pl2Sum = Math.floor(data[1]['Wins'] + data[1]['Points'] + data[1]['Field Goal%'] + data[1]['Three Point%'] + data[1]['Rebounds'] + data[1]['Assists'] - data[1]['Games Played'])
	    if(pl1Sum > pl2Sum) generateIconsHtml(data[0]['name'], pl1Sum, data[1]['name'], pl2Sum);
	    else generateIconsHtml(data[1]['name'], pl2Sum, data[0]['name'], pl1Sum);
	    // $("#icons").empty();
	    // $("#icons").append($('<div style="display: flex; justify-content:center; text-align:center;">' + 
	    // 	'<span class="fa-stack fa-5x"><i class="fa fa-circle fa-stack-2x icon-background4"></i>' +
	    // 	 '<i class="fa fa-circle-thin fa-stack-2x icon-background6"></i>' + 
	    // 	 '<span class="fa-stack-1x fa-stack-text file-text" style="font-size: 0.7em;">123</span></span></div>' + 
	    // 	 '<div style="display: flex; justify-content: center; text-align: center;"><a class="btn btn-lg btn-success" href="">' + 
	    // 	 '<i class="fa fa-trophy fa-1x"></i> Russell Westbrook</a></div>'));
	    // $("#icons").append($('<div style="display: flex; justify-content: center; margin-top:40px;"><span class="fa-stack fa-5x">' +
	    // 	 '<i class="fa fa-circle fa-stack-2x icon-background4"></i><i class="fa fa-circle-thin fa-stack-2x icon-background6"></i>' +
	    // 	 '<span class="fa-stack-1x fa-stack-text file-text" style="font-size: 0.7em;">111</span></span></div>' +
	    // 	 '<div style="display: flex; justify-content: center;"><a class="btn btn-lg btn-danger" href="">' +
	    // 	 '<i class="fa fa-times fa-1x"></i> Russell Westbrook</a></div>'));
	  });
}