const express = require("express");
const route = require("./routes");
const config = require("./config");
const db = require("./db");
const port = config.get('port');

const app = express();


route(app);


app.use(function(req, res) {
  res.status(404).send('Not found');
});

/*app.use(function(err, req, res, next) {
   if(app.get('env') === 'development') {
    
   } else {
     res.send(500)
   }
});*/

app.listen(process.env.PORT || port, () => {
  console.log('App listening on port 8080!');
});