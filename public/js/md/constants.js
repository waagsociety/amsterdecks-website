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
			particleMaxAge: 100,
			timeStep: 18 / 10
		}
	},
	spawnArrays = {},
	contaminants = {},
	leafletTileUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    leafletTileAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';