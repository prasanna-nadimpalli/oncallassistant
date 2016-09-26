//app/models/oncall.js

//load Mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('OnCall', {
	incident:String,
	date:String,
	time:String,
	oncalldeveloper:String,
	opco:String,
	application:String,
	issuedescription:String,
	solution:String,
	followupactionrequired:String,
	mcdate:String,
	mctime:String,
	mcissue:String,
	mcsolution:String
});