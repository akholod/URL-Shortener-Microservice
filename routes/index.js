const path = require("path");
const url = require("url");
const dbModel = require("../schemas/url-short.js")

module.exports = function(app) {
    
    app.get('/', (req, res) => {
        var root = path.parse(__dirname)
        res.sendFile(root.dir + '/public/home.html');
    })
    
    app.get('/new/:url(*)', (req, res) => {
        var fullUrl = req.protocol + '://' + req.get('host') + '/';
        var par = (req.param('url'));
        
        if(par.search(/^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?/) == -1) {
            res.end(JSON.stringify({"Error":"Incorect url format or adress, please pass corect url"}));
            return console.log('error');
        }
        
       dbModel.findOne({"url": par}, (err, url) => {
            if (err){
               return console.error(err);
            } 
            if (url) {
                res.send(JSON.stringify({
                    'original_url' : url.url,
                    'short_url' : fullUrl + url.urlId
                }))
                return
            } 
            
            var record = new dbModel({
                url: par
            })
            record.save((err) => {
                if(err) {
                    console.log(err + ' DB error')
                }
                res.send(JSON.stringify({
                    'original_url' : record.url,
                    'short_url' : fullUrl + record.urlId
                }))
            })
            
        })
    })
    
    app.get('/:shortUrl(*)', (req, res) => {
        var par = (req.param('shortUrl'));
        if(isNaN(par)) {
            res.end(JSON.stringify({"Error":"Incorect short url"}));
            return console.error(par + ' is NaN');
        }
        dbModel.findOne({'urlId' : par} , (err, url) => {
            if (err){
               return console.error(err);
            } 
            if (url) {
                res.redirect(url.url)
            } else {
                res.end(JSON.stringify({"Error":"No such short url in database, please pass existing short url"}));
            }
        })
    })
}
