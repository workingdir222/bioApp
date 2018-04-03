angular.module('common.project', []).factory('factoryProject', function ($http, $cordovaFile, ionicDatePicker) {

        var self = {};

        self.dateProject = "";
        self.location = "";
        self.dateProjectPush = "";
        self.listProject = [];
        self.listSpecies = [];
        let listProjectArr = [];

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

                    self.listProject = settings.tblProject;

                    if (settings.tblSpecies !== undefined) {

                        if (settings.tblSpecies !== "") {
                            self.listSpecies = settings.tblSpecies;
                            console.log(self.listSpecies);
                        }
                        
                    }
                    
                }, function (error) {
                    console.log(error)
                });

            }, function (error) {

                $cordovaFile.createFile(cordova.file.dataDirectory, "dbfile.json", true)
                .then(function (success) {
                
                    var tblProject = {"tblProject": []};
                    self.listProject = tblProject.tblProject;
                    
                    return $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(tblProject), {append: true});

                }, function (error) {
                // error
                });

                self.listProject = [];

            });
        };

        self.deleteDB = function () {

            $cordovaFile.removeFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (success) {
                self.listProject = [];
                self.listSpecies = [];
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
                    "id": idProject,
                    "dateProject": self.dateProjectPush,
                    "location": self.location
                };

                console.log(pushData);
                
                var settings = angular.fromJson(success);
                
                settings.tblProject.push(pushData);
                self.listProject = settings.tblProject;

                return $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(settings), { append: true });
                
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
                
                // console.log(settings);

            }, function (error) {
                console.log(error);
            });

        };

        self.getDataByID = function(id) {
            console.log(id);
            for (var i = 0; i < self.listProject.length; i++) {
                if (self.listProject[i].id === id) {
                    return self.listProject[i];
                }
            }
        };
        
        var ipObj1 = {
        callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            self.dateProjectPush = val;
            var date = new Date(val);
            self.dateProject = date.getDate() +' - '+ (date.getMonth()+1) +' - '+ date.getFullYear();
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