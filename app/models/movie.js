var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// This is our model
var MovieSchema   = new Schema({
    name: String,
    year: Number
});

// Exporting the only model we have 
module.exports = mongoose.model('Movie', MovieSchema);