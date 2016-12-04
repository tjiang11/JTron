var ComputerCycler = function(id, x, y, speed) {
	var self = Cycler(id, x, y, speed);
	
	self.superMove = self.move;
	self.move = function() {
		self.determineMove();
		self.superMove();
	}
	self.moveInDirection = function(direction) {
		switch (direction) {
			case 'UP': self.moveUp(); break;
			case 'LEFT': self.moveLeft(); break;
			case 'DOWN': self.moveDown(); break;
			case 'RIGHT': self.moveRight(); break;
		}
	}
	self.getDest = function(direction) {
		switch (direction) {
			case 'UP':
				return [self.y - 1, self.x];
			case 'LEFT':
				return [self.y, self.x - 1];
			case 'DOWN':
				return [self.y + 1, self.x];
			case 'RIGHT':
				return [self.y, self.x + 1];
		}
	}
	
	self.determineMove = function() {
		var selectDir = 'UP';
		for (var direction in DIRECTIONS) {
			var dest = self.getDest(direction);
			console.log(dest);
			if (!self.passable(dest)) continue;
			var adj = getAdj(dest);
			for (var c in adj) {
				if (isWall(adj[c])) {
					selectDir = direction;
					break;
				}
			}
	
		}
		self.moveInDirection(selectDir);
	}
	
	self.passable = function(dest) {
		var y = dest[0];
		var x = dest[1];
		if (y < 0 || y >= game_height || x < 0 || x >= game_width) {
			return false;
		}
		return !gameGrid[y][x];
	}
}

function getAdj(dest) {
	var y = dest[0];
	var x = dest[1];
	adj = [];
	adj.push([y + 1, x], [y, x + 1], [y - 1, x], [y, x - 1]);
	return adj;
}

function isWall(c) {
	var y = c[0];
	var x = c[1];
	if (y < 0 || y >= game_height || x < 0 || x >= game_width) return true;
	return gameGrid[y][x];
}