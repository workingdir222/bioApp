angular.module('common.species', []).factory('factorySpecies', function ($http, $cordovaFile, $state, $location, $q) {

        var self = {};
        self.idProject = "";
        self.listSpecies = [];
        self.listSpeciesID = {};
        self.stateParams = "";
        self.jsonData = {};

        self.rengPartArr = [];
        self.dataPartArr = [];
        self.dataCaptureArr = [];
        self.dataSpecies = {};
        self.dataPart = {};
        self.dataMeasurement = {};
        self.dataCapture = {};

        self.loadData = function () {

            // $cordovaFile.getFreeDiskSpace()
            // .then(function (success) {
            //     // success in kilobytes
            //     console.log(success);
            // }, function (error) {
            //     // error
            //     console.log(error);
            // });

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
                                        // self.listSpeciesID = item;
                                        self.dataSpecies = item;
                                        self.dataPartArr = item.inputParts;
                                    }
                                })
                            } else {
                                self.dataSpecies = {
                                    id: "",
                                    idParent: "",
                                    idProject: "",
                                    inputReg: "",
                                    inputCollector: "",
                                    inputInitials: "",
                                    inputPreparator: "",
                                    inputGenu: "",
                                    inputSpecies: "",
                                    inputField1: "",
                                    inputField2: "",
                                    inputField3: "",
                                    inputField4: ""
                                }
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
                    
                    self.dataSpecies.id = self.stateParams;
                    self.dataSpecies.idParent = self.stateParams.replace("-specimen"+ idLength, "");
                    self.dataSpecies.dataMeasurement.push(self.dataMeasurement);
                    self.jsonData.tblSpecies.push(self.dataSpecies);
                    self.listSpecies = self.jsonData.tblSpecies;

                    $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });

                    let pathBack = "/app/project-detail-specimen/"+ self.stateParams.replace("-specimen"+ idLength, "");
                    
                    // $state.go('app.project-detail-specimen');
                    $location.path(pathBack);
                
                }, function (error) {
                console.log(error)
                });

            });
        };
        
        self.addPartS = function () {
            let deferred = $q.defer();
            console.log(self.dataPart);
            self.dataPartArr.push(angular.copy(self.dataPart));
            self.dataSpecies.inputParts = self.dataPartArr;
            deferred.resolve(self.dataPart);
            return deferred.promise;
        };

        self.addDataCapture = function () {
            let deferred = $q.defer();
            self.dataCaptureArr.push(self.dataCapture);
            self.dataSpecies.dataCapture = self.dataCaptureArr;
            deferred.resolve(self.dataCapture);
            return deferred.promise;
        };

        return self;

    }
)