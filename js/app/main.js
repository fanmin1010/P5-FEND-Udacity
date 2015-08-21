var initApp = function(){
	callYelp('Washington square new york', '', dataAnalyze);
};


// function used to pass to yelpAPI to analyze returned data
var dataAnalyze = function(data){
	addToMarkerList(data);
	
};

initApp();