document.addEventListener("DOMContentLoaded", function() {
	var g = new Game();

	function setMessage(message) {
		document.getElementById("message").innerHTML = message;
	}

	function clearBoard() {
		document.querySelectorAll(".square").forEach(function(square) {
			square.innerHTML = "";
			square.style.pointerEvents = "auto";
		});

		setMessage("");
	}

	function stopGame() {
		document.querySelectorAll(".square").forEach(function(square) {
			square.style.pointerEvents = "none";
		});
	}

	var newBtn = document.getElementById("new-game");
    newBtn && newBtn.addEventListener("click", function() {
		g.reset();
		clearBoard();
	});

	var board = document.getElementById("board");
	board && board.addEventListener("click", function(event) {
		if (event.target.classList.contains("square")) {
			sInfo = event.target.id.split("_");
			row = Number(sInfo[1])
			col = Number(sInfo[2])

			var val = g.makeMove(row, col);
			
			if(val !== undefined) {
				let stateValue = Square.stateToString(val);
				event.target.innerHTML = `<span class=${stateValue}>${stateValue}</span>`;
			}

			var state = g.winner();

			if(state === Board.X_WINS) {
				setMessage("X WINS!");
				stopGame();
			} else if(state === Board.O_WINS) {
				setMessage("O WINS!");
				stopGame();
			} else if(state === Board.TIE) {
				setMessage("Tie!");
			}
		}
	});
});