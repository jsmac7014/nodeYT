var express = require('express');
var bodyParser = require('body-parser');
var Youtube = require('youtube-node');
var youTube = new Youtube();
var app = express();


app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// server
var server = app.listen(80, function(req,res){
    console.log("Express server has started on port 3000");
});

// youtube api key
youTube.setKey('AIzaSyC5bwEuaf6FmJQGeQps5daPrY_3yg8Y2dc');

// youtube settings
var word;
var limit = 50;
youTube.addParam('type', 'video');
youTube.addParam('order', 'relevance');
youTube.addParam('videoCategoryId', '10');
youTube.addParam('regionCode', 'KR');
// youTube.addParam('pageToken','CAoQAA');
// youTube.addParam('videoCaption','closedCaption');

app.get('/',function(req,res){
  res.render('search',{
    title:"Search"
  });

});
app.post('/',function(req,res){
    word = req.body.searchbar;
    res.redirect('/results/' + word);
});
app.get('/results',function(req,res){
  res.redirect('/');

});
app.get('/results/:word',function(req,res){
  order = req.query.order
  word = req.params.word;  
  console.log('order: ' + req.query.order); 
  if(order == "relevance" || order =="rating" || order =="date" ||order == "title" || order =="videocount" || order =="viewcount"){
    youTube.addParam('order', order);
    search();    
  }
  else{
    youTube.addParam('order', 'relevance');
    search();
  }
  function search(){
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
        img = item['snippet']['thumbnails']['high']['url']
        videoID = item['id']['videoId'];
        url = "https://www.youtube.com/watch?v=" + videoID;
        // console.log("title: " + title);
        // console.log("YT URL: " + url);
        // console.log("IMG URL: " + img);        
        // console.log("--------");
      }
      res.render('results' , {
        'newdata' : newdata,
        title:'Results',
        'word':word,
      });
    });
  }

});

app.post('/results/:word',function(req,res){
  word = req.body.searchbar;
  res.redirect('/results/' + word);
});

// app.get('/results/:word/:order',function(req,res){

// });