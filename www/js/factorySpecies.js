angular.module('common.species', []).factory('factorySpecies', [
    '$http',
    '$cordovaFile',
    function ($http, $cordovaFile) {

        var self = {};
        self.idProject = "";
        self.listSpecies = [];
        self.listSpeciesID = {};
        self.stateParams = "";
        self.jsonData = {};

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
                    self.jsonData = settings;

                    if (settings.tblSpecies !== undefined) {
                        settings.tblSpecies.forEach(element => {

                            if (element.id === self.stateParams) {
                                self.listSpecies = settings.tblSpecies;

                                angular.forEach(self.listSpecies, function(item){
                                    if (item.id === self.stateParams) {
                                        self.listSpeciesID = item;
                                    }
                                })
                            }
                            
                        });
                    };
                    
                }, function (error) {
                    console.log(error)
                });

            }, function (error) {

                self.listProject = [];

            });

        };

        self.getDataByID = function(id) {
            console.log(id);
            for (var i = 0; i < self.listSpecies.length; i++) {
                if (self.listSpecies[i].id === id) {
                    return self.listSpecies[i];
                }
            }
        };

        self.checkDbFile = function() {
            $cordovaFile.checkFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (req) {

                $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, req.name)
                .then(function (success) {

                    var settings = angular.fromJson(success);
                    var idLength = 0;

                    if (settings.tblSpecies !== undefined) {
                        idLength = settings.tblSpecies.length;
                    } else {
                        idLength = 0;
                    };

                    var pushData = {
                        "id": self.stateParams +'-specimen'+ idLength,
                        "idProject": self.stateParams,
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
                    
                    // self.jsonData.tblProject = settings.tblProject;
                    // self.jsonData.tblEvent = settings.tblEvent;
                    self.jsonData.tblSpecies.push(pushData);
                    self.listSpecies = self.jsonData.tblSpecies;

                    return $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
                
                }, function (error) {
                console.log(error)
                });

            });
        };

        return self;

    }
])