function loadField(){

	fieldsLoader(function(err, fields){
		console.log(err || 'all fields loaded');
		if(err) return;

		var importedGridOptions = {
				width: fieldInfo.x,
				height: fieldInfo.y,
				fields: fields,
				timePassing: true
			};

		var winAspect = window.innerWidth / window.innerHeight,
			fieldAspect = importedGridOptions.width / importedGridOptions.height,
			wider = fieldAspect > winAspect,
			scale = wider ? window.innerWidth / importedGridOptions.width : window.innerHeight / importedGridOptions.height;

		var motionDisplay = new MotionDisplay({
			debugField: false,
			gridOptions: importedGridOptions,
			width: Math.floor(importedGridOptions.width * scale),
			height: Math.floor(importedGridOptions.height * scale),
			clipPath: clipPath
		});
		window.md = motionDisplay;
		
		document.body.appendChild(motionDisplay.canvas);

		motionDisplay.canvas.style.width = Math.floor(importedGridOptions.width * scale) + 'px';
		motionDisplay.canvas.style.height = Math.floor(importedGridOptions.height * scale) + 'px';

	});
}