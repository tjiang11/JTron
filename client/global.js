var canvas = $("#canvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
game_width = 100;
game_height = 60;
var ctx = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();
var filled_cells = [];
var CYCLER_LIST = [];
var numAlive;
var numPlayers;
var gameInterval;
var frameRate = 1000/20;

GAME_STATE_ENUM = {
	WAITING : 0,
	PLAYING : 1
}
var GAME_STATE = GAME_STATE_ENUM.WAITING;
var SCORES = [];
var gameGrid = new Array(game_height);
for (var i = 0; i < game_height; i++) {
	gameGrid[i] = new Array(game_width);
	for (var j = 0; j < game_width; j++) {
		gameGrid[i][j] = false;
	}
}

function clearGrid() {
	for (var i = 0; i < game_height; i++) {
		for (var j = 0; j < game_width; j++) {
			gameGrid[i][j] = false;
		}
	}
}

var playerControls = [
	[87, 65, 83, 68], 
	[73, 74, 75, 76], 
	[38, 37, 40, 39], 
	[104, 100, 101, 102]
];
var playerColors = ['#ff2121', '#44ff47', '#285eff', '#fffb21'];

var cell_width = canvas.width / gameGrid[0].length;
var cell_height = canvas.height / gameGrid.length

$(window).resize(function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	w = $("#canvas").width();
	h = $("#canvas").height();
	cell_width = canvas.width / gameGrid[0].length;
	cell_height = canvas.height / gameGrid.length
	drawGrid();
});