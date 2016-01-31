var Square = Shape.extend({

	constructor: function() {
		this.base("Square");
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		canvas.beginPath();
		canvas.setLineDash([0]);
		canvas.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		this.base(canvas);
		canvas.closePath();
	},

	drawing:function(point) {
		this.size.x = point.x - this.pos.x;
		this.size.y = point.y - this.pos.y;
	},

	added: function(canvas) {
		if(this.size.x < 0) {
			this.pos.x += this.size.x;
			this.size.x = Math.abs(this.size.x);
		}
		if(this.size.y < 0) {
			this.pos.y += this.size.y;
			this.size.y = Math.abs(this.size.y);
		}
	},

	selectedObj: function(m, n) {
		if((m >= this.pos.x && m <= (this.size.x + this.pos.x)) && (n >= this.pos.y && n <= (this.size.y + this.pos.y))) {
			this.selectedObject = true;
  	}
	},

	moveObj: function(start, end) {
		var distX = start.x - end.x;
		var distY = start.y - end.y;
		this.pos.x -= distX;
		this.pos.y -= distY;
	},

	selectedFill: function(canvas) {
		canvas.strokeStyle = "#000000";
		canvas.lineWidth = 0.5;
		canvas.beginPath();
		canvas.setLineDash([4]);
		canvas.strokeRect(this.pos.x - 3, this.pos.y - 3, this.size.x + 6, this.size.y + 6);
		this.base(canvas);
		canvas.closePath();
	}
});
