// app/models/oncall.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('OnCall', {
    text : String,
    done : Boolean
});