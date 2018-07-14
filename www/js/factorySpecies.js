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
        self.dataSpeciment = {};
        self.dataPart = {};
        self.dataMeasurement = {};
        self.dataCapture = {};

        self.listAge = [];

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
                    self.listAge = settings.ageMaster;

                    if (settings.tblSpecies !== undefined) {
                        settings.tblSpecies.forEach(element => {

                            if (element.id === self.stateParams) {
                                self.listSpecies = settings.tblSpecies;
                                angular.forEach(self.listSpecies, function(item){
                                    if (item.id === self.stateParams) {
                                        self.dataSpecies = item;
                                        self.dataSpeciment = item.tblSpeciment;
                                        self.dataPartArr = item.tblParts;
                                        self.dataMeasurement = item.tblMeasurement;
                                        self.dataCaptureArr = item.tblCapture;
                                    }
                                })
                            } else {
                                self.dataSpecies = {
                                    id: "",
                                    idProject: "",
                                    tblSpeciment: {},
                                    tblParts: [],
                                    tblMeasurement: {},
                                    tblCapture: [],
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
                    self.dataSpecies.idProject = self.stateParams.replace("-specimen"+ idLength, "");
                    self.dataSpecies.tblSpeciment = self.dataSpeciment;
                    self.dataSpecies.tblParts = self.dataPartArr;
                    self.dataSpecies.tblMeasurement = self.dataMeasurement;
                    self.dataSpecies.tblCapture = self.dataCaptureArr;
                    self.jsonData.tblSpecies.push(self.dataSpecies);
                    self.listSpecies = self.jsonData.tblSpecies;

                    $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
                    let pathBack = "/app/project-detail-specimen/"+ self.stateParams.replace("-specimen"+ idLength, "");
                    
                    $location.path(pathBack);
                
                }, function (error) {
                console.log(error)
                });

            });
        };
        
        self.addPartS = function () {
            let deferred = $q.defer();
            self.dataPartArr.push(angular.copy(self.dataPart));
            deferred.resolve(self.dataPart);
            return deferred.promise;
        };

        self.addDataCapture = function () {
            let deferred = $q.defer();
            self.dataCaptureArr.push(angular.copy(self.dataCapture));
            deferred.resolve(self.dataCapture);
            return deferred.promise;
        };

        self.addListAge = function () {
            let deferred = $q.defer();
            self.jsonData.ageMaster.push({name: angular.copy(self.nameAge)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameAge);
            return deferred.promise;
        };

        self.addListTestesPosition = function () {
            let deferred = $q.defer();
            self.jsonData.testestPositionMaster.push({name: angular.copy(self.nameTestesPosition)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameTestesPosition);
            return deferred.promise;
        };

        self.addListCollectionEvent = function () {
            let deferred = $q.defer();
            self.jsonData.collectionEventMaster.push({name: angular.copy(self.nameCollectionEvent)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameCollectionEvent);
            return deferred.promise;
        };

        self.addListCaptureType = function () {
            let deferred = $q.defer();
            self.jsonData.captureTypeMaster.push({name: angular.copy(self.nameCaptureType)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameCaptureType);
            return deferred.promise;
        };

        self.addListTrapType = function () {
            let deferred = $q.defer();
            self.jsonData.trapTypeMaster.push({name: angular.copy(self.nameTrapType)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameTrapType);
            return deferred.promise;
        };

        self.addListCaptureSelect = function () {
            let deferred = $q.defer();
            self.jsonData.captureSelectMaster.push({name: angular.copy(self.nameCaptureSelect)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameCaptureSelect);
            return deferred.promise;
        };

        self.addListSpeciesField = function () {
            let deferred = $q.defer();
            self.jsonData.speciesFieldMaster.push({name: angular.copy(self.nameSpeciesField)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameSpeciesField);
            return deferred.promise;
        };

        self.addListCaughtBy = function () {
            let deferred = $q.defer();
            self.jsonData.caughtByMaster.push({name: angular.copy(self.nameCaughtBy)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameCaughtBy);
            return deferred.promise;
        };

        self.addListCampTime = function () {
            let deferred = $q.defer();
            self.jsonData.campTimeMaster.push({name: angular.copy(self.nameCampTime)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameCampTime);
            return deferred.promise;
        };

        self.addListCampCondition = function () {
            let deferred = $q.defer();
            self.jsonData.campConditionMaster.push({name: angular.copy(self.nameCampCondition)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameCampCondition);
            return deferred.promise;
        };

        self.addListFinalCondition = function () {
            let deferred = $q.defer();
            self.jsonData.finalConditionMaster.push({name: angular.copy(self.nameFinalCondition)});

            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(self.nameFinalCondition);
            return deferred.promise;
        };

        return self;

    }
)