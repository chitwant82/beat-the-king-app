function Game(playerX = "X", playerO = "O") {
	this.board = new Board();
	this.playerX = new Player(Square.X_STATE, playerX);
	this.playerO = new Player(Square.O_STATE)
	this.currentMovePlayer = this.playerX;
}

Game.prototype.makeMove = function(row, column) {
	if(this.board.empty(row, column) && this.board.setSquare(row, column, this.currentMovePlayer.squareState) !== undefined) {
		var tempState = this.currentMovePlayer.squareState;
		this.__changeTurn();
		return tempState;
	}

	return undefined;
};


Game.prototype.__changeTurn = function() {
	if(this.currentMovePlayer === this.playerX) {
		this.currentMovePlayer = this.playerO;
	} else {
		this.currentMovePlayer = this.playerX
	}
};

Game.prototype.winner = function() {
	return this.board.boardState();
}

Game.prototype.reset = function() {
	this.currentMovePlayer = this.playerX;
	this.board.reset();
};