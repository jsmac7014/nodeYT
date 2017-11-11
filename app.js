var http = require('http');
var ejs = require('ejs');
var fs = require('fs');


http.createServer((req,res)=>{
  fs.readFile('search.ejs','utf8',(error,data)=>{
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(ejs.render(data));
  })
}).listen(52273,()=>{
  console.log('Server Running at http://localhost:52273')
});
