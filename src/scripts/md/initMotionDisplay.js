function loadField(name, element, cb){

	fieldsLoader(name, function(err, fields){
		var fieldInfo = fieldInfos[name],
			settings = fieldSettings[name] || fieldSettings.defaults;

		if(err){
			console.log('error loading fields: ', err.message ? err.message : err);
			return;
		}

		var importedGridOptions = {
				width: fieldInfo.x,
				height: fieldInfo.y,
				fields: fields,
				timePassing: true,
				contaminatorInfo: contaminatorSets[name],
				particleSpeed: settings.particleSpeed,
				particleMaxAge: settings.particleMaxAge,
				spawnArray: spawnArrays[name],
				contaminants: contaminants[name]
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
			bounds: fieldInfo.bounds,
			clipPath: clipPaths[name],
			contaminatorInfo: contaminatorSets[name],
			particleColor: settings.particleColor,
			particleDensity: settings.particleDensity,
			lineWidth: settings.particleSize,
			backgroundColor: settings.backgroundColor,
			trailLength: settings.trailLength,
			timeStep: settings.timeStep,
			minFPS: settings.minFPS
		});
		
		motionDisplay.container && element.appendChild(motionDisplay.container);
		element.appendChild(motionDisplay.canvas);

		spawnArrays[name] = motionDisplay.grid.spawnArray;
		contaminants[name] = motionDisplay.grid.contaminants;

		motionDisplay.canvas.style.width = Math.floor(importedGridOptions.width * scale) + 'px';
		motionDisplay.canvas.style.height = Math.floor(importedGridOptions.height * scale) + 'px';

		cb(motionDisplay);
	});
}