
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
$('#info-icon').click(function(){
  var introguide = introJs();

  introguide.setOptions({
    steps: [
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


// $('#info-icon').click(function(){
// 	var introguide = introJs();

//     introguide.setOptions({
//     steps: [
//         {
//           element: '#info-icon',
//           intro: '',
//           position: 'bottom'
//         },  
//     ]
//     })
//       		introguide.start();


// });


