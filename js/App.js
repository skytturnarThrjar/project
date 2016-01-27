 function ShowWhiteboardDrawing(id) {
 	app.clear()
	app.ShowDrawing(id);
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

		shape.startDrawing(startPos,self.canvasContext);
		startPos.log('drawing start');

		var drawing = function(e) {
			var pos = self.getEventPoint(e);

			shape.drawing(pos,self.canvasContext);

			self.redraw();
			shape.draw(self.canvasContext);
		};

		var drawingStop = function(e) {
			var pos = self.getEventPoint(e);

			shape.stopDrawing(pos,self.canvasContext);

			pos.log('drawing stop');

			self.shapes.push(shape);
			//console.log(shape);

			// Empty the redo array 
			self.undoShapes = [];
			shape.added(self.canvasContext);

			// Remove drawing and drawingStop functions from the mouse events
			self.canvas.off({
				mousemove:drawing,
				mouseup:drawingStop
			});

			self.redraw();
		};

		//console.log('shape', shape.name);
		if(shape.name === 'Textbox'){
			drawingStop(e);
		}
		// Add drawing and drawingStop functions to the mousemove and mouseup events
		self.canvas.on({	
			mousemove:drawing,
			mouseup:drawingStop
		});
		window.addEventListener('resize', CanvasResizeFunction, false);	

		function CanvasResizeFunction() {
			canvas.width = window.innerWidth;
   			canvas.height = window.innerHeight;
			self.redraw();
		}
	};

	self.mousedown = function(e) {
		if(self.shapeFactory !== null) {
			self.drawingStart(e);
		} else {
		}

		self.redraw();
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

	self.save = function() {
		var stringifiedArray = JSON.stringify(self.shapes);
			var param = { "user": "laufey14", // You should use your own username!
				"name": "JAA", //title,
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
					console.log("worked");
					self.loadDrawingList();
				},
				error: function (xhr, err) {
					// Something went wrong...
					console.log("nat");

				}
			});
	};

	self.loadDrawingList = function() {
		var stringifiedArray = JSON.stringify(self.shapes);
			var param = { "user": "laufey14", // You should use your own username!
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


					for( var i in data)
					{
   						str += '<li onclick="ShowWhiteboardDrawing('+  data[i].ID  +')" class="whiteboardTemplate">' + data[i].WhiteboardTitle+ '</li>';
					}
					str += '</li>';
					$("#drawingList").append(str);
					console.log(data);
				},
				error: function (xhr, err) {
					// Something went wrong...
					console.log("nat");

				}
			});
				

	};

	self.ShowDrawing = function ShowDrawing(id) {
		var stringifiedArray = JSON.stringify(self.shapes);
			var param = { "user": "laufey14", // You should use your own username!
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

						self.shapes.push(shape);
					}
					self.redraw();

				},
				error: function (xhr, err) {
					// Something went wrong...
					console.log("nat");

				}
			});
	};


	self.undo = function() {
		var undoShape = self.shapes.pop();
		self.undoShapes.push(undoShape);
		self.redraw();
	};

	self.redo = function() {
		if ( self.undoShapes.length > 0)
		{
			console.log("inní " + self.undoShapes);

			var redoShape = self.undoShapes.pop();
			self.shapes.push(redoShape);
			self.redraw();
		}
		console.log(self.undoShapes);
	};

	self.setColor = function(color) {
		self.color = color;
	};

		self.setWidth = function(width) {
		self.width = width;
	};

	self.setText = function(text){
		self.shapes[self.shapes.length - 1].text = text;
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


		// Set defaults
		self.color = '#ff0000';
		self.width = 1;
		// TODO: Set sensible defaults ...
	};

	self.init();
}

var app = null;
$(function() {
	// Wire up events
	app = new App('#canvas');

	app.loadDrawingList();
	
	$('#squarebutton').click(function(){app.shapeFactory = function() {
		return new Square();
	};});
	$('#circlebutton').click(function(){app.shapeFactory = function() {
		return new Circle();
	};});
	$('#linebutton').click(function(){ app.shapeFactory = function() {
		return new Line();
	};});
	$('#penbutton').click(function(){ app.shapeFactory = function() {
		return new Pen();
	};});
	$('#textbutton').click(function(){app.shapeFactory = function() {
	  return new Textbox($('#font').val(), $('#fontSize').val(), $('#fontStyle').val());
	};});
	$('#textbox').keyup(function(e){
		if(e.which === 13){
			app.setText($('#textbox').val());
			$('.textfield').hide();
			$('#textbox').val("");
		}
	});
	$('#clearbutton').click(function(){app.clear();});
	$('#undobutton').click(function(){app.undo();});
	$('#redobutton').click(function(){app.redo();});
	$('#savebutton').click(function(){app.save();});
	// $('#loadDrawingbutton').click(function(){app.loadDrawing();});
	$('#loadDrawingListbutton').click(function(){app.loadDrawingList();});
	$('#color').change(function(){app.setColor($(this).val());});
	$('#width').change(function(){app.setWidth($(this).val());});
	$("control_id").attr("checked",true);
	
    var checked = document.getElementById("penbutton");
    checked.click();

   
	
});
