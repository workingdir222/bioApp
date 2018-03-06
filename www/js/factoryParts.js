angular.module('common.parts', []).factory('factoryParts', [
    '$http',
    function ($http) {

        var self = {};
        self.welcome = { name : 'Angular Factory Parts' };

        return self;

    }
])