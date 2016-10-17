const mongoose = require('mongoose');
const config = require("./config");
const dbConectParameter = config.get('db');
mongoose.connect(dbConectParameter);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;