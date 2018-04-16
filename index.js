function start(query) {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': 'AIzaSyDO6ZTDyfrnrcUz1wmrXHVcLFE9fHBOTgw',
    // clientId and scope are optional if auth is not required.
    
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.request({
      'path': 'https://www.googleapis.com/youtube/v3/search',
      'params': {
          'part':'snippet',
          'q':query,
          'accessToken':'AIzaSyDO6ZTDyfrnrcUz1wmrXHVcLFE9fHBOTgw'
      }
    })
  }).then(function(response) {
    //let obj = JSON.parse(response);
    //let response1 = response.items[1];
    response.result.items.map(function (item, index, array) {
        //$('.response').append(`<a href=\'https://www.youtube.com/watch?v=${item.id.videoId}\'><img src=\'${item.snippet.thumbnails.medium.url}\'></a><br>`);
        $('main').prop('hidden',false);
        $('.response').append(`<a class=\'video-${index}' href=\'https://www.youtube.com/watch?v=${item.id.videoId}\'><img src=\'${item.snippet.thumbnails.medium.url}\'></a><br>`);
        $('.video-' + index).colorbox({
            href:`https://www.youtube.com/watch?v=${item.id.videoId}&accessToken=AIzaSyDO6ZTDyfrnrcUz1wmrXHVcLFE9fHBOTgw`,
            
        });
    });
    $('main').append(`${response.length} items`);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};
// 1. Load the JavaScript client library.
gapi.load('client',start);

function youtubeSearch(query) {
    $.ajax({
        method: "GET",
        url: "https://www.googleapis.com/youtube/v3/search",
        data: {
                part: 'snippet', 
                key: 'AIzaSyDO6ZTDyfrnrcUz1wmrXHVcLFE9fHBOTgw',
                q: query 
            },
        dataType: 'jsonp'
    }).done(function(response) {
        console.log(response);
        //let response1 = response.items[1];
        response.items.map(function (item, index, array) {
            $('main').prop('hidden',false);
            $('.response').append(`<a class=\'video-${index}' href=\'https://www.youtube.com/watch?v=${item.id.videoId}\'><img src=\'${item.snippet.thumbnails.medium.url}\'></a><br>`);
            $('.video-' + index).colorbox({
                href:`https://www.youtube.com/watch?v=${item.id.videoId}`
            });

        });
        $('main').append(`${response.length} items`);
    });
}

$('.submit-button').on('click', function(event) {
    event.preventDefault();
    $('.response').html("");
    const query = $('.search-input').val();
    console.log("QUERY: " + query);
    //youtubeSearch(query);
    start(query);
    
})