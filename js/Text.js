var Textbox = Shape.extend({

//Það sem á eftir að gera við textann er að taka inn mismunandi font style, font size og font :)
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
    //console.log(this.fontstyle + " " + this.fontsize + " " + this.font);
    canvas.font = (this.fontstyle + " " + this.fontsize + "pt " + this.font);
    canvas.fillStyle = this.color;
    canvas.fillText(this.text, this.pos.x, this.pos.y);
    canvas.closePath();
  }
});
