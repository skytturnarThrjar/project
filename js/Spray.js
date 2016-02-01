var Spray = Shape.extend({

	constructor: function() {
		this.base("Spray");
	},

	draw: function(canvas) {
		canvas.beginPath();
		canvas.lineJoin = canlineCap = 'round';
		canvas.lineWidth = this.width;
		canvas.fillStyle = this.color;
		canvas.moveTo(this.pos.x, this.pos.y);
		for(var i = 0; i < this.drawlineX.length; i++) {
		  	canvas.fillRect(this.drawlineX[i] , this.drawlineY[i] ,1,1);
		}
		canvas.stroke();
		this.base(canvas);
		canvas.closePath();
	},

	drawing:function(point) {
		function getRandomInteger(min, max) {
			return Math.floor( Math.random() * (max - min + 1)) + min;
		}
		var j = 35;
		var radius = this.width * 10;
			while(j > 0) {
				j--;
				var offsetX = getRandomInteger(-radius, radius);
				var offsetY = getRandomInteger(-radius, radius);
				this.drawlineX.push(point.x + offsetX);
				this.drawlineY.push(point.y + offsetY);
			}
	},

selectedObj: function(m, n) {
		var xMax = 0;
		var xMin = 1000;//canvasMax
		var yMax = 0;
		var yMin = 1000;

		for(var i = 0; i < this.drawlineX.length; i++) {
			if(this.drawlineX[i] < xMin) {
				xMin = this.drawlineX[i];
			}

			if(this.drawlineX[i] > xMax) {
				xMax = this.drawlineX[i];
			}

			if(this.drawlineY[i] < yMin) {
				yMin = this.drawlineY[i];
			}

			if(this.drawlineY[i] > yMax) {
				yMax = this.drawlineY[i];
			}
		}

		if(xMin <= m && xMax >= m) {
			if(yMin <= n && yMax >= n) {
				this.selectedObject = true;
			}
		}
	},

	moveObj: function(startp, point) {
		this.pos.x = point.x + (this.pos.x - startp.x);
		this.pos.y = point.y + (this.pos.y - startp.y);

		for(var i = 0; i < this.drawlineX.length; i++) {
			this.drawlineX[i] = point.x + (this.drawlineX[i] - startp.x);
			this.drawlineY[i] = point.y + (this.drawlineY[i] - startp.y);
		}
	},

	selectedFill: function(canvas) {
		var xMax = 0;
		var xMin = 1000;//canvasMax
		var yMax = 0;
		var yMin = 1000;

		for(var i = 0; i < this.drawlineX.length; i++) {
			if(this.drawlineX[i] < xMin) {
				xMin = this.drawlineX[i];
			}

			if(this.drawlineX[i] > xMax) {
				xMax = this.drawlineX[i];
			}

			if(this.drawlineY[i] < yMin) {
				yMin = this.drawlineY[i];
			}

			if(this.drawlineY[i] > yMax) {
				yMax = this.drawlineY[i];
			}
		}

		canvas.strokeStyle = "#000000";
		canvas.lineWidth = 0.5;
		canvas.beginPath();
		canvas.setLineDash([4]);
		canvas.strokeRect(xMin, yMin, (xMax - xMin) , (yMax - yMin));
		this.base(canvas);
		canvas.closePath();
	}
});
