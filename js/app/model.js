'use strict';

// Constructer function for each business
var business = function(data, index) {
	// first five major properties of business
	this.index = index;
	this.name = data.name;
	this.id = data.id;
	this.url = ko.observable(data.url);
	this.location = data.location.coordinate;
	// set address property
	if(data.location.address.length>0)
		this.address=data.location.address[0];
	else
		this.address='';
	
	/* filtered property is for deciding display or not when filtered */
	this.filtered = ko.observable(true);
	// nyt property to hold returned data from nytAPI
	this.nyt = ko.observable({
		url: '#',
		headline: '',
		para: 'New York Times article unavailable'
	});

	// next several properties for showing in yelp review section
	this.image_url = data.image_url;
	this.rating = data.rating;
	this.rating_img_url = data.rating_img_url;
	this.review_count = data.review_count;
	if(data.hasOwnProperty('snippet_image_url'))
		this.snippet_image_url = data.snippet_image_url;
	else
		this.snippet_image_url = 'images/yelplogo.jpg';
	if(data.hasOwnProperty('snippet_text'))
		this.snippet_text = data.snippet_text;
	else
		this.snippet_text = 'No yelp review is available. :(';

};
/* string fitler function: if any words in string1 could
be found in string2, the function returns true, otherwise
false. It is used in filter of the viewModel. */
function filterWithin(string1, string2){
	// create array of words from string1
	var words = string1.toLowerCase().split(' ');
	var found = false;
	for(var i=0; i<words.length; i++){
	// as soon as any word in string1 was found in string2
	// stop search and return
		if(string2.toLowerCase().indexOf(words[i])>-1){
			found = true;
			break;
		}
	}
	return found;
}