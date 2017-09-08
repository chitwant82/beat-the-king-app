// $(document).ready(function() {
$(function() {

	var myOptions = {
	    player1 : 'LeBron James',
	    player2 : 'Russell Westbrook',
	    player3 : 'Stephen Curry',
	    player4 : 'Anthony Davis',
	    player5 : 'DeMarcus Cousins',
	    player6 : 'Isiah Thomas',
	    player7 : 'Kawhi Leonard',
	    player8 : 'Jimmy Butler',
	    player9 : 'Paul George',
	    player10 : 'Kyrie Irving'
	};

	var mySelect = $('#d1');
	$.each(myOptions, function(val, text) {
	    mySelect.append(
	        $('<option></option>').val(val).html(text)
	    );
	});

	var mySelect = $('#d2');
	$.each(myOptions, function(val, text) {
	    mySelect.append(
	        $('<option></option>').val(val).html(text)
	    );
	});

	var player1;
	var player2;
	var prevD1;
	$("#d1").mouseup(function() {
  		prevD1 = $(this).val();
   }).change(function () {
    	var cVal = $(this).val();
    	player1 = $("#d1 option[value='" + cVal + "']").text();
    	$("#d2 option[value='" + prevD1 + "']").show();
		  $("#d2 option[value='" + cVal + "']").hide();

		  var bDiv = $('#btn-pla-1');
		  var btElement = $('#btn-1');

		  buttonLogic(cVal, bDiv, btElement, 'btn-1', player1);
  });

  var prevD2;
  $("#d2").mouseup(function() {
  	prevD2 = $(this).val();
  }).change(function () {
  	var cVal = $(this).val();
    player2 = $("#d2 option[value='" + cVal + "']").text();
    $("#d1 option[value='" + prevD2 + "']").show();
		$("#d1 option[value='" + $(this).val() + "']").hide();

		var bDiv = $('#btn-pla-2');
		var btElement = $('#btn-2');

		buttonLogic(cVal, bDiv, btElement, 'btn-2', player2);

    d3.csv('/static/stats.csv', function(row) {
    	return {
    		name: row["PNAME"],
    		GP: +row["GP"],
        W: +row["W"],
        PTS: +row["PTS"],
        'FG%': +row["FG%"],
        '3P%': +row["3P%"],
        REB: +row["REB"],
        AST: +row["AST"],
        STL: +row["STL"],
        BLK: +row["BLK"]
    	}
    }, function(error, data) {
    	if (error) throw error;

    	var dbRow1 = data.filter(function (e) {
    		return e.name === player1;
    	});

    	var dbRow2 = data.filter(function (e) {
    		return e.name === player2;
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
      d3.select("div#chartId")
          .append("div")
          .classed("svg-container", true) //container class to make it responsive
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
	        .style("fill", "steelblue");

	    svg
	      .append("text")
	        .text("#")
	        .attr("x", margin.top - 15)
	        .attr("y", margin.top - 20)
	        .style("text-anchor", "middle")
	        .style("fill", "orange");

	    // bars = svg.selectAll(".bar").data(data).enter();
	    // debugger;

	    // bars
	    //    .append("rect")
     //       .attr("x", function(d, i) {  return i === 0 ? x(categories[0]) : x(categories[0]) + 30 })
     //       .attr("width", x.bandwidth() / 2)
     //       .attr("y", function(d, i) {  return y(d.GP); })
	    //      .attr("height", function(d,i,j) { return height - y(d.GP); })
	    //      .attr("fill", function(_,i) { 
	    //      	return i === 0 ? 'red' : 'green'
	    //      });


	    var bars = svg.selectAll(".bar")
					// .remove()
					// .exit()
					.data(data)

	    // bars = svg.selectAll(".bar").data(data);
	    // bars = svg.selectAll(".bar").data(data, function(d) {
	    // 	// debugger;
	    // 	return d.name;
	    // });
	    // debugger;


	    for(var counter=0; counter<categories.length; counter++) {
	    	bars
	    	 .enter()
	       .append("rect")
           .attr("x", function(d, i) { 
           	return i === 0 ? x(categories[counter]) : x(categories[counter]) + 30 })
           .attr("width", x.bandwidth() / 2)
	         .attr("fill", function(_,i) { 
	         	return i === 0 ? 'red' : 'green'
	         })
	       .merge(bars)
           .attr("y", function(d, i) {  return y(d[categories[counter]]); })
	         .attr("height", function(d,i,j) { return height - y(d[categories[counter]]); });
	    }

	    // bars.exit().remove();

	    // bars
	    // 	 .enter()
	    //    .append("rect")
     //       .attr("x", function(d, i) {  return i === 0 ? x(categories[0]) : x(categories[0]) + 30 })
     //       .attr("width", x.bandwidth() / 2)
	    //      .attr("fill", function(_,i) {
	    //      	return i === 0 ? 'red' : 'green'
	    //      })
	    // .merge(bars)
     //    .attr("y", function(d, i) { return y(d.GP); })
	    //   .attr("height", function(d,i,j) { return height - y(d.GP); });

	    // bars
	    // 	 .enter()
	    //    .append("rect")
     //       .attr("x", function(d, i) {  return i === 0 ? x(categories[1]) : x(categories[1]) + 30 })
     //       .attr("width", x.bandwidth() / 2)
	    //      .attr("fill", function(_,i) { 
	    //      	return i === 0 ? 'red' : 'green'
	    //      })
	    //     .merge(bars)
     //       .attr("y", function(d, i) {  return y(d.W); })
	    //      .attr("height", function(d,i,j) { return height - y(d.W); });
	  });
  });
});