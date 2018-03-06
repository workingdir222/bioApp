angular.module('common.listentry', []).factory('factoryListEntry', [
    '$http',
    '$cordovaFile',
    function ($http, $cordovaFile) {

        var self = {};

        self.listEntry = [];
        let listProjectArr = [];

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

        return self;

    }
])