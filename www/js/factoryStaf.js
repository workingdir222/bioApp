angular.module('common.staf', []).factory('factoryStaf', [
    '$http',
    function ($http) {

        var self = {};
        self.welcome = { name : 'Angular Factory Staf' };

        self.postDB = function(){
            firebase.database().ref('staf').set({
                table: 'staf'
            });
        };

        return self;

    }
])