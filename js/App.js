var movebuttonClicked = false;
var erasebuttonClicked = false;

function RemoveAndAddClasses(buttonAddClass) {
	$("#penbutton").removeClass("iconActive");
	$('#textbutton').removeClass("iconActive");
	$('#squarebutton').removeClass("iconActive");
	$('#circlebutton').removeClass("iconActive");
	$('#linebutton').removeClass("iconActive");
	$('#spraybutton').removeClass("iconActive");
	$('#clearbutton').removeClass("iconActive");
	$('#undobutton').removeClass("iconActive");
	$('#redobutton').removeClass("iconActive");
	$('#savebutton').removeClass("iconActive");
	$('#movebutton').removeClass("iconActive");
	$('#erasebutton').removeClass("iconActive");

	$(buttonAddClass).addClass("iconActive");
}

function ShowWhiteboardDrawing(id) {
 	app.clear();
	app.ShowDrawing(id);
}

function update(jscolor) {
  // 'jscolor' instance can be used as a string
  app.setColor(jscolor);
}

function App(canvasSelector) {
	canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
	var self = this;

	self.getEventPoint = function(e) {
		return new Point(e.pageX - self.canvasOffset.x,e.pageY - self.canvasOffset.y);
	};

	self.drawingStart = function(e) {
		var startPos = self.getEventPoint(e);
		var shape = self.shapeFactory();
		shape.pos = startPos;
		shape.color = self.color;
		shape.width = self.width;
		shape.fontStyle = self.fontStyle;
		shape.fontSize = self.fontSize;
		shape.font = self.font;

		shape.startDrawing(startPos,self.canvasContext);

		var drawing = function(e) {
			var pos = self.getEventPoint(e);
			shape.drawing(pos,self.canvasContext);
			self.redraw();
			shape.draw(self.canvasContext);
		};

		var drawingStop = function(e) {
			var pos = self.getEventPoint(e);
			shape.stopDrawing(pos,self.canvasContext);
			self.shapes.push(shape);
			shape.added(self.canvasContext);
			// Empty the redo array
			self.undoShapes = [];
			self.undoerasedShapes = [];
			self.erasedShapes = [];
			// Remove drawing and drawingStop functions from the mouse events
			self.canvas.off({
				mousemove:drawing,
				mouseup:drawingStop
			});
			self.redraw();
		};

		// Add drawing and drawingStop functions to the mousemove and mouseup events
		self.canvas.on({
			mousemove:drawing,
			mouseup:drawingStop
		});

		if(shape.name === 'Textbox'){
			drawing(e);
			drawingStop(e);
		}

		//resize the canvas on window resize
		window.addEventListener('resize', CanvasResizeFunction, false);

		function CanvasResizeFunction() {
			canvas.width = window.innerWidth;
   		canvas.height = window.innerHeight;
			self.redraw();
		}
	};

	self.mousedown = function(e) {
		var allinputs = document.getElementsByTagName('input');
		//Array of all the buttons except the move button
		var buttons = new Array();
		for(var i = 0; i < allinputs.length; i++) {
			if(allinputs[i].type === 'image' && allinputs[i].id !== 'movebutton') {
				buttons.push(allinputs[i]);
			}
		}
		document.getElementById('movebutton').onclick = function() {
      document.getElementById('canvas').style.cursor = "move";
			movebuttonClicked = true;
		};

		document.getElementById('erasebutton').onclick = function() {
      document.getElementById('canvas').style.cursor = "erase";
			erasebuttonClicked = true;
		};

		for(var j = 0; j < buttons.length; j++) {
			$(buttons[j]).click(function () {
       	document.getElementById('canvas').style.cursor = "default";
				movebuttonClicked = false;
				erasebuttonClicked = false;
			});
		}

    document.getElementById('toolbar').onclick = function() {
			$('#textbox').val("");
			$('.textfield').hide();
    };
    document.getElementById('font').onclick = function() {
      $('#textbox').val("");
      $('.textfield').hide();
    };
    document.getElementById('fontSize').onclick = function() {
      $('#textbox').val("");
      $('.textfield').hide();
    };

		if(self.shapeFactory !== null) {
			if(movebuttonClicked === true) {
				self.move(e);
			}
			else if(erasebuttonClicked === true) {
				self.eraser(e);
			}
			else {
				self.drawingStart(e);
			}
		}

		self.redraw();
	};

	self.move = function(e) {
		var hnit = self.getEventPoint(e);
		for(var i = self.shapes.length - 1; i >= 0; i--) {
			self.shapes[i].selectedObj(hnit.x, hnit.y, self.canvasContext);
			if(self.shapes[i].selectedObject) {
				var sh = self.shapes[i];
				var moveObj = function(e) {
					var pos = self.getEventPoint(e);
					sh.moveObj(hnit, pos, self.canvasContext);
					hnit = pos;
					self.redraw();
					sh.selectedFill(self.canvasContext);
				};

				var moveStop = function(e) {
					var pos = self.getEventPoint(e);
					self.canvas.off({
						mousemove:moveObj,
						mouseup:moveStop
					});
					self.redraw();
				};

				self.redraw();
				self.shapes[i].selectedObject = false;
				break;
			}
		}

		self.canvas.on({
			mousemove:moveObj,
			mouseup:moveStop
		});
	};

	self.eraser = function(e) {
		var hnitt = self.getEventPoint(e);
			for(var i = self.shapes.length - 1; i >= 0; i--) {
				self.shapes[i].selectedObj(hnitt.x, hnitt.y, self.canvasContext);
				if(self.shapes[i].selectedObject) {
					var sh = i;
					break;
				};
			};

		self.erasedShapes.push(self.shapes[sh]);
		tempShapes = new Array();
		for(var i = 0; i <= self.shapes.length-1; i++) {
			if (i !== sh) {
				tempShapes.push(self.shapes[i]);
			};
		};
		app.shapes = [];
		self.shapes = tempShapes;
		self.redraw ();
	};

	self.redraw = function() {
		self.canvasContext.clearRect(0, 0, self.canvasContext.canvas.width, self.canvasContext.canvas.height);
		for(var i = 0; i < self.shapes.length; i++) {
			self.shapes[i].draw(self.canvasContext);
		}
	};

	self.clear = function() {
		self.shapes = [];
		self.redraw();
	};

	self.save = function(name) {
		var stringifiedArray = JSON.stringify(self.shapes);
		var param = { "user": "vala14", // You should use your own username!
			"name": name, //title,
			"content": stringifiedArray,
			"template": true
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/Save",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				// The save was successful...
				self.loadDrawingList();
			},
			error: function (xhr, err) {
				// Something went wrong...

			}
		});
	};

	self.loadDrawingList = function() {
		var stringifiedArray = JSON.stringify(self.shapes);
		var param = { "user": "vala14", // You should use your own username!
			"content": stringifiedArray,
			"template": true
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/GetList",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				var str = "<li '>";
				$('#drawingList li').remove();
				for( var i in data) {
					str += '<li onclick="ShowWhiteboardDrawing('+  data[i].ID  +')" class="whiteboardTemplate">' + data[i].WhiteboardTitle+ '</li>';
				}
				str += '</li>';
				$("#drawingList").append(str);
			},
			error: function (xhr, err) {
				// Something went wrong...
			}
		});
	};

	self.ShowDrawing = function ShowDrawing(id) {
		var stringifiedArray = JSON.stringify(self.shapes);
		var param = { "user": "vala14", // You should use your own username!
				"id" : id // ekki harðkóða
		};

		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "http://whiteboard.apphb.com/Home/GetWhiteboard",
			data: param,
			dataType: "jsonp",
			crossDomain: true,
			success: function (data) {
				var WhiteboardContents = JSON.parse(data.WhiteboardContents);
				for(var i = 0; i < WhiteboardContents.length; i++) {
					var shape = eval('new ' + WhiteboardContents[i].name + '();');

					shape.pos = WhiteboardContents[i].pos;
					shape.size = WhiteboardContents[i].size;
					shape.color = WhiteboardContents[i].color;
					shape.startX = WhiteboardContents[i].startX;
					shape.startY = WhiteboardContents[i].startY;
					shape.drawlineX = WhiteboardContents[i].drawlineX;
					shape.drawlineY = WhiteboardContents[i].drawlineY;
					shape.radius = WhiteboardContents[i].radius;
					shape.width = WhiteboardContents[i].width;
					shape.text = WhiteboardContents[i].text;
    			shape.fontSize = WhiteboardContents[i].fontSize;
    			shape.font = WhiteboardContents[i].font;
    			shape.fontStyle = WhiteboardContents[i].fontStyle;

					self.shapes.push(shape);
				}
				self.redraw();
			},
			error: function (xhr, err) {
				// Something went wrong...
			}
		});
	};

	self.undo = function() {
		var undoShape
		if(self.erasedShapes.length > 0) {
			undoShape = self.erasedShapes.pop();
			self.shapes.push(undoShape);
			self.undoerasedShapes.push(undoShape);
		}
		else {
			undoShape = self.shapes.pop();
			self.undoShapes.push(undoShape);
		}
		self.redraw();
	};

	self.redo = function() {
		var redoShape;
		if(self.undoerasedShapes.length > 0) {
			redoShape = self.undoerasedShapes.pop();
			redoShape = self.shapes.pop();
			self.erasedShapes.push(redoShape);
		}
		else if(self.undoShapes.length > 0) {
			redoShape = self.undoShapes.pop();
			self.shapes.push(redoShape);
		}
		self.redraw();
	};

	self.setColor = function(color) {
		self.color = '#' + color;
	};

	self.setWidth = function(width) {
		self.width = width;
	};

	self.setText = function(text) {
		self.shapes[self.shapes.length - 1].text = text;
		self.redraw();
	};

	self.setFontsize = function(fontsize) {
    self.fontSize = fontsize ;
    self.redraw();
	};
	self.setFont = function(font) {
    self.font = font ;
    self.redraw();
	};

	self.setFontStyle = function(fontStyle) {
    self.fontStyle = fontStyle ;
    self.redraw();
	};

	self.init = function() {
		// Initialize App
		self.canvas = $(canvasSelector);
		self.canvasOffset = new Point(self.canvas.offset().left,self.canvas.offset().top);
		self.canvas.on({
			mousedown:self.mousedown
		});
		self.shapeFactory = null;
		self.canvasContext = canvas.getContext("2d");
		self.shapes = new Array();
		self.undoShapes = new Array();
		self.erasedShapes = new Array();
		self.undoerasedShapes = new Array();
		// Set defaults
		self.color = '#69BFD9';
		self.width = 2;
  	self.fontsize = "12";
  	self.font = "Arial"
  	self.fontStyle = "Normal"
	};
	self.init();
}

var app = null;
$(function() {
	// Wire up events
	app = new App('#canvas');
	app.loadDrawingList();

	$('#squarebutton').click(function() {
		RemoveAndAddClasses('#squarebutton');
  	app.shapeFactory = function() {
			return new Square();
		};
	});
	$('#circlebutton').click(function() {
		RemoveAndAddClasses('#circlebutton');
		app.shapeFactory = function() {
			return new Circle();
		};
	});
	$('#linebutton').click(function() {
		RemoveAndAddClasses('#linebutton');
		app.shapeFactory = function() {
			return new Line();
		};
	});
	$('#penbutton').click(function() {
		RemoveAndAddClasses('#penbutton');
		app.shapeFactory = function() {
			return new Pen();
		};
	});
	$('#textbutton').click(function() {
		RemoveAndAddClasses('#textbutton');
		app.shapeFactory = function() {
			app.setFontsize($('#fontSize').val());
			app.setFont($('#font').val());
			app.setFontStyle($('#fontStyle').val());
			return new Textbox();
			};
	});
	$('#spraybutton').click(function() {
		RemoveAndAddClasses('#spraybutton');
		app.shapeFactory = function() {
			return new Spray();
		};
	});
	$('#textbox').keyup(function(e){
    if(e.which === 13){
			if($('#textbox').val().length !== 0) {
				app.setText($('#textbox').val());
				$('.textfield').hide();
				$('#textbox').val("");
			}
		}
	});
	$('#clearbutton').click(function(){
		RemoveAndAddClasses('#clearbutton');
		app.clear();
	});

	$('#undobutton').click(function(){
		RemoveAndAddClasses('#undobutton');
		app.undo();
	});

	$('#redobutton').click(function(){
		RemoveAndAddClasses('#redobutton');
		app.redo();
	});

	$('#savebutton').click(function(){
		RemoveAndAddClasses('#savebutton');
		app.save(document.getElementById('SaveDrawingTitle').value);
	});

	$('#movebutton').click(function(){
 		RemoveAndAddClasses('#movebutton');
 	});

	$('#erasebutton').click(function(){
		RemoveAndAddClasses('#erasebutton');
 	});

	$('#color').change(function(){app.setColor($(this).val());});
	$('#width').change(function(){app.setWidth($(this).val());});
	$("control_id").attr("checked",true);

  var checked = document.getElementById("penbutton");
  checked.click();
	$('#info-icon').click(function(){
		var introguide = introJs();
		introguide.setOptions({
			steps:[
			    {
			      element: '.icon',
			      intro: '',
			      position: 'bottom'
			    },
			    {
			    	element: '#info-icon',
			      intro: '',
			      position: 'bottom'
			    },
			]
		});
		introguide.start();
	});
});
