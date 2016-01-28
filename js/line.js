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

	added: function(canvas) {
		/*if(this.size.x < 0) {
			this.pos.x += this.size.x;
			this.size.x = Math.abs(this.size.x);
		}

		if(this.size.y < 0) {
			this.pos.y += this.size.y;
			this.size.y = Math.abs(this.size.y);
		}*/

	},

	selectedObj: function(m, n) {
		console.log(m + "," + n);
		console.log("x" + this.pos.x + "," + "end x "+ this.size.x);
		console.log("y" + this.pos.y + "," + "end y" + this.size.y);
		console.log("line lalal");

		if(this.pos.x < this.size.x){
			if(this.pos.x < m && this.size.x > m){
				if(this.pos.y < this.size.y){
					if(this.pos.y < n && this.size.y > n){
						this.selectedObject = true;
					}
				}
				else{
					if(this.size.y < n && this.pos.y > n){
						this.selectedObject = true;
					}
				}
			}
		}
		else {
			if(this.size.x < m && this.pos.x > m){
				if(this.pos.y < this.size.y){
					if(this.pos.y < n && this.size.y > n){
						this.selectedObject = true;
					}
				}
				else{
					if(this.size.y < n && this.pos.y > n){
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

});
