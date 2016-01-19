var Line = Shape.extend({

	constructor: function(pos,color) {
		this.base("Line",pos,color);
	},

	startDrawing:function(point) {
		this.startX = this.pos.x;
		this.startY = this.pos.y;
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.beginPath();
		canvas.moveTo(this.startX,this.startY);
		canvas.lineTo(this.size.x,this.size.y);
		canvas.stroke();
		this.base(canvas);
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