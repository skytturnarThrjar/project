var Pen = Shape.extend({

	constructor: function() {
		this.base("Pen");
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		canvas.beginPath();
		canvas.setLineDash([0]);
		canvas.moveTo(this.pos.x, this.pos.y);
		for(var i = 0; i < this.drawlineX.length; i++) {
			canvas.lineTo(this.drawlineX[i], this.drawlineY[i]);
		}
		canvas.stroke();
		this.base(canvas);
	},

	drawing:function(point) {
		this.drawlineX.push(point.x);
		this.drawlineY.push(point.y);
	},

	stopDrawing:function(point) {
		this.size.x = point.x;
		this.size.y = point.y;
	},

	selectedObj: function(m, n) {
		var xMax = 0;
		var xMin = window.innerWidth;
		var yMax = 0;
		var yMin = window.innerHeight;

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
		if((xMin <= m && xMax >= m) && (yMin <= n && yMax >= n)) {
			this.selectedObject = true;
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
		var xMin = window.innerWidth;
		var yMax = 0;
		var yMin = window.innerHeight;

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
