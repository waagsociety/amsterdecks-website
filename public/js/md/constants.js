var τ = 2 * Math.PI,
	clipPaths = {},
	contaminatorSets = {},
	fieldInfos = {},
	fieldSettings = {
		defaults: {
			particleColor: 'rgb(255,255,255)',
			backgroundColor: 'rgb(16,32,64)',
			trailLength: 0.5,
			particleSpeed: 10,
			particleDensity: 0.05,
			particleMaxAge: 1000,
			timeStep: 18
		}
	};