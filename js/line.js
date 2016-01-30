var Line = Shape.extend({

	constructor: function() {
		this.base("Line");
	},

	startDrawing:function(point) {
			this.startX = this.pos.x;
			this.startY = this.pos.y;
	},

	draw: function(canvas) {
			canvas.strokeStyle = this.color;
			canvas.lineWidth = this.width;
			canvas.beginPath();
			canvas.setLineDash([0]);
			canvas.moveTo(this.startX, this.startY);
			canvas.lineTo(this.size.x, this.size.y);
			canvas.stroke();
			this.base(canvas);
			canvas.closePath();
	},

	drawing:function(point) {
			this.size.x = point.x;
			this.size.y = point.y;
	},

	stopDrawing:function(point) {
			this.size.x = point.x;
			this.size.y = point.y;
	},

	selectedObj: function(m, n) {

		if(this.startX < this.size.x) {
			if(this.startX < m && this.size.x > m) {
				if(this.startY < this.size.y) {
					if(this.startY < n && this.size.y > n) {
						this.selectedObject = true;
					}
				}
				else {
					if(this.size.y < n && this.pos.y > n) {
						this.selectedObject = true;
					}
				}
			}
		}
		else {
			if(this.size.x < m && this.startX > m) {
				if(this.startY < this.size.y) {
					if(this.startY < n && this.size.y > n) {
						this.selectedObject = true;
					}
				}
				else{
					if(this.size.y < n && this.startY > n){
						this.selectedObject = true;
					}
				}
			}
		}
	},

	moveObj: function(startp, point) {
		var distX = startp.x - point.x;
		var distY = startp.y - point.y;
		this.size.x = Math.abs(this.size.x - distX);//point.x + (this.size.x - startp.x);
		this.size.y = Math.abs(this.size.y - distY);//point.y + (this.size.y - startp.y);
		this.startX = Math.abs(this.startX - distX);//point.x + (this.startX - startp.x );
		this.startY = Math.abs(this.startY - distY);//point.y + (this.startY- startp.y);
	},

	selectedFill: function(canvas) {
		canvas.strokeStyle = "#000000";
		canvas.lineWidth = 0.5;
		canvas.beginPath();
		canvas.setLineDash([4]);
		canvas.strokeRect(this.startX, this.startY, (this.size.x - this.startX ), (this.size.y- this.startY));
		this.base(canvas);
		canvas.closePath();
	}
});
