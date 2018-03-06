angular.module('common.species', []).factory('factorySpecies', [
    '$http',
    function ($http) {

        var self = {};

        self.welcome =  {name: 'Angular Factory Species'}; 

        return self;

    }
])