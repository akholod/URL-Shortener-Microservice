const path = require("path");

module.exports = function(app) {
    app.get('/', (req, res) => {
    var root = path.parse(__dirname)
    res.sendFile(root.dir + '/public/home.html');
    })
}