angular.module('common.entry', []).factory('factoryEntry', [
    '$http',
    '$cordovaFile',
    'ionicDatePicker',
    function ($http, $cordovaFile, ionicDatePicker) {

        var self = {};
        
        self.welcome = { name : 'Angular Factory Staf' };

        self.dateEntry = "";
        self.dateEntryPush = "";
        self.listEntry = [];
        let listProjectArr = [];

        self.checkDisk = function() {
            $cordovaFile.getFreeDiskSpace()
            .then(function (success) {
                // success in kilobytes
                console.log(success);
            }, function (error) {
                // error
            });
        };

        self.loadData = function () {

            $cordovaFile.getFreeDiskSpace()
            .then(function (success) {
                // success in kilobytes
                console.log(success);
            }, function (error) {
                // error
            });

            $cordovaFile.checkFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (req) {
                
            $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, "dbfile.json")
            .then(function (success) {

                let settings = angular.fromJson(success);
                const listProject = settings.tblEntry;
                listProjectArr = [];

                for (let i = 0; i < listProject.length; i++) {

                const date = new Date(listProject[i].dateEntry);
                
                listProjectArr.push({
                    "id": listProject[i].id,
                    "dateEntry": listProject[i].dateEntry,
                    "dateEntryString": date.getDate() +' - '+ (date.getMonth()+1) +' - '+ date.getFullYear(),
                    "siteID": listProject[i].siteID,
                    "typeEntry": listProject[i].typeEntry,
                    "desEntry": listProject[i].desEntry,
                });

                if (i === (listProject.length - 1)) {
                    console.log(listProjectArr);
                    self.listEntry = listProjectArr;
                }
                
                }
                
            }, function (error) {
                console.log(error)
            });

            }, function (error) {

            });

        };

        self.deleteDB = function () {
            $cordovaFile.removeFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (success) {
                // success
            }, function (error) {
                // error
            })
        };

        self.checkDbFile = function() {
            $cordovaFile.checkFile(cordova.file.dataDirectory, "dbfile.json")
            .then(function (req) {

                $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, req.name)
                .then(function (success) {

                var idEntry = self.dateEntryPush +" "+ document.getElementById('siteID').value;
                idEntry = idEntry.replace(/\s+/g, '-').toLowerCase();

                var pushData = {
                    "id": idEntry,
                    "dateEntry": self.dateEntryPush,
                    "siteID": document.getElementById('siteID').value,
                    "typeEntry": document.getElementById('typeEntry').value,
                    "desEntry": document.getElementById('desEntry').value
                };

                var settings = angular.fromJson(success);

                settings.tblEntry.push(pushData);
                
                console.log(settings);

                return $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(settings), { replace: true });

                self.outputText = settings;

                }, function (error) {
                console.log(error)
                });
                
                // console.log(success);

            }, function (error) {

                console.log('no+++');
                $cordovaFile.createFile(cordova.file.dataDirectory, "dbfile.json", true)
                .then(function (success) {
                // success

                var idEntry = self.dateEntryPush +" "+ document.getElementById('siteID').value;
                idEntry = idEntry.replace(/\s+/g, '-').toLowerCase();

                var pushData = {
                    "id": idEntry,
                    "dateEntry": self.dateEntryPush,
                    "siteID": document.getElementById('siteID').value,
                    "typeEntry": document.getElementById('typeEntry').value,
                    "desEntry": document.getElementById('desEntry').value
                };
            
                var tblEntry = {"tblEntry": [pushData]};
                
                $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(tblEntry), {append: true})
                .then(function (success) {

                    console.log(success);
                    
                }, function (error) {
                    // error
                });

                }, function (error) {
                // error
                });

            });
        };

        self.outputText = "";

        self.accounts = function() {

            $cordovaFile.readAsBinaryString(cordova.file.dataDirectory, "dbfile.json")
            .then(function (success) {

                var settings = angular.fromJson(success);
                
                console.log(settings);

            }, function (error) {
                console.log(error);
            });

        };

        // self.postData = function() {
        //     self._entry.postDB();
        // };

        self.getDataByID = function(id) {
            console.log(id);
            for (var i = 0; i < self.listEntry.length; i++) {
                if (self.listEntry[i].id === id) {
                    return self.listEntry[i];
                }
            }
        };
        
        var ipObj1 = {
        callback: function (val) {  //Mandatory
            console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            self.dateEntryPush = val;
            var date = new Date(val);
            self.dateEntry = date.getDate() +' - '+ (date.getMonth()+1) +' - '+ date.getFullYear();
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
])