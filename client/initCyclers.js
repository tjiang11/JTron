function setCyclerControls() {
	for (var i = 0; i < CYCLER_LIST.length; i++) {
		CYCLER_LIST[i].controls = playerControls[i];
		CYCLER_LIST[i].color = playerColors[i];
	}
}

function setCyclerPositions() {
	var numPlayersNotSet = $('#selectNumberPlayers').val();
	var id = 1;
	var row = 1;
	var numRows = Math.ceil(numPlayers / 2) + 1;
	while (numPlayersNotSet > 0) {
		if (numPlayersNotSet > 1) {
			Cycler(id, Math.floor(gameGrid[0].length / 3), Math.floor(row * gameGrid.length / numRows), 1);
			Cycler(id, Math.floor(2 * gameGrid[0].length / 3), Math.floor(row * gameGrid.length / numRows), 1);
			numPlayersNotSet -= 2;
		} else {
			Cycler(id, Math.floor(gameGrid[0].length / 2), Math.floor(row * gameGrid.length / numRows), 1);
			numPlayersNotSet -= 1;
		}
		row++;
	}
}