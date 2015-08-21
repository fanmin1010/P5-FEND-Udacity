function callYelp(place, target, dataFunc){

	var auth = {
	    //
	    // Details of Yelp OAuth2 keys
	    //
	    consumerKey : "u_w60HuR1KgN8hVGKlGBJg",
	    consumerSecret : "sUvuDARDrdcuGBWzeal33SSYTyE",
	    accessToken : "UPXiseWHJJHYYEzU4X06Y87N3zaTC55k",
	    
	    accessTokenSecret : "3FccWoBqGNG9cGjAqCY5QeLRNEY",
	    serviceProvider : {
	        signatureMethod : "HMAC-SHA1"
	    }
	};
	// passed argument place and target as location and searching terms
	var terms = target;
	var near = place;
	// Create accessor object required by OAuth methods
	var accessor = {
	    consumerSecret : auth.consumerSecret,
	    tokenSecret : auth.accessTokenSecret
	};
	// Create a parameters array to pass to message
	parameters = [];
	parameters.push(['term', terms]);
	parameters.push(['location', near]);
	parameters.push(['callback', 'cb']);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
	parameters.push(['oauth_token', auth.accessToken]);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
	// Create a message object to pass to OAuth's methods
	var message = {
	    'action' : 'http://api.yelp.com/v2/search',
	    'method' : 'GET',
	    'parameters' : parameters
	};

	OAuth.setTimestampAndNonce(message);
	OAuth.SignatureMethod.sign(message, accessor);
	// Get a parameterMao returned by OAuth method
	var parameterMap = OAuth.getParameterMap(message.parameters);
	$.ajax({
	    'url' : message.action,
	    'data' : parameterMap,
	    'dataType' : 'jsonp',
	    'cache': true,
	    'global': true,
	    'jsonpCallback': 'cb',
		'success' : function(data, textStats, XMLHttpRequest) {
			// passed function object for data processing
			dataFunc(data);
	    },
	    error: function(jqXHR, error, errorThrown){
	    	console.log('error');
            $('#yelpBusinesses').html('Yelp search content cannot be retrieved.<br>please check internet connection... T.T');
        }
	}).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('error');
        $('#yelpBusinesses').html('Yelp search content cannot be retrieved.<br>please check internet connection... T.T');
    });
    
}