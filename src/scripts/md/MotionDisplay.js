function MotionDisplay(options){
	var pixelRatio = window.devicePixelRatio || 1;

	this.grid = options.grid || new Grid(options.gridOptions || {});
	this.width = options.width || this.grid.width;
  	this.height = options.height || this.grid.height;
  	this.xScale = this.width * pixelRatio / this.grid.width;
  	this.yScale = this.height * pixelRatio / this.grid.height;
  	this.scale = ipl(this.xScale, this.yScale, 0.5);
  
	this.canvas = document.createElement('canvas');
	this.canvas.setAttribute('width', Math.floor(this.width * pixelRatio));
	this.canvas.setAttribute('height', Math.floor(this.height * pixelRatio));

	this.context = this.canvas.getContext('2d');
  	this.context.scale(this.xScale, this.yScale);
  	this.context.lineCap = 'round';
  	this.context.strokeStyle = 'white';
	this.context.lineWidth = (options.lineWidth || 1) / this.scale;
  	this.context.save();

	enrichContext(this.context);

	this.numParticles = options.numParticles || Math.min(0.1, 1) * this.grid.spawnArray.length / 2;
	this.background = options.background || 'rgba(0,0,0,0.06)';
	this.context.fillStyle = this.background;

	this.showFieldSpeed = options.showFieldSpeed ? true : options.showFieldSpeed === false ? false : true;

	if(options.clipPath){
		this.clipPath = options.clipPath;
		this.setClip();
	}

	if(options.debugField){
		return this.renderField();
	}

	if(options.contaminatorInfo && options.contaminatorInfo.contaminators.length){
		this.contaminatorInfo = options.contaminatorInfo;
		this.createContaminatorElements();
	}

	this.createParticles();

	var pauseOrResume = this.pauseOrResume = function(e){
		if(document.hidden){
			this.stop();
		} else {
			this.start();
		}
	}.bind(this);

	document.addEventListener('visibilitychange', pauseOrResume);

  this.timeStep = options.timeStep || 0.5;
	this.start();
}
(function(){
	this.createParticles = function(){
		var grid = this.grid,
			t = 0,
			l = this.numParticles,
			particles = this.particles = [],
			particle;

		this.contaminatedParticles = {};

		while(t++ < l){
			particle = new Particle({
				x: -1,
				y: -1,
				age: 1,
			});
			particle.step(grid);
			particles.push(particle);
		}
	};
	this.createContaminatorElements = function(){
		var scale = this.scale,
			container = document.createElement('div');

		container.style.width = this.width + 'px';
		container.style.height = this.height + 'px';
		container.className = 'contaminator-container';

		var xScale = this.xScale,
			yScale = this.yScale;

		if(window.devicePixelRatio){
			xScale /= devicePixelRatio;
			yScale /= devicePixelRatio;
			scale /= devicePixelRatio;
		}

		contaminators.forEach(function(contaminator){
			var contaminatorElement = document.createElement('div'),
				position = contaminator.position,
				size = contaminator.size * scale;

			contaminatorElement.className = 'contaminator overloop';
			contaminatorElement.style.left = position[0] * xScale - size / 2 + 'px';
			contaminatorElement.style.top = position[1] * yScale - size / 2 + 'px';
			contaminatorElement.style.width = size + 'px';
			contaminatorElement.style.height = size + 'px';
			container.appendChild(contaminatorElement);
		});

		this.container = container;
		document.body.appendChild(container); //todo move to init fun
	};
	this.start = function(){
		var motionDisplay = this;
		
		if(this.running) return;
		
		this.running = true;
		this.lastStep = Date.now();

		this.nextStep = setTimeout(function outerStep(){
			motionDisplay.step();

			if(motionDisplay.running) motionDisplay.nextStep = setTimeout(outerStep.bind(motionDisplay));
		});
	};
	this.stop = function(){
		this.running = false;
		clearTimeout(this.nextStep);
	};
	this.destroy = function(){
		this.stop();
		document.removeEventListener('visibilitychange', this.pauseOrResume);
	}
	this.step = function(){
		var grid = this.grid,
			ctx = this.context,
			newTime = Date.now(),
			dt = newTime - this.lastStep;
			//fade = 5; //this.fade || 0.96;

		this.lastStep = newTime;

		this.grid.step(dt / 1000 * this.timeStep);

		if(this.debugField){
			return this.renderField();
		}
				
		// var imageData = ctx.getImageData(0, 0, this.width * pixelRatio, this.height * pixelRatio),
		// 	data = imageData.data,
		// 	i = 0, l = data.length;

		// while(i < l){
		// 	if(data[i + 3]){
		// 		data[i] -= fade;// = Math.round(data[i] * fade);
		// 		data[i + 1] -= fade;// = Math.round(data[i + 1] * fade);
		// 		data[i + 2] -= fade;// = Math.round(data[i + 2] * fade);
		// 	}

		// 	i += 4;
		// }

		//ctx.putImageData(imageData, 0, 0);

		ctx.fillStyle = this.background;
		ctx.fillRect(0, 0, this.grid.width, this.grid.height);

		var i = 0,
			particles = this.particles,
			l = particles.length,
			contaminants, cJoined,
			p;

		ctx.beginPath();
		
		while(i < l){
			p = particles[i];

			if(this.contaminatorInfo){
				contaminants = grid.getContaminants(p.x, p.y);
				if(contaminants.length){
					p.contaminated = true;
					cJoined = contaminants.join(',');
					this.contaminatedParticles[cJoined] = this.contaminatedParticles[cJoined] || [];
					this.contaminatedParticles[cJoined].push(particles.splice(i, 1)[0]);
					l--;
					continue;
				}
			}


			ctx.moveTo(p.x, p.y);
			ctx.lineTo(p.x + p.dx, p.y + p.dy);

			p.step(grid);

			i++;
		}
    	ctx.strokeStyle = 'white';
		ctx.stroke();

		var contaminatedParticles = this.contaminatedParticles;

		Object.keys(contaminatedParticles).forEach(function(type){
			var cParticles = contaminatedParticles[type],
				i = 0, l = cParticles.length, p;
			
			ctx.beginPath();

			while(i < l){
				p = cParticles[i];

				ctx.moveTo(p.x, p.y);
				ctx.lineTo(p.x + p.dx, p.y + p.dy);

				p.step(grid);

				if(p.reset){
					particles.push(cParticles.splice(i, 1)[0]);
					l--;
					continue;
				}

				i++;
			}

			ctx.strokeStyle = getContaminatedColor(type);
			ctx.stroke();
		});

		// if(debugBorders){
		// 	ctx.beginPath();

		// 	debugBorders.forEach(function(line){
		// 		ctx.moveTo(line[0][0], line[0][1]);
		// 		ctx.lineTo(line[1][0], line[1][1]);
		// 	});

		// 	ctx.stroke();

		// 	this.running = false;
		// }
	};
  
	this.renderField = function(){
		var pt = Date.now(),
			grid = this.grid,
			ctx = this.context,
			xScale = this.xScale,
			yScale = this.yScale,
			TFloor = Math.floor(grid.T),
			meta  = grid.fields.meta,
			max = meta[grid.currentVariant + '-' + TFloor],
			max2 = meta[grid.currentVariant + '-' + (TFloor + 1 !== grid.variant.length ? TFloor + 1 : 0) ],
			imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
			width = imageData.width,
			data = imageData.data,
			x = 0, y = 0,
			v, idx = 0,
			angle, rgb,
			maxSpd;

		max = safeDeLog(max) - getSign(max);
		max2 = safeDeLog(max2) - getSign(max2);
		maxSpd = max && max2 ? Math.sqrt(Math.pow(ipl(max, max2, grid.t), 2) * 2) : defaults.motionDisplay.particleMaxSpeed;

		while(idx < data.length){
			y = Math.floor(idx / 4 / width);
			x = idx / 4 - y * width;

			if(data[idx + 3]){
				v = grid.getLocalV(x / xScale, y / yScale);
				angle = Math.atan2(v[1], v[0]);

				if(angle < 0) angle += τ;
				rgb = hslToRgb(angle / τ, 1, Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2)) / maxSpd / 2);

				data[idx] = rgb[0];
				data[idx + 1] = rgb[1];
				data[idx + 2] = rgb[2];				
				data[idx + 3] = 255;
			}

			idx += 4;
		}

		ctx.putImageData(imageData, 0, 0);
	};
	this.setClip = function(){
		polygons = this.clipPath;

		var holes = [],
			outerPaths = [],
			ctx = this.context,
			pixelRatio = window.devicePixelRatio || 1;
		
		ctx.clearRect(0, 0, this.width * pixelRatio, this.height * pixelRatio);

		polygons.forEach(function(polygon){
			var copy = polygon.slice();
			outerPaths.push(copy.shift());
			holes.push.apply(holes, copy);
		});

		ctx.beginPath();

		holes.forEach(drawPath);
		outerPaths.forEach(drawPath);

		ctx.clip();
		
		this.context.fill();
		
		return;

		function drawPath(path){
			ctx.moveTo(path[0][0], path[0][1]);

			path.slice(1).forEach(function(coordinates){
				ctx.lineTo(coordinates[0], coordinates[1]);
			});

			//move back to beginning
			ctx.lineTo(path[0][0], path[0][1]);
		}
	};
}).call(MotionDisplay.prototype);

function enrichContext(ctx){
	ctx.circle = function(x, y, radius){
		ctx.arc(x, y, radius, 0, τ, true);
	}
}