var τ = 2 * Math.PI,
	clipPaths = {},
	contaminatorSets = {},
	fieldInfos = {},
	fieldSettings = {
		defaults: {
			particleColor: 'rgb(255,255,255)',
			backgroundColor: 'rgb(0,0,0)',
			trailLength: 1,
			particleSpeed: 10,
			particleDensity: 0.05,
			particleMaxAge: 20,
			timeStep: 18 / 10
		}
	};