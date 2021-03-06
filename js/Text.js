var Textbox = Shape.extend({

  constructor: function() {
    this.base("Textbox");
    this.text = '';
  },

  startDrawing:function(point) {
    $('.textfield').css({"top": this.pos.y, "left": this.pos.x}).show();
  },

  draw: function(canvas) {
    canvas.beginPath();
    canvas.setLineDash([0]);
    canvas.fillStyle = this.color;
    var font = this.fontStyle + " " + this.fontSize + "pt " + this.font;
    canvas.font  = font ;
    canvas.fillText(this.text, this.pos.x, this.pos.y);
    this.width = this.pos.x + canvas.measureText(this.text).width;
    this.height = this.pos.y - canvas.measureText('N').width;
    canvas.closePath();
  },

  selectedObj: function(m, n, canvas) {
    if((m >= this.pos.x && m <= this.width) && (n <= this.pos.y && n >= this.height)) {
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
    canvas.strokeRect(this.pos.x, this.pos.y, this.width - this.pos.x, this.height - this.pos.y ); //canvas.strokeRect(this.size.x - this.pos.x, this.size.y - this.pos.y, this.width, this.height );
    this.base(canvas);
    canvas.closePath();
  }
});
