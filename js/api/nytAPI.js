// nytimes api gets a search string and returns result obj
function callNYT(seaString, nytFunc){
    // object for holding returned data
    var result={
        url:'',
        headline:'',
        para:'',
        successSta: false
    };
    // new york times search string to pass to getJSON
    var nytString = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+seaString.replace(/ /g, '+')+'&api-key=2f15caa7408e9c930733fe8878fbfc30:5:68983884';
    $.ajax({
        'type': 'GET',
        'url': 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
        
        data: {
            'q': seaString,
            'response-format': 'jsonp',
            'api-key': '2f15caa7408e9c930733fe8878fbfc30:5:68983884',
            'callback': 'svc_search_v2_articlesearch'
        },
        success: function(data) {
            if(data.response.docs.length !== 0){
                result.url = data.response.docs[0].web_url;
                result.headline = data.response.docs[0].headline.main;
                result.para = data.response.docs[0].abstract;
                result.successSta = true;
            }
            // passed function object for data processing
            nytFunc(result);
        },
        error: function(){
            console.log('New York Times request failed.');
        }
    });
}