// viewModel javascript

var viewModel = function() {
	var self = this;
	this.name = 'view';
	self.businesses = ko.observableArray([]);
	self.markerList = [];
	// currentBus for info window update
	self.currentBus = ko.observable(null);
	var addToBusinesses=function(data){
		console.log(data);
		// add returned data to businesses array
		for(var i=0; i<data.businesses.length; i++){
			self.businesses.push(new business(data.businesses[i], i));
		}
		// add marker to the map by calling setUpMarker
		setUpMarkers(self.businesses(), self.markerList);
		// add listener to click for all markers
		self.markerList.forEach(function(elem, i){
			elem.addListener('click', function(){
				// bind setCurrent func with each marker
				self.setCurrent.apply(self.businesses()[i], []);
			});
		});
		
		//console.log(self.markerList);
	};
	callYelp('new york washington square park', '', addToBusinesses);
	// when business is clicked, update currentBus
	self.setCurrent = function() {
		// onclick of list, hide the list view of yelpBusinesses
		$('#hamBtn').html('<i class="fa fa-bars"></i>');
		$('#yelpBusinesses').css('display', 'none');

		// onclick clear all mark animations and set current one
		for(var j=0; j<self.markerList.length; j++){
			self.markerList[j].setAnimation(null);
		}
		self.markerList[this.index].setAnimation(google.maps.Animation.BOUNCE);

		// pass this object to set currentBus observable
		self.currentBus(this);

		// for new york times query
		var seaString = this.name+' new york';
		callNYT(seaString, function(obj){
			// render when articles are returned from nyt
			if(obj.successSta === true){
				self.currentBus().nyt(obj);
			}
			window.infowindow.setContent($('#placeTmpl').html());
		});
		
		window.infowindow.setContent($('#placeTmpl').html());
		// open up infowindow after setting currentBus
		infowindow.open(map, self.markerList[this.index]);

	};
	// filterMarkers func filters markers based on input
	self.filterMarkers = function(){
		// on filter, make list-view of yelpBusinesses block
		$('#hamBtn').html('<i class="fa fa-times"></i>');
		$('#yelpBusinesses').css('display', 'block');

		var filterStr = $('#searchBar').val();
		self.businesses().forEach(function(elem, i){
			// string to filter within
			var fullStr = elem.name + ' ' +elem.address;
			if(!filterWithin(filterStr, fullStr)){
				// remove from the list and its marker
				elem.filtered(false);
				self.markerList[elem.index].setMap(null);
			}
			else{
				// put the elem back to list and its marker
				elem.filtered(true);
				self.markerList[elem.index].setMap(map);
			}
		});
	};
	self.newSearch = function(){
		// get new search term from search bar
		var searchTerms = $('#searchBar').val();
		// clear old business list
		self.businesses([]);
		// remove all the old markders
		setAllMarkers(self.markerList, null);
		// delete all old marker references
		self.markerList = [];
		callYelp('new york washington square park', searchTerms, addToBusinesses);
	};
	
};

// bind viewModel with the view(html)
ko.applyBindings(new viewModel());