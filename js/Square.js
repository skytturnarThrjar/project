var Square = Shape.extend({

	constructor: function() {
		this.base("Square");
	},

	draw: function(canvas) {
		canvas.strokeStyle = this.color;
		canvas.lineWidth = this.width;
		canvas.beginPath();
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
		if(m > this.pos.x && m < (this.size.x + this.pos.x) ){
			console.log("if sent");
			if(n > this.pos.y && n < (this.size.y + this.pos.y)){
				console.log("if sent 2");
				this.selectedObject = true;
				}
		/*console.log(m + "," + n);
		console.log("x" + this.pos.x + "," + "end x "+ this.size.x);
		console.log("y" + this.pos.y + "," + "end y" + this.size.y);
		console.log("square lalal");*/
  	}
	},

	moveObj: function(start, end) {
		//Start mousedown
		//end mouseup
		//this.size neðra horn á kassa
		//this.pos efsta horn á kassa
		var distX = start.x - end.x;
		var distY = start.y - end.y;
		this.pos.x = end.x;
		this.pos.y = end.y;
	}
});
