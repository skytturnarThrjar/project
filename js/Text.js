var Textbox = Shape.extend({

//Það sem á eftir að gera við textann er að taka inn mismunandi font style, font size og font :)
  constructor: function(font, fontsize, fontstyle) {
    this.base("Textbox");
    this.text = " ";
    this.font = font;
    this.fontsize = fontsize;
    this.fontstyle = fontstyle;
  },

  draw: function(canvas) {
    canvas.font = (this.fontstyle + " " + this.fontsize + " " + this.font);
    canvas.fillStyle = this.color;
    canvas.fillText(this.text, this.pos.x, this.pos.y);
  },

  added: function(canvas) {
    this.text = prompt("Write text");
  }
});
