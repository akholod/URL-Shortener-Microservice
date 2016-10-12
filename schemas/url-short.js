const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const db = require("../db.js");


var Schema = mongoose.Schema;
var urlSchema = new Schema({
    url: String,
    urlId: Number
})

autoIncrement.initialize(db);
urlSchema.plugin(autoIncrement.plugin, {
    model: 'Urls',
    field: 'urlId',
    startAt: 1100
});

module.exports = mongoose.model('Urls', urlSchema);