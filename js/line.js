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
		canvas.moveTo(this.startX,this.startY);
		canvas.lineTo(this.size.x,this.size.y);
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
});
