function fieldsLoader(cb){
	var fields = {},
    	canvas = document.createElement('canvas'),
    	width = canvas.width = fieldInfo.x,
    	height = canvas.height = fieldInfo.y,
    	ctx = canvas.getContext('2d'),
    	fieldFilenames = Object.keys(fieldInfo.meta),
    	total = fieldFilenames.length,
    	done = 0;

  Object.defineProperty(fields, 'meta', { value: fieldInfo.meta });

	fieldFilenames.forEach(function(filename){
		var filenameSplit = filename.split('-'),
  			variant = filenameSplit[0],
  			T = +filenameSplit[1],
  			img = new Image(),
        nullValue = (variant === 'avg' && T === 0) ? NaN : 0; // this is for creating spawnArray from first field

		fields[variant] = fields[variant] || [];

		img.src = '/views/' + fieldInfo.diskName + '/' + filename + '.png';

	    img.onerror = function(err){
	      cb(new Error('image failed to load: ' + '/views/' + fieldInfo.diskName + '/' + filename + '.png'));
	      cb = function(){};
	    }

		img.onload = setTimeout.bind(window, function(){
		 	var max = fields.meta[filename],
  		 		fitBack = fitFactory(1, 255, -max, max),
  		 		field = new Float32Array(width * height * 2);

		 	ctx.drawImage(img, 0, 0, width, height);

		 	var imageData = ctx.getImageData(0, 0, width, height),
  		 		buffer = imageData.data,
  		 		length = buffer.length,
  		 		i = 0, r, g;

		 	while(i < length){
		 		if(buffer[i]){
		 			r = fitBack(buffer[i]);
		 			g = fitBack(buffer[i + 1]);

		 			field[i / 2] = safeDeLog(r) - getSign(r); // remove one because log/delogging creates artifacts below 1
		 			field[i / 2 + 1] = safeDeLog(g) - getSign(g); // and one has been added before to prevent this
		 		}

		 		else{
		 			field[i / 2] = nullValue;
		 			field[i / 2 + 1] = nullValue;
		 		}

		 		i += 4;
		 	}

		 	fields[variant][T] = field;

		 	done++;
		 	if(done === total) cb(null, fields);
		});
	});
}