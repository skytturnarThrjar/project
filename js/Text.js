var Textbox = Shape.extend({

//Það sem á eftir að gera við textann er að taka inn mismunandi font style, font size og font :) 
  constructor: function(pos, color) {
    this.base("Textbox", pos, color);
    this.text = " ";
    this.font = "Comic Sans MS";
    this.fontsize = "14pt";
  },

  draw: function(canvas) {
    canvas.font = (this.fontsize + " " + this.font);
    canvas.fillStyle = this.color;
    canvas.fillText(this.text, this.pos.x, this.pos.y);
  },

  added: function(canvas) {
    this.text = prompt("Write text");
  }
});
