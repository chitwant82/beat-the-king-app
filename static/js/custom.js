// $(document).ready(function() {
$(function() {

	var myOptions = {
	    player1 : 'LeBron James',
	    player2 : 'Russell Westbrook',
	    player3 : 'Stephen Curry',
	    player4 : 'Anthony Davis',
	    player5 : 'DeMarcus Cousins',
	    player6 : 'Isaiah Thomas',
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
		  
		  if( (player1 !== undefined && player2 !== undefined) && (player1 !== "" && player2 !== "") ) {
		  	d3Logic('/static/stats.csv', player1, player2);
		  }
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

		if( (player1 !== undefined && player2 !== undefined) && (player1 !== "" && player2 !== "") ) {
			d3Logic('/static/stats.csv', player1, player2);
		}
  });
});