function loadField(name, element){

	fieldsLoader(name, function(err, fields){
		console.log(err || 'all fields loaded');
		if(err) return;

		var importedGridOptions = {
				width: fieldInfo.x,
				height: fieldInfo.y,
				fields: fields,
				timePassing: true
			};

		var winAspect = element.innerWidth / element.innerHeight,
			fieldAspect = importedGridOptions.width / importedGridOptions.height,
			wider = fieldAspect > winAspect,
			scale = wider ? element.innerWidth / importedGridOptions.width : element.innerHeight / importedGridOptions.height;

		var motionDisplay = new MotionDisplay({
			debugField: false,
			gridOptions: importedGridOptions,
			width: Math.floor(importedGridOptions.width * scale),
			height: Math.floor(importedGridOptions.height * scale),
			clipPath: clipPath
		});
		
		element.appendChild(motionDisplay.container);
		element.appendChild(motionDisplay.canvas);

		motionDisplay.canvas.style.width = Math.floor(importedGridOptions.width * scale) + 'px';
		motionDisplay.canvas.style.height = Math.floor(importedGridOptions.height * scale) + 'px';

	});
}