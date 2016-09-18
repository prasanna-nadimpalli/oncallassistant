// js/controllers/main.js
    
angular.module('oncallController', [])

    .controller('mainController', function($scope, $http) {
        $scope.formData = {};

        // when landing on the page, get all on-call entries and show them
        $http.get('/api/oncalls')
                .success(function(data) {
                        $scope.oncalls = "test";
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

        // when submitting the add form, send the text to the node API
        $scope.createOnCall = function() {
                $http.post('/api/oncalls', $scope.formData)
                        .success(function(data) {
                                $scope.formData = {}; // clear the form so our user is ready to enter another
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

    });