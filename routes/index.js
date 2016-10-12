const path = require("path");
const url = require("url");
const dbModel = require("../schemas/url-short.js")

module.exports = function(app) {
    
    app.get('/', (req, res) => {
    var root = path.parse(__dirname)
    res.sendFile(root.dir + '/public/home.html');
    })
    
    app.get('/new/:url(*)', (req, res) => {
        var par = (req.param('url'));
        
       dbModel.findOne({"url": par}, (err, url) => {
            if (err){
               return console.error(err);
            } 
            if (url) {
                res.send(JSON.stringify({
                    'original_url' : url.url,
                    'short_url' : url.urlId
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
                    'short_url' : record.urlId
                }))
            })
            
        })
    })
}
