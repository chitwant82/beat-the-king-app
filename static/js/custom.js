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

	var mySelect1 = $('#d1');
	$.each(myOptions, function(val, text) {
	    mySelect1.append(
	        $('<option></option>').val(val).html(text)
	    );
	});

	var mySelect2 = $('#d2');
	$.each(myOptions, function(val, text) {
	    mySelect2.append(
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
    	if(prevD1 !== null)
    		mySelect2.append($('<option></option>').val(prevD1).
    			html(myOptions[prevD1]));
			$("#d2 option[value='" + cVal + "']").remove();

		  var bDiv = $('#btn-pla-1');
		  var btElement = $('#btn-1');

		  buttonLogic(cVal, bDiv, btElement, 'btn-1', player1);
		  
		  if( (player1 !== undefined && player2 !== undefined) &&
		   (player1 !== "" && player2 !== "") ) {
		  	d3Logic('/static/stats.csv', player1, player2);
		  }
  });

  var prevD2;
  $("#d2").mouseup(function() {
  	prevD2 = $(this).val();
  }).change(function () {
  	var cVal = $(this).val();
    player2 = $("#d2 option[value='" + cVal + "']").text();
    if(prevD2 !== null)
    	mySelect1.append($('<option></option>').val(prevD2).
    		html(myOptions[prevD2]));

		$("#d1 option[value='" + $(this).val() + "']").remove();

		var bDiv = $('#btn-pla-2');
		var btElement = $('#btn-2');

		buttonLogic(cVal, bDiv, btElement, 'btn-2', player2);

		if( (player1 !== undefined && player2 !== undefined) &&
		 (player1 !== "" && player2 !== "") ) {
			d3Logic('/static/stats.csv', player1, player2);
		}
  });
});