var Textbox = Shape.extend({

  constructor: function(font, fontsize, fontstyle) {
    this.base("Textbox");
    this.font = font;
    this.fontsize = fontsize;
    this.fontstyle = fontstyle;
    this.text = '';
  },

  startDrawing:function(point) {
    $('.textfield').css({"top": this.pos.y, "left": this.pos.x}).show();
  },

  draw: function(canvas) {
    canvas.beginPath();
    canvas.font = (this.fontstyle + " " + this.fontsize + "pt " + this.font);
    canvas.fillStyle = this.color;
    canvas.fillText(this.text, this.pos.x, this.pos.y);
    this.width = this.pos.x + canvas.measureText(this.text).width;
    this.height = this.pos.y - canvas.measureText(this.text).width;
    canvas.closePath();
  },

  selectedObj: function(m, n, canvas) {
    if(m >= this.pos.x && m <= this.width) {
      if(n <= this.pos.y && n >= this.height) {
        this.selectedObject = true;
      }
    }
  },

  moveObj: function(start, end) {
    var distX = start.x - end.x;
		var distY = start.y - end.y;
		this.pos.x -= distX;
		this.pos.y -= distY;
  }
});
