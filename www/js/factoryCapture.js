angular.module('common.capture', []).factory('factoryCapture', [
    '$http',
    function ($http) {

        var self = {};
        self.welcome = { name : 'Angular Factory Staf' };

        return self;

    }
])