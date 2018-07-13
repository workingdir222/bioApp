angular.module('common.project', [])
.factory('factoryProject', function ($http, $filter, $cordovaFile, ionicDatePicker) {

        var self = {};

        self.dateProject = "";
        self.location = "";
        self.dateProjectPush = "";

        self.listProject = [];
        self.listSpecimen = [];
        self.listEvent = [];
        self.listSite = [];
        self.listCapture = [];
        self.listOrb = [];
        self.listEntry = [];

        let listProjectArr = [];

        self.jsonData = {
            "tblProject": [],
            "tblSpecies": [],
            "tblEvent": [],
            "tblSite": [],
            "tblCapture": [],
            "tblObs": [],
            "tblNarrative": [],
            // "tblEvent": [],
            "siteMaster": [],
            "collectionMaster": [],
            "staffMaster": [],
            "roleMaster": [],
            "typeMaster": [],
            "roleMaster": [],
            "countryMaster": [],
            "stateMaster": [],
            "islandMaster": [],
            "habitatMaster": [],
            "disturbedMaster": [],
            "sexMaster": [],
            "ageMaster": [],
            "caughtMaster": [],
            "testestPositionMaster": [],
            "collectionEventMaster": []
        };

        self.loadData = function () {
            self.listProject = [];
            self.listSpecimen = [];
            
            // $cordovaFile.getFreeDiskSpace()
            // .then(function (success) {
            //     // success in kilobytes
            //     console.log('Error Messeg: => '+ success);
            // }, function (error) {
            //     // error
            //     console.log('Error Messeg: => '+ error);
            // });

            $cordovaFile.checkFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (req) {
                
                $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, "dbfile.json")
                .then(function (success) {

                    let settings = angular.fromJson(success);
                    self.jsonData = settings;

                    // self.listProject = self.jsonData.tblProject;

                    angular.forEach(self.jsonData.tblProject, function(item){
                        self.listProject.push({
                            id: item.id,
                            dateProject: item.dateProject,
                            location: item.location
                        })
                    });

                    angular.forEach(self.jsonData.tblSpecies, function(item){
                        self.listSpecimen.push({
                            id: item.id,
                            idProject: item.idProject,
                            tblSpeciment: item.tblSpeciment,
                            tblParts: item.tblParts,
                            tblMeasurement: item.tblMeasurement,
                            tblCapture: item.tblCapture,
                        })
                    })

                    console.log(settings);
                    
                }, function (error) {
                    console.log(error)
                });

            }, function (error) {

                $cordovaFile.createFile(cordova.file.dataDirectory, "dbfile.json", true)
                .then(function (success) {
                
                    return $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), {append: true});

                }, function (error) {
                // error
                });

                self.listProject = [];

            });
        };

        self.getDataSpecies = function() {
            
        };

        self.deleteDB = function () {

            $cordovaFile.removeFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (success) {
                self.jsonData = {
                    "tblProject": [],
                    "tblSpecies": [],
                    "tblEvent": [],
                    "tblSite": [],
                    "tblCapture": [],
                    "tblObs": [],
                    "tblNarrative": [],
                    // "tblEvent": [],
                    "siteMaster": [],
                    "collectionMaster": [],
                    "staffMaster": [],
                    "roleMaster": [],
                    "typeMaster": [],
                    "roleMaster": [],
                    "countryMaster": [],
                    "stateMaster": [],
                    "islandMaster": [],
                    "habitatMaster": [],
                    "disturbedMaster": [],
                    "sexMaster": [],
                    "ageMaster": [],
                    "caughtMaster": [],
                    "testestPositionMaster": [],
                    "collectionEventMaster": []
                };
                self.loadData();
            }, function (error) {
            })

        };

        self.checkDbFile = function() {
            $cordovaFile.checkFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (req) {

                $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, req.name)
                .then(function (success) {

                var idProject = self.dateProjectPush +" "+ self.location;
                idProject = idProject.replace(/\s+/g, '-').toLowerCase();

                var pushData = {
                    id: idProject,
                    dateProject: self.dateProjectPush,
                    location: self.location
                };

                self.listProject.push(pushData)
                
                // self.jsonData.tblSpecies = settings.tblSpecies;
                // self.jsonData.tblEvent = settings.tblEvent;
                self.jsonData.tblProject.push(pushData);

                return $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
                
                }, function (error) {
                console.log(error)
                });
                
            }, function (error) {

                console.log('no+++');

            });
        };

        self.outputText = "";

        self.accounts = function() {

            $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, "dbfile.json")
            .then(function (success) {

                var settings = angular.fromJson(success);
                
            }, function (error) {
                console.log(error);
            });

        };

        self.getDataByID = function(id) {
            angular.forEach(self.jsonData.tblProject, function (element) {
                if (element.id === id) {
                    self.dateProject = element;
                    // return element;
                }
            })
        };

        self.getDataSpecimenByID = function(id) {
            console.log(id);
        };

        self.getDataEventByID = function(id) {
            console.log(id);
        };

        self.getDataSiteByID = function(id) {
            console.log(id);
        };

        self.getDataCaptureByID = function(id) {
            console.log(id);
        };

        self.getDataOrbByID = function(id) {
            console.log(id);
        };

        self.getDataNarrativeByID = function(id) {
            console.log(id);
        };
        
        var ipObj1 = {
        callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            self.dateProjectPush = val;
            var date = new Date(val);
            self.dateProject = $filter("date")(date, 'dd MMMM yyyy');;
        },
        disabledDates: [            //Optional
            new Date(2018, 2, 16),
            new Date(2017, 2, 16),
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ],
        from: new Date(2012, 1, 1), //Optional
        to: new Date(2018, 12, 30), //Optional
        inputDate: new Date(),      //Optional
        mondayFirst: true,          //Optional
        disableWeekdays: [0],       //Optional
        closeOnSelect: false,       //Optional
        templateType: 'popup'       //Optional
        };

        self.openDatePicker = function(){
            ionicDatePicker.openDatePicker(ipObj1);
        };

        return self;

    }
)