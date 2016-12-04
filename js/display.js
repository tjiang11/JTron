function drawGrid() {
	ctx.fillStyle = "black";
	ctx.shadowBlur = 0;
	ctx.fillRect(0,0,w,h);
	for (var i = 0; i < gameGrid.length; i++) {
		for (var j = 0; j < gameGrid[0].length; j++) {
			ctx.beginPath();
			ctx.lineWidth="0.5";
			ctx.strokeStyle="#265299";
			ctx.rect(j * cell_width, i * cell_height, cell_width + 1, cell_height + 1);
			ctx.stroke();
		}
	}
}

function showLeaderboard() {
	$('#leaderUl').empty();
	for (var i = 0; i < numPlayers; i++) {
		var content = "<div style='font-weight:bold; color:" + playerColors[i] + " ; display:inline'>Player " + (i + 1) + ": " + SCORES[i] + " </div>";
		$('#leaderUl').append('<li>' + content + '</li>');
	}
	
	$('#leaderBoard').removeClass("hidden");
}

function showControls() {
	$('#playerListAndControls').empty();
	for (var i = 0; i < $('#selectNumberPlayers').val(); i++) {
	var appendMe = "";
	appendMe += "<div style='font-weight:bold; color:" + playerColors[i] + " ; display:inline'>Player " + (i + 1) + ": </div>";
	for (var j = 0; j < playerControls[i].length; j++) {
		var key = playerControls[i][j];
		if (key >= 37 && key <= 40) {
			if (key == 38) {
				appendMe += "&uarr; ";
			} else if (key == 37) {
				appendMe += "&larr; ";
			} else if (key == 39) {
				appendMe += "&rarr; ";
			} else if (key == 40) {
				appendMe += "&darr; ";
			}
		} else {
			appendMe += String.fromCharCode((96 <= key && key <= 105) ? key-48 : key) + " ";
		}
	}
	$('#playerListAndControls').append("<li>" + appendMe);
	}
}

function renderStartUpOne() {
	ctx.shadowBlur = 20;
	ctx.shadowColor = "white";
	ctx.fillStyle = "cyan";
	var x = gameGrid[0].length / 2;
	var y = gameGrid.length / 2 - 5;
	for (var i = 0; i < 11; i++) {
		ctx.fillRect(x * cell_width, (y + i) * cell_height, cell_width, cell_height);
	}
}

function renderStartUpTwo() {
	ctx.shadowBlur = 20;
	ctx.shadowColor = "white";
	ctx.fillStyle = "cyan";
	var x = gameGrid[0].length / 2 - 2;
	var y = gameGrid.length / 2 - 5;
	
	for (var i = 0; i < 5; i++) {
		ctx.fillRect((x + i) * cell_width, y * cell_height, cell_width, cell_height);
	}
	for (var i = 1; i < 5; i++) {
		ctx.fillRect((x + 5) * cell_width, (y + i) * cell_height, cell_width, cell_height);
	}
	for (var i = 0; i < 5; i++) {
		ctx.fillRect((x + i) * cell_width, (y + 5) * cell_height, cell_width, cell_height);
	}
	for (var i = 1; i < 5; i++) {
		ctx.fillRect((x - 1) * cell_width, (y + 5 + i) * cell_height, cell_width, cell_height);
	}
	for (var i = 0; i < 5; i++) {
		ctx.fillRect((x + i) * cell_width, (y + 10) * cell_height, cell_width, cell_height);
	}
}

function renderStartUpThree() {
	ctx.shadowBlur = 20;
	ctx.shadowColor = "white";
	ctx.fillStyle = "cyan";
	var x = gameGrid[0].length / 2 - 2;
	var y = gameGrid.length / 2 - 5;

	for (var i = 0; i < 5; i++) {
		ctx.fillRect((x + i) * cell_width, y * cell_height, cell_width, cell_height);
	}
	for (var i = 1; i < 5; i++) {
		ctx.fillRect((x + 5) * cell_width, (y + i) * cell_height, cell_width, cell_height);
	}
	for (var i = 0; i < 5; i++) {
		ctx.fillRect((x + i) * cell_width, (y + 5) * cell_height, cell_width, cell_height);
	}
	for (var i = 1; i < 5; i++) {
		ctx.fillRect((x + 5) * cell_width, (y + 5 + i) * cell_height, cell_width, cell_height);
	}
	for (var i = 0; i < 5; i++) {
		ctx.fillRect((x + i) * cell_width, (y + 10) * cell_height, cell_width, cell_height);
	}
}
