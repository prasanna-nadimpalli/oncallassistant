//app/routes.js

//load the On Call model
var OnCall = require('./models/oncall');

//expose the routes to our app with module.exports
module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all on-call entries
	app.get('/api/oncalls', function(req, res) {

		// use mongoose to get all on-call entries in the database
		OnCall.find(function(err, oncalls) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

				res.json(oncalls); // return all on-call entries in JSON format
		});
	});

	// create on-call entries and send back all on-call entries after creation
	app.post('/api/oncalls', function(req, res) {

		// create a on call entry, information comes from AJAX request from Angular
		OnCall.create({
			date : req.body.date,
			time : req.body.time,
			oncalldeveloper:req.body.oncalldeveloper,
			opco:req.body.opco,
			application:req.body.application,
			issuedescription:req.body.issuedescription,
			incident:req.body.incident,
			solution:req.body.solution,
			followupactionrequired:req.body.followupactionrequired            
		}, function(err, oncalls) {
			if (err)
				res.send(err);

			// get and return all the on-call entries after you create another
			OnCall.find(function(err, oncalls) {
				if (err)
					res.send(err)
					res.json(oncalls);
			});
		});

	});

	// delete a on call entry
	app.delete('/api/oncalls/:oncall_id', function(req, res) {
		OnCall.remove({
			_id : req.params.oncall_id
		}, function(err, oncall) {
			if (err)
				res.send(err);

			// get and return all the on-call entry after you create another
			OnCall.find(function(err, oncalls) {
				if (err)
					res.send(err)
					res.json(oncalls);
			});
		});
	});

	// update an on call entry
	app.get('/api/oncalls/:id', function(req, res) {

		var upddate = req.body.date;
		var time = req.body.time;
		var oncalldeveloper = req.body.oncalldeveloper;
		var opco = req.body.opco;
		var application = req.body.application;
		var issuedescription = req.body.issuedescription;
		var incident = req.body.incident;
		var solution = req.body.solution;
		var followupactionrequired = req.body.followupactionrequired;   

		OnCall.findById(req.id, function (err, oncalls) {

			OnCall.update({
				_id : req.params.oncall_id
			}, function(err, oncall) {
				if (err)
					res.send(err);

				// get and return all the on-call entry after you create another
				OnCall.find(function(err, oncalls) {
					if (err)
						res.send(err)
						res.json(oncalls);
				});
			});
		});
	});
};
