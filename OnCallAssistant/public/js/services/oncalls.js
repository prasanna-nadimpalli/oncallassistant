// js/services/oncalls.js
angular.module('oncallService', [])

    // super simple service
    // each function returns a promise object 
    .factory('OnCalls', function($http) {
        return {
            get : function() {
                return $http.get('/api/oncalls');
            },
            create : function(oncallData) {
                return $http.post('/api/oncalls', oncallData);
            },
            delete : function(id) {
                return $http.delete('/api/oncalls/' + id);
            }
        }
    });