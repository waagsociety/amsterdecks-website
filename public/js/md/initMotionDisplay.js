function loadField(name, element, cb){

	fieldsLoader(name, function(err, fields){
		if(err){
			console.log('error loading fields: ', err.message ? err.message : err);
			return;
		}

		var importedGridOptions = {
				width: fieldInfo.x,
				height: fieldInfo.y,
				fields: fields,
				timePassing: true,
				contaminatorInfo: contaminatorSets[name]
			};

		var width = $(element).innerWidth(),
			height = $(element).innerHeight(),
			aspect = width / height,
			fieldAspect = importedGridOptions.width / importedGridOptions.height,
			wider = fieldAspect > aspect,
			scale = !wider ? width / importedGridOptions.width : height / importedGridOptions.height;

		var motionDisplay = new MotionDisplay({
			debugField: false,
			gridOptions: importedGridOptions,
			width: Math.floor(importedGridOptions.width * scale),
			height: Math.floor(importedGridOptions.height * scale),
			clipPath: clipPaths[name],
			contaminatorInfo: contaminatorSets[name]
		});
		
		motionDisplay.container && element.appendChild(motionDisplay.container);
		element.appendChild(motionDisplay.canvas);

		motionDisplay.canvas.style.width = Math.floor(importedGridOptions.width * scale) + 'px';
		motionDisplay.canvas.style.height = Math.floor(importedGridOptions.height * scale) + 'px';

		cb(motionDisplay);
	});
}