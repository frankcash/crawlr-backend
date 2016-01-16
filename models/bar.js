let mongoose = require('mongoose');
let validator = require('validator');
let Schema = mongoose.Schema;

var BarSchema = new Schema({
  name: {
      type: String,
      trim: true
  },
  lat:{
    type: Number,
    trim: true
  },
  long:{
    type: Number,
    trim: true
  }
});


module.exports = mongoose.model('Bar', BarSchema);
