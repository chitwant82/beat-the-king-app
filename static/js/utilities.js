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
		if (!currentSelectValue.includes("Select Player")) {
		// if(currentSelectValue !== 'Select Player 1' && currentSelectValue !== 'Select Player 2') {
			buttonElement.remove();
			if(buttonId === 'btn-1') {
				buttonDivElement.append($('<button type="button" class="btn btn-thumb btn-thumb-active1" id=' + buttonId + '><img src="/static/pictures/player1.jpg" alt=""> ' + buttonText + '</button>'));
			}
			else {
				buttonDivElement.append($('<button type="button" class="btn btn-thumb btn-thumb-active2" id=' + buttonId + '><img src="/static/pictures/player2.jpg" alt=""> ' + buttonText + '</button>'));
			}
		}
	}
}