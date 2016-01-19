var Circle = Shape.extend({
	
	constructor: function(pos,color) {
		this.base("Circle",pos,color);
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		//canvas.beginPath();
		canvas.arc( this.pos.x , this.pos.y , Math.abs((this.size.x - this.pos.x)/2), 0, 2 * Math.PI, false );
		//canvas.lineWidth = 5;
		this.base(canvas);
	},

	drawing:function(point) {
		this.size.x = point.x - this.pos.x;
		this.size.y = point.y - this.pos.y;
	},


});
