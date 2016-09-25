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
			followupactionrequired:req.body.followupactionrequired,
			mcdate:req.body.mcdate,
			mctime:req.body.mctime,
			mconcalldeveloper:req.body.mconcalldeveloper,
			mcissue:req.body.mcissue,
			mcsolution:req.body.mcsolution
			
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
	app.delete('/api/oncalls/:id', function(req, res) {
		OnCall.remove({
			_id : req.params.id
		}, function(err, oncalls) {
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

	// update an on call entry by ID
	app.put('/api/oncalls/:id', function(req, res) {

		var update = req.body.date;
		var uptime = req.body.time;
		var uponcalldeveloper = req.body.oncalldeveloper;
		var upopco = req.body.opco;
		var upapplication = req.body.application;
		var upissuedescription = req.body.issuedescription;
		var upincident = req.body.incident;
		var upsolution = req.body.solution;
		var upfollowupactionrequired = req.body.followupactionrequired;   
		var upmcdate = req.body.mcdate;
		var upmctime = req.body.mctime;
		var upmconcalldeveloper = req.body.mconcalldeveloper;
		var upmcissue = req.body.mcissue;
		var upmcsolution = req.body.mcsolution;   

		OnCall.findOneAndUpdate({_id:req.params.id}, req.body, function (err, oncalls) {

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
	
	// retrieve an on call entry by ID
	app.get('/api/oncalls/:id', function(req, res) {

		// use mongoose to get on-call entry by id
		OnCall.findById(req.params.id, function (err, oncalls){

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

				res.json(oncalls); // return all on-call entries in JSON format
		});
	});
};
