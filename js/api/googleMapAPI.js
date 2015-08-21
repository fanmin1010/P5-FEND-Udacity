'use strict';

var map;
var node = document.createElement('div');
node.innerHTML = '<p data-bind="text: $root.name"></p>';
var contentString = node;
var infowindow;

// Call back function for googleMap AJAX request
function initMap() {
	map = new google.maps.Map(document.getElementById("googleMap"),{
		// initiate map centering at WSQ of NY
		center: { lat: 40.730, lng: -73.997},
		zoom: 16
	});
	infowindow = new google.maps.InfoWindow({
		content: ''
	});
}

// all markers set up function
function setUpMarkers(busArray, markerArray){
	busArray.forEach(function(elem){
		// store location in a local var
		var loc = {
			lat: elem.location.latitude,
			lng: elem.location.longitude
		};
		// create a new marker for each element
		var marker = new google.maps.Marker({
			position: loc,
			map: map,
			title: elem.name
		});
		markerArray.push(marker);
		
	});

}

// function to set all markers to map
function setAllMarkers(markers, mapRef){
	//  set map of all markers in the array
	for(var i=0; i<markers.length; i++){
		markers[i].setMap(mapRef);
	}
}