var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Youtube = require('youtube-node');
var youTube = new Youtube();

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var server = app.listen(3000, function(req,res){
    console.log("Express server has started on port 3000");
});

youTube.setKey('AIzaSyC5bwEuaf6FmJQGeQps5daPrY_3yg8Y2dc');

var word = '';
var limit = 10;
youTube.addParam('type', 'video');
youTube.addParam('order', 'relevance');
// youTube.addParam('videoCategoryId', '27');
// youTube.addParam('regionCode', 'KR');
// youTube.addParam('videoCaption','closedCaption');

app.get('/',function(req,res){
  res.render('search');
});
// app.get('/results/',function(req,res){
//
// });
app.get('/results/:word',function(req,res){
  var word = req.params.word
  youTube.search(word, limit, function(err, result){
      if (err){
        console.log(err);
        return;
      }
      // console.log(JSON.stringify(result, null, 2));
      newdata = result;
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
      res.render('results' , {
        'newdata' : newdata,
      });
    });
});
