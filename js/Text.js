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
    canvas.beginPath();
    canvas.font = (this.fontstyle + " " + this.fontsize + " " + this.font);
    canvas.fillStyle = this.color;
    canvas.fillText(this.text, this.pos.x, this.pos.y);
    canvas.closePath();
  },

  added: function(canvas) {
    //CUSTOMIZEA PROMPT!! eða gera eins og kallinn okkar sagði :):)
    this.text = prompt("Write text");
  }
});
