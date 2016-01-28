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
    this.width = canvas.measureText(this.text).width + this.pos.y;
    this.height = this.pos.x - canvas.measureText(this.text).width;
    //console.log("width" + this.width);
    //console.log("height" + this.height);
    canvas.closePath();
  },
  selectedObj: function(m, n) {
    console.log("m" + m);
    console.log("n" + n);
    console.log(this.pos.x + " " + (this.pos.x + this.width ));
    console.log(this.pos.y + " " + (this.pos.y + this.height ));
    if(m > this.pos.y && m < (this.pos.y + this.width)) {
      console.log("BLABLAB");
      if(n > this.pos.x && n < (this.pos.x + this.height)) {
        console.log("hehehe");
        this.selectedObject = true;
      }
      if(n < this.pos.y && n > (this.pos.y + this.height)) {
        console.log("labababababababa");
      }
    }
  },
  moveObj: function(start, end) {
    var distX = start.x - end.x;
    var distY = start.y - end.y;
    this.pos.x = end.x;
    this.pos.y = end.y;
  }
});
