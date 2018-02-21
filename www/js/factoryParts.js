angular.module('common.parts', []).factory('factoryParts', [
    '$http',
    function ($http) {

        var self = {};
        self.welcome = { name : 'Angular Factory Parts' };

        self.postDB = function(){
            firebase.database().ref('parts').set({
                table: 'parts'
            });
        };

        return self;

    }
])