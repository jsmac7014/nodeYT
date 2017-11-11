module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('search.ejs')
     });
     app.get('/results',function(req,res){
        res.render('results.ejs');
    });
}
