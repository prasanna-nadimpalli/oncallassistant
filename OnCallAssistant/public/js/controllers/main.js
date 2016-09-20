//js/controllers/main.js

angular.module('oncallController', ['ngRoute'])

.controller('mainController', function($scope, $http, $location) {
	$scope.formData = {};
	$scope.master = {"date" : " ",
			"time" : " ",
			"oncalldeveloper" : " ",
			"opco" : " ",
			"application" : " ",
			"issuedescription" : " ",
			"incident" : " ",
			"solution" : " ",
			"followupactionrequired" : " "};

	// when landing on the page, get all on-call entries and show them
	$http.get('/api/oncalls')
	.success(function(data) {
		$scope.oncalls = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	// when submitting the add form, send the text to the node API
	$scope.createOnCall = function() {
		$http.post('/api/oncalls', $scope.formData)
		.success(function(data) {			
			$scope.formData = {}; // clear the form so  user is ready to enter another
			$scope.oncalls = data;		   
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// delete a on call entry after checking it
	$scope.deleteOnCall = function(id) {
		$http.delete('/api/oncalls/' + id)
		.success(function(data) {
			$scope.oncalls = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// get an on call entry for editing and route to edit page (using $location)
	$scope.getOnCall = function(id,hash) {
		$http.get('/api/oncalls/' + id)
		.success(function(data) {
			$scope.oncalledit = data;
			$location.path(hash);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// reset form values to blanks
	$scope.reset = function() {
		$scope.formData = angular.copy($scope.master);
	};

	// reset edit form values to blanks
	$scope.editreset = function() {
		$scope.editData = angular.copy($scope.master);
	};

	$scope.reset();

	$scope.sortField = 'incident';
	$scope.reverse = true;

}).config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: 'oncalltable.html',
		controller: 'mainController'			
	}) // Main HTML page
	.when("/editform", {
		templateUrl: 'oncalleditform.html',
		controller: 'mainController'			
	})
	.otherwise({
		redirectTo:'oncalltable.html'
	});
});

