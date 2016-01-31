var Circle = Shape.extend({

	constructor: function() {
		this.base("Circle");
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		canvas.beginPath();
		canvas.setLineDash([0]);
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

	selectedObj: function(m, n) {
		var xPos = this.pos.x - this.radius;
		var xSize = this.pos.x + this.radius;
		var yPos = this.pos.y - this.radius;
		var ySize = this.pos.y + this.radius;

		if((xPos <= m && xSize >= m) && (yPos <= n && ySize >= n)) {
			this.selectedObject = true;
		}
	},

	moveObj: function(start, end) {
		var distX = start.x - end.x;
		var distY = start.y - end.y;
		this.pos.x = end.x;
		this.pos.y = end.y;
	},

	selectedFill: function(canvas) {

		var xPos = this.pos.x - this.radius;
		var xSize = this.pos.x + this.radius;
		var yPos = this.pos.y - this.radius;
		var ySize = this.pos.y + this.radius;

		canvas.strokeStyle = "#000000";
		canvas.lineWidth = 0.5;
		canvas.beginPath();
		canvas.setLineDash([4]);
		canvas.strokeRect(xPos, yPos, xSize - xPos, ySize - yPos);
		this.base(canvas);
		canvas.closePath();
	}
});
