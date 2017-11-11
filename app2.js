var express = require('express');
var app = express();
var Youtube = require('youtube-node');
var youTube = new Youtube();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



var server = app.listen(3000, function(req,res){
    console.log("Express server has started on port 3000");
});

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
    newdata = JSON.stringify(result, null, 2);
    console.log(newdata);

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
    // res.render('results');
  });

app.get('/',function(req,res){
  res.render('search');
});
app.get('/results',function(req,res){
  // youTube.setKey('AIzaSyC5bwEuaf6FmJQGeQps5daPrY_3yg8Y2dc');
  //
  // var word = 'hello';
  // var limit = 5;
  // youTube.clearParams();
  // youTube.clearParts();
  // youTube.addParam('type', 'channel');
  // youTube.addParam('order', 'relevance');
  // youTube.addParam('videoCategoryId', '27');
  // youTube.addParam('regionCode', 'KR');
  // youTube.addParam('videoCaption','closedCaption');
  //
  // youTube.search(word, limit, function(err, result){
  //     if (err){
  //       console.log(err);
  //       return;
  //     }
  //     // console.log(JSON.stringify(result, null, 2));
  //     newdata = JSON.stringify(result, null, 2);
  //     console.log(newdata);
  //
  //     items = result['items'];
  //     for (var i in items){
  //       item = items[i];
  //       title = item['snippet']['title'];
  //       videoID = item['id']['videoId'];
  //       url = "https://www.youtube.com/watch?v=" + videoID;
  //       console.log("title: " + title);
  //       console.log("URL: " + url);
  //       console.log("--------");
  //     }
  //     res.render('results');
  //   });
});
