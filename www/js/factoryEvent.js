angular.module('common.event', []).factory('factoryEvent', function ($http, $cordovaFile, $q) {

        var self = {};
        self.idProject = "";
        self.listEvent = [];
        self.stateParams = "";
        self.jsonData = {};

        self.siteMaster = [{
            id: 0,
            name: 'gorontalo'
          }, {
            id: 1,
            name: 'Max Lynx'
          }, {
            id: 2,
            name: 'Adam Bradleyson'
          }, {
            id: 3,
            name: 'Perry Governor'
          }, {
            id: 4,
            name: 'Mike Harrington'
        }];

        self.addListSite = function() {
            var deferred = $q.defer();
            let siteArr ={
                id: self.jsonData.siteMaster.length + 1,
                name: self.nameValue,
            };

            // self.siteMaster.push(siteArr);
            self.jsonData.siteMaster.push(siteArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(siteArr);
            return deferred.promise;
        };

        self.collectionMaster = [{
            id: 0,
            name: 'gorontalo'
          }, {
            id: 1,
            name: 'Max Lynx'
          }, {
            id: 2,
            name: 'Adam Bradleyson'
          }, {
            id: 3,
            name: 'Perry Governor'
          }, {
            id: 4,
            name: 'Mike Harrington'
        }];

        self.addListCollection = function() {
            var deferred = $q.defer();
            let collectionArr ={
                id: self.jsonData.collectionMaster.length + 1,
                name: self.nameCollection,
            };
            
            // self.collectionMaster.push(collectionArr);
            self.jsonData.collectionMaster.push(collectionArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(collectionArr);
            return deferred.promise;
        };

        self.staffMaster = [{
            id: 0,
            name: 'ujang'
          }, {
            id: 1,
            name: 'Max Lynx'
          }, {
            id: 2,
            name: 'Adam Bradleyson'
          }, {
            id: 3,
            name: 'Perry Governor'
          }, {
            id: 4,
            name: 'Mike Harrington'
        }];

        self.addListStaff = function() {
            var deferred = $q.defer();
            let staffArr ={
                id: self.jsonData.staffMaster.length + 1,
                name: self.nameStaff,
            };

            // self.staffMaster.push(staffArr);
            self.jsonData.staffMaster.push(staffArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(staffArr);
            return deferred.promise;
        };

        self.roleMaster = [{
            id: 0,
            name: 'collector'
        }];

        self.addListRole = function() {
            var deferred = $q.defer();
            let roleArr ={
                id: self.jsonData.roleMaster.length + 1,
                name: self.nameRole,
            };

            // self.roleMaster.push(roleArr);
            self.jsonData.roleMaster.push(roleArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(roleArr);
            return deferred.promise;
        };
        
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

                    if (settings.tblEvent !== undefined) {
                        settings.tblEvent.forEach(element => {

                            if (element.id === self.stateParams) {
                                self.listEvent = settings.tblEvent;
                            }
                            
                        });
                    }
                    
                }, function (error) {
                    console.log(error)
                });

            }, function (error) {

                self.listEvent = [];

            });

        };

        self.getDataByID = function(id) {
            console.log(id);
            for (var i = 0; i < self.listEvent.length; i++) {
                if (self.listEvent[i].id === id) {
                    return self.listEvent[i];
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

                    self.jsonData = settings;

                    if (settings.tblEvent !== undefined) {
                        idLength = settings.tblEvent.length;
                    } else {
                        idLength = 0;
                    };

                    var pushData = {
                        "id": self.stateParams +'-event'+ idLength,
                        "selectSiteID": self.selectSiteID,
                        "dateEvent": self.dateEvent,
                        "timeEventStar": self.timeEventStar,
                        "timeEventEnd": self.timeEventEnd,
                        "selectCollection": self.selectCollection,
                        "inputRatCheck": self.inputRatCheck,
                        "inputRatAdd": self.inputRatAdd,
                        "inputRatMove": self.inputRatMove,
                        "inputElliottCheck": self.inputElliottCheck,
                        "inputElliottAdd": self.inputElliottAdd,
                        "inputElliottMove": self.inputElliottMove,
                        "inputCageCheck": self.inputCageCheck,
                        "inputCageAdd": self.inputCageAdd,
                        "inputCageMove": self.inputCageMove,
                        "inputPitfallCheck": self.inputPitfallCheck,
                        "inputPitfallAdd": self.inputPitfallAdd,
                        "inputPitfallMove": self.inputPitfallMove,
                        "inputPitfall": self.inputPitfall,
                        "inputConibearCheck": self.inputConibearCheck,
                        "inputConibearAdd": self.inputConibearAdd,
                        "inputConibearMove": self.inputConibearMove,
                        "inputSnareCheck": self.inputSnareCheck,
                        "inputSnareAdd": self.inputSnareAdd,
                        "inputSnareMove": self.inputSnareMove,
                        "inputHarpCheck": self.inputHarpCheck,
                        "inputHarpAdd": self.inputHarpAdd,
                        "inputHarpMove": self.inputHarpMove,
                        "inputCameraCheck": self.inputCameraCheck,
                        "inputCameraAdd": self.inputCameraAdd,
                        "inputCameraMove": self.inputCameraMove,
                        "inputSongCheck": self.inputSongCheck,
                        "inputSongAdd": self.inputSongAdd,
                        "inputSongMove": self.inputSongMove,
                        "inputOtherType": self.inputOtherType,
                        "inputOtherCheck": self.inputOtherCheck,
                        "inputOtherAdd": self.inputOtherAdd,
                        "inputOtherMove": self.inputOtherMove,
                        "inputMistnetCheck": self.inputMistnetCheck,
                        "inputMistnetAdd": self.inputMistnetAdd,
                        "inputMistnetMove": self.inputMistnetMove,
                        "toggleSpecimen": self.toggleSpecimen,
                        "toggleObservation": self.toggleObservation,
                        "toggleImage": self.toggleImage,
                        "toggleSound": self.toggleSound,
                        "selectStaff1": self.selectStaff1,
                        "selectRole1": self.selectRole1,
                        "selectStaff2": self.selectStaff2,
                        "selectRole2": self.selectRole2,
                        "selectStaff3": self.selectStaff3,
                        "selectRole3": self.selectRole3,
                        "selectStaff4": self.selectStaff4,
                        "selectRole4": self.selectRole4,
                        "selectStaff5": self.selectStaff5,
                        "selectRole5": self.selectRole5,
                        "inputCMN": self.inputCMN
                    };
                    
                    // self.jsonData.tblProject = settings.tblProject;
                    // self.jsonData.tblSpecies = settings.tblSpecies;
                    self.jsonData.tblEvent.push(pushData);
                    self.listEvent = self.jsonData.tblEvent;
                    console.log(self.jsonData);

                    return $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
                
                }, function (error) {
                console.log(error)
                });
                
            });
        };

        return self;

    }
)