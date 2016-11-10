document.getElementById("start-btn").addEventListener("click", function() {
		$('#menu').addClass("hidden");
		gameStart();
	});
	
document.body.addEventListener("keydown", function(e) {
	if (GAME_STATE == GAME_STATE_ENUM.PLAYING) {
		keyListener(e);
	}
}, false);

$('#selectNumberPlayers').on("input change", function() {
	$('#numberPlayers').text($(this).val() + " Player");
	if ($(this).val() > 1) $('#numberPlayers').append("s");
	showControls();
});

$('#selectGridSize').on("input change", function() {
	console.log($(this).val());
	switch ($(this).val()) {
		case "1": 
			console.log("f");
			game_width = 50;
			game_height = 30;
			break;
		case "2":
			game_width = 100;
			game_height = 60;
			break;
		case "3":
			game_width = 150;
			game_height = 90;
			break;
		case "4":
			game_width = 200;
			game_height = 120;
			break;
		case "5":
			game_width = 400;
			game_height = 240;
			break;
	}
	gameGrid = new Array(game_height);
	for (var i = 0; i < game_height; i++) {
		gameGrid[i] = new Array(game_width);
		for (var j = 0; j < game_width; j++) {
			gameGrid[i][j] = false;
		}
	}
	cell_width = canvas.width / gameGrid[0].length;
	cell_height = canvas.height / gameGrid.length;
	drawGrid();
});

$('#selectCyclerSpeed').on("input change", function() {
	switch ($(this).val()) {
		case "1":
			frameRate = 1000/10;
			break;
		case "2":
			frameRate = 1000/16;
			break;
		case "3":
			frameRate = 1000/20;
			break;
		case "4":
			frameRate = 1000/30;
			break;
		case "5":
			frameRate = 1000/40;
			break;
	}
});

function keyListener(e) {
	var keyCode = e.keyCode;
	console.log(keyCode);
	console.log(CYCLER_LIST[0].controls[0]);
	for (var i = 0; i < CYCLER_LIST.length; i++) {
		if (keyCode == CYCLER_LIST[i].controls[0]) {
			CYCLER_LIST[i].moveUp();
		} else if (keyCode == CYCLER_LIST[i].controls[2]) {
			CYCLER_LIST[i].moveDown();
		} else if (keyCode == CYCLER_LIST[i].controls[1]) {
			CYCLER_LIST[i].moveLeft();
		} else if (keyCode == CYCLER_LIST[i].controls[3]) {
			CYCLER_LIST[i].moveRight();
		}
	}
}