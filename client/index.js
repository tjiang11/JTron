$(document).ready(function() {
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
	showControls();

	
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
	
	function updateScore() {
		for (var i = 0; i < CYCLER_LIST.length; i++) {
			if (CYCLER_LIST[i].alive) {
				SCORES[i]++;
				return;
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
	
	function nextRound() {
		clearInterval(gameInterval);
		updateScore();
		showLeaderboard();
		setTimeout(function() {
			$('#leaderBoard').addClass("hidden");
			clearGrid();
			numAlive = numPlayers;
			console.log(numAlive);
			CYCLER_LIST = [];
			setCyclerPositions();
			setCyclerControls();
			startUpSequence();
		}, 800);
	}
	
	function update() {
		console.log(numAlive);
		if ((numAlive < 2 && numPlayers > 1) || numAlive < 1) {
			nextRound();
		}
		for (var cycler in CYCLER_LIST) {
			if (CYCLER_LIST[cycler].alive) {
				CYCLER_LIST[cycler].move();
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
	}
	
	function updateAndRender() {
		render();
		update();
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
	
	function startUpSequence() {
		drawGrid();
		renderStartUpThree();
		render();
		console.log(CYCLER_LIST[0].y);
		setTimeout(function() {
			console.log(CYCLER_LIST[0].y);
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
});