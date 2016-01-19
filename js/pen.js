var Pen = Shape.extend({

	constructor: function(pos,color) {
		this.base("Pen",pos,color);
	},

	
	startDrawing:function(point) {
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.beginPath();
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
});