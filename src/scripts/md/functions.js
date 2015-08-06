function fit(value, min, max, start, end) {
	value = Math.max(Math.min(value, max), min);
	var range1 = max - min,
		range2 = end - start;
	return (((value - min) / range1) * range2) + start;
}

function fitFactory(min, max, start, end){
	var range1 = max - min,
		range2 = end - start;
	return function quickfit(value){
		return (((Math.max(Math.min(value, max), min) - min) / range1) * range2) + start;
	};
}

function getSign(n){
	return n ? n < 0 ? -1 : 1 : 0;
}

function safePower(n, exp){
	return Math.pow(Math.abs(n), exp) * getSign(n);
}

function safeLog(n, base){
	return Math.log(Math.abs(n), base) * getSign(n);
}

function safeDeLog(n){
	return Math.pow(Math.E, Math.abs(n)) * getSign(n);
}

//interpolate
function ipl(a, b, t){
	return a * (1 - t) + b * t;
}

var contaminationColors = {
	Overstortput: 'yellow'
};

function getContaminatedColor(type){
	return contaminationColors[type];
}