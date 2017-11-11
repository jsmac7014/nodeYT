var Youtube = require('youtube-node');
var youTube = new Youtube();
youTube.setKey('AIzaSyC5bwEuaf6FmJQGeQps5daPrY_3yg8Y2dc');

var word = 'hello';
var limit = 5;

youTube.addParam('type', 'channel');
youTube.addParam('order', 'relevance');
youTube.addParam('videoCategoryId', '27');
youTube.addParam('regionCode', 'KR');
youTube.addParam('videoCaption','closedCaption');

youTube.search(word, limit, function(err, result){
    if (err){
      console.log(err);
      return;
    }
    // console.log(JSON.stringify(result, null, 2));
    // newdata = JSON.stringify(result, null, 2);
    // console.log(newdata);

    items = result['items'];
    for (var i in items){
      item = items[i];
      title = item['snippet']['title'];
      videoID = item['id']['videoId'];
      url = "https://www.youtube.com/watch?v=" + videoID;
      console.log("title: " + title);
      console.log("URL: " + url);
      console.log("--------");
    }
  });
