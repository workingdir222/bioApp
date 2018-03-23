angular.module('common.species', []).factory('factorySpecies', [
    '$http',
    '$cordovaFile',
    function ($http, $cordovaFile) {

        var self = {};
        self.idProject = "";
        self.listSpecies = [];
        self.stateParams = "";
        self.jsonData = {tblEntry: [], tblSpecies: []};

        self.loadData = function () {

            $cordovaFile.getFreeDiskSpace()
            .then(function (success) {
                // success in kilobytes
                console.log(success);
            }, function (error) {
                // error
                console.log(error);
            });

            $cordovaFile.checkFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (req) {
                
                $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, "dbfile.json")
                .then(function (success) {

                    let settings = angular.fromJson(success);
                    self.listSpecies = settings.tblSpecies;
                    
                }, function (error) {
                    console.log(error)
                });

            }, function (error) {

                self.listEntry = [];

            });

        };

        self.checkDbFile = function() {
            $cordovaFile.checkFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (req) {

                $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, req.name)
                .then(function (success) {

                var pushData = {
                    "id": self.stateParams,
                    "inputReg": document.getElementById('inputReg').value,
                    "inputCollector": document.getElementById('inputCollector').value,
                    "inputInitials": document.getElementById('inputInitials').value,
                    "inputPreparator": document.getElementById('inputPreparator').value,
                    "inputGenu": document.getElementById('inputGenu').value,
                    "inputSpecies": document.getElementById('inputSpecies').value,
                    "inputField1": document.getElementById('inputField1').value,
                    "inputField2": document.getElementById('inputField2').value,
                    "inputField3": document.getElementById('inputField3').value,
                    "inputField4": document.getElementById('inputField4').value
                };
                
                var settings = angular.fromJson(success);
                self.jsonData.tblEntry = settings.tblEntry;
                self.jsonData.tblSpecies.push(pushData);
                
                self.listSpecies = self.jsonData.tblSpecies;
                
                console.log(self.jsonData);

                return $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { replace: true });
                
                }, function (error) {
                console.log(error)
                });
                
                // console.log(success);

            });
        };

        return self;

    }
])