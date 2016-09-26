//js/controllers/main.js

angular.module('mcController', ['ngRoute'])
//Controller for landing page
.controller('mcmainController', function($scope, $http, $location,Excel,$timeout) {
	$scope.formData = {};
	$scope.master = {"application" : " ",
			"date" : " ",
			"mcdate" : " ",
			"followupactionrequired" : " ",
			"incident" : " ",
			"issuedescription" : " ",
			"mcissue" : " ",
			"oncalldeveloper" : " ",	
			"opco" : " ",
			"solution" : " ",
			"mcsolution" : " ",
			"time" : " ",
			"mctime" : " "};

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

	// route to desired page (using $location)
	$scope.getoncallTable = function(hash) {
		$location.path(hash);
	};

	// route to desired page (using $location)
	$scope.getnewentryForm = function(hash) {
		$location.path(hash);
	};

	// route to desired page (using $location and _id)
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

	// Export to excel
	$scope.exportToExcel=function(tableId){ // ex: '#my-table'
		var exportHref=Excel.tableToExcel(tableId,'sheet name');
		$timeout(function(){location.href=exportHref;},100); // trigger download
	}

	// custom predicate function for getting only on call entries and not messages
	$scope.greaterThan = function(prop, val){
		return function(item){
			return item[prop] > val;
		}
	}

	$scope.emptyOrNull = function(oncalls){
		return !(oncalls.mcissue === null || oncalls.mcissue.trim().length === 0)
	}
	$scope.reset();

	$scope.sortField = 'incident';
	$scope.reverse = true;

})
//Controller for edit form
.controller('mceditController', function($scope, $http, $location, $routeParams) {

	// when submitting the add form, send the entry to the node API
	$scope.updateOnCall = function(id) {
		$http.put('/api/oncalls/' + id, $scope.oncalleditData)
		.success(function(data) {			
			$scope.oncalleditData = data;		
			$location.path("/mclanding"); // once record is updated go back to main page
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// when landing on the page, get all on-call entries and show them
	$http.get('/api/oncalls')
	.success(function(data) {
		$scope.oncalls = data;
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

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
			$location.path("/mclanding"); // once record is deleted go back to main page
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
.controller('mcnewentryController', function($scope, $http, $location) {
	$scope.formData = {};
	$scope.master = {"application" : " ",
			"date" : " ",
			"mcdate" : " ",
			"followupactionrequired" : " ",
			"incident" : " ",
			"issuedescription" : " ",
			"mcissue" : " ",
			"oncalldeveloper" : " ",			
			"opco" : " ",
			"solution" : " ",
			"mcsolution" : " ",
			"time" : " ",
			"mctime" : " "};

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
			$location.path("/mclanding"); // once record is created go back to main page
		})
		.error(function(data) {
			console.log('Error: ' + data);
			$scope.updatestatus = "Failure in adding incident to On-call tracker";	
		});
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
	.when("/newentryform", {
		templateUrl: 'newentryform.html',
		controller: 'newentryController'			
	})
	.when("/mclanding", {
		templateUrl: 'mctable.html',
		controller: 'mcmainController'			
	}) // Edit page
	.when("/mceditform/:id", {
		templateUrl: 'mceditform.html',
		controller: 'mceditController'			
	})
	.when("/mcnewentryform", {
		templateUrl: 'mcnewentryform.html',
		controller: 'mcnewentryController'			
	})
	.otherwise({
		redirectTo:'oncalltable.html'
	});
})
;