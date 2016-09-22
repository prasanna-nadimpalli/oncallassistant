//js/controllers/main.js

angular.module('oncallController', ['ngRoute'])

.controller('mainController', function($scope, $http, $location) {
	$scope.formData = {};
	$scope.master = {"application" : " ",
			"date" : " ",
			"followupactionrequired" : " ",
			"incident" : " ",
			"issuedescription" : " ",
			"oncalldeveloper" : " ",
			"opco" : " ",
			"solution" : " ",
			"time" : " "};

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
			$scope.updatestatus = "Incident successfully added to On-call tracker";	
		})
		.error(function(data) {
			console.log('Error: ' + data);
			$scope.updatestatus = "Failure in adding incident to On-call tracker";	
		});
	};

	// route to edit page (using $location)
	$scope.getOnCall = function(id,hash) {
		$location.path(hash);
	};

	// reset form values to blanks
	$scope.reset = function() {
		$scope.formData = angular.copy($scope.master);
		$scope.updatestatus = " ";
	};

	// reset edit form values to blanks
	$scope.editreset = function() {
		$scope.editData = angular.copy($scope.master);
		$scope.updatestatus = " ";
	};

	$scope.reset();

	$scope.sortField = 'incident';
	$scope.reverse = true;

})
//Controller for edit form
.controller('editController', function($scope, $http, $location, $routeParams) {
	
	// when submitting the add form, send the entry to the node API
	$scope.updateOnCall = function(id) {
		$http.put('/api/oncalls/' + id, $scope.oncalleditData)
		.success(function(data) {			
			$scope.oncalleditData = data;		
			$location.path("/"); // once record is deleted go back to main page
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// invoked when edit view is loaded. 
	$http.get('/api/oncalls/' + $routeParams.id)
	.success(function(data) {
		$scope.oncalleditData = data;
		
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});
	
	// delete a on call entry 
	$scope.deleteOnCall = function(id) {
		$http.delete('/api/oncalls/' + id)
		.success(function(data) {
			$scope.oncalleditData = data;
			$location.path("/"); // once record is deleted go back to main page
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};
	
	// go back
	$scope.goback = function(hash) {
		$location.path(hash);
	};
	
})
//Angular Router logic
.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: 'oncalltable.html',
		controller: 'mainController'			
	}) // Edit page
	.when("/editform/:id", {
		templateUrl: 'oncalleditform.html',
		controller: 'editController'			
	})
	.otherwise({
		redirectTo:'oncalltable.html'
	});
});
