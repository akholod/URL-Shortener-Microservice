const mongoose = require('mongoose');
mongoose.connect('mongodb://akholod:3v1a6l0e0r2a@ds011785.mlab.com:11785/fcc');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;