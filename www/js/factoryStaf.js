angular.module('common.staf', []).factory('factoryStaf', [
    '$http',
    function ($http) {

        var self = {};
        self.welcome = { name : 'Angular Factory Staf' };

        return self;

    }
])