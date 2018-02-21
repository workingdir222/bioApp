angular.module('common.entry', []).factory('factoryEntry', [
    '$http',
    function ($http) {

        var self = {};
        self.welcome = { name : 'Angular Factory Staf' };

        return self;

    }
])