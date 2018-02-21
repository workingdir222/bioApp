angular.module('common.species', []).factory('factorySpecies', [
    '$http',
    function ($http) {

        var self = {};

        self.welcome =  {name: 'Angular Factory Species'}; 

        self.postDB = function(){
            firebase.database().ref('species').set({
                table: 'species'
            });
        };

        return self;

    }
])