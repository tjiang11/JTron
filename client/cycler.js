var Cycler = function(id, x, y, speed) {
		var self = {
			idNum: id,
			x: x,
			y: y,
			color: '',
			speed: speed,
			speedx: 0,
			speedy: 0,
			alive: true,
			controls: []
		}
		self.moveUp = function() {
			if (self.speedy != self.speed) {
				self.speedy = -self.speed;
				self.speedx = 0;
			}
		}
		self.moveDown = function() {
			if (self.speedy != -self.speed) {
				console.log("d");
				self.speedy = self.speed;
				self.speedx = 0;
			}
		}
		self.moveLeft = function() {
			if (self.speedx != self.speed) {
				self.speedy = 0;
				self.speedx = -self.speed;
			}
		}
		self.moveRight = function() {
			if (self.speedx != -self.speed) {
				self.speedy = 0;
				self.speedx = self.speed;
			}
		}
		self.move = function() {
			if (self.speedx == 0 && self.speedy == 0) {
				self.speedy = self.speed;
			}
			self.y = self.y + self.speedy;
			self.x = self.x + self.speedx;
		}
		self.checkPosition = function() {
			if (self.collide()) {
				self.die();
			}
			gameGrid[self.y][self.x] = true;
		}
		self.collideHeadOn = function() {
			for (var i = 0; i < CYCLER_LIST.length; i++) {
				if (CYCLER_LIST[i] == self) continue;
				if (CYCLER_LIST[i].x == self.x && CYCLER_LIST[i].y == self.y) {
					headOnCrashCells.push([self.y, self.x]);
					return true;
				}
			}
			return false;
		}
		self.collide = function() {
			if (self.x < 0 || self.x >= game_width || self.y < 0 || self.y >= game_height) {
				return true;
			}
			if (gameGrid[self.y][self.x]) {
				return true;
			}
			if (self.collideHeadOn()) {
				return true;
			}
			
			return false;
		}
		self.die = function() {
			self.alive = false;
			numAlive--;
			console.log(numAlive);
		}
		gameGrid[self.y][self.x] = true;
		CYCLER_LIST.push(self);
		return self;
	}