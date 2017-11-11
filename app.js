var express = require('express');
var app = express();
var Youtube = require('youtube-node');
var youTube = new Youtube();

var router = require('./router/main')(app);
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

youTube.setKey('AIzaSyC5bwEuaf6FmJQGeQps5daPrY_3yg8Y2dc');

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})

var word = '디즈니';
var limit = 1;

youTube.addParam('order', 'relevance');
// youTube.addParam('safeSearch', 'strict');
// youTube.addParam('videoDuration', 'long');
youTube.addParam('videoCategoryId', '27');
youTube.addParam('regionCode', 'KR');
youTube.addParam('type', 'video');
youTube.addParam('videoCaption','closedCaption');

youTube.search(word, limit, function(err, result){
  // youTube.clearParams();
  // youTube.clearParts();
  if (err){
    console.log(err);
    return;
  }
  else{

  }
  console.log(JSON.stringify(result, null, 2));

  var items = result['items'];
  for (var i in items){
    var item = items[i];
    var title = item['snippet']['title'];
    var videoID = item['id']['videoId'];

    var url = "https://www.youtube.com/watch?v=" + videoID;
    console.log("title: " + title);
    console.log("URL: " + url);
    console.log("--------");
  }
});
