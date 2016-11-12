function updateScore() {
	for (var i = 0; i < CYCLER_LIST.length; i++) {
		if (CYCLER_LIST[i].alive) {
			SCORES[i]++;
			return;
		}
	}
}

function nextRound() {
	clearInterval(gameInterval);
	updateScore();
	showLeaderboard();
	setTimeout(function() {
		$('#leaderBoard').addClass("hidden");
		clearGrid();
		numAlive = numPlayers;
		console.log("nextRound: " + numAlive);
		CYCLER_LIST = [];
		setCyclerPositions();
		setCyclerControls();
		startUpSequence();
	}, 800);
}


function update() {
	headOnCrashCells = [];
	if ((numAlive < 2 && numPlayers > 1) || numAlive < 1) {
		nextRound();
	}
	for (var cycler in CYCLER_LIST) {
		if (CYCLER_LIST[cycler].alive) {
			CYCLER_LIST[cycler].move();
		}
	}
	for (var cycler in CYCLER_LIST) {
		if (CYCLER_LIST[cycler].alive) {
			CYCLER_LIST[cycler].checkPosition();
		}
	}
}

function render() {	
	for (var c in CYCLER_LIST) {
		if (CYCLER_LIST[c].alive) {
			var cycler = CYCLER_LIST[c];
			ctx.fillStyle = cycler.color;
			ctx.shadowBlur = 20;
			ctx.shadowColor = "white";
			ctx.fillRect(cycler.x * cell_width, cycler.y * cell_height, cell_width, cell_height);
		}
	}
	for (var i = 0; i < headOnCrashCells.length; i++) {
		ctx.fillStyle = "white";
		ctx.shadowBlur = 20;
		ctx.shadowColor = "white";
		ctx.fillRect(headOnCrashCells[i][1] * cell_width, headOnCrashCells[i][0] * cell_height, cell_width, cell_height);
	}
}

function updateAndRender() {
	render();
	update();
}


function startUpSequence() {
	drawGrid();
	renderStartUpThree();
	render();
	setTimeout(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawGrid();
		renderStartUpTwo();
		render();
		setTimeout(function() {
			drawGrid();
			renderStartUpOne();
			render();
			setTimeout(function() {
				drawGrid();
				gameInterval = setInterval(updateAndRender, frameRate);
			}, 800);
		}, 800);
	}, 800);
}

function setUp() {
	SCORES = new Array(parseInt(numPlayers));
	for (var i = 0; i < SCORES.length; i++) {
		SCORES[i] = 0;
	}
}

function gameStart() {
	numPlayers = $('#selectNumberPlayers').val();
	numAlive = $('#selectNumberPlayers').val();
	if (GAME_STATE == GAME_STATE_ENUM.WAITING) {
		GAME_STATE = GAME_STATE_ENUM.PLAYING;
		setUp();
		setCyclerPositions();
		setCyclerControls();
		startUpSequence();
	}
}

$(document).ready(function() {
	drawGrid();
	showControls();
});
