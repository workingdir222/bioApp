angular.module('common.event', []).factory('factoryEvent', [
    '$http',
    '$cordovaFile',
    function ($http, $cordovaFile) {

        var self = {};
        self.idProject = "";
        self.listEvent = [];
        self.stateParams = "";
        self.jsonData = {tblProject: [], tblEvent: []};

        self.stafList = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
          }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
          }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
          }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
          }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
          }];

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

                self.listProject = [];

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

                    if (settings.tblEvent !== undefined) {
                        idLength = settings.tblEvent.length;
                    } else {
                        idLength = 0;
                    };

                    var pushData = {
                        "id": self.stateParams +'-event'+ idLength,
                        "idProject": self.stateParams,
                        "inputReg": document.getElementById('inputReg').value,
                        "inputCollector": document.getElementById('inputCollector').value,
                        "inputInitials": document.getElementById('inputInitials').value,
                        "inputPreparator": document.getElementById('inputPreparator').value,
                        "inputGenu": document.getElementById('inputGenu').value,
                        "inputEvent": document.getElementById('inputEvent').value,
                        "inputField1": document.getElementById('inputField1').value,
                        "inputField2": document.getElementById('inputField2').value,
                        "inputField3": document.getElementById('inputField3').value,
                        "inputField4": document.getElementById('inputField4').value
                    };
                    
                    self.jsonData.tblProject = settings.tblProject;
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
])