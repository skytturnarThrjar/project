var Circle = Shape.extend({
	
	constructor: function() {
		this.base("Circle");
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		console.log(this.width);
		canvas.beginPath();
		canvas.arc( this.pos.x , this.pos.y, this.radius, 0, 2 * Math.PI, false );
		canvas.stroke();
		canvas.closePath();
		this.base(canvas);
	},

	drawing:function(point) {
		this.size.x = point.x;
		this.size.y = point.y;
		this.radius = Math.sqrt(Math.pow(this.size.x - this.pos.x, 2) + Math.pow(this.size.y - this.pos.y, 2));
	},


});
