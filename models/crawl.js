'use strict';

let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

var CrawlSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        trim: true,
        ref: "User"
    },
    bars: {
        type: [Schema.Types.ObjectId],
        trim: true,
        ref: "Bar"
    },
    created: Date,
    rating: Number
});

module.exports = mongoose.model('Crawl', CrawlSchema);
