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
	leafletTileUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    leafletTileAttribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';