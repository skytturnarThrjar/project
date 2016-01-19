var Shape = Base.extend({

	constructor:function(name,pos,color) {
		this.name = name;
		this.pos = pos;
		this.size = new Point(0,0);
		this.color = color;
		this.selected = false;
		this.startX = 0; 
		this.startY = 0;
	},


	draw:function(canvas) {		
		if ( this.selected === true ) {
			// show selection
		}
	},

	startDrawing:function(point) {

	},

	drawing:function(point) {

	},

	stopDrawing:function(point) {

	},

	added: function(canvas) {

	},
});