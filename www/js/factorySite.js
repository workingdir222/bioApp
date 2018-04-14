angular.module('common.site', []).factory('factorySite', function ($http, $cordovaFile, $q) {

      var self = {};
      self.listSite = [];
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

                console.log(self.jsonData);
                
            }, function (error) {
                console.log(error)
            });

            }, function (error) {

                self.listSite = [];

            });

        };

        self.addListStaff = function() {
        let deferred = $q.defer();
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
        
        self.addListType = function() {
        let deferred = $q.defer();
        let typeArr ={
            id: self.jsonData.typeMaster.length + 1,
            name: self.nameType,
        };

        // self.staffMaster.push(staffArr);
        self.jsonData.typeMaster.push(typeArr);
        $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
        deferred.resolve(typeArr);
        return deferred.promise;
        };

        self.addListCountry = function() {
            let deferred = $q.defer();
            let countryArr ={
                id: self.jsonData.countryMaster.length + 1,
                name: self.nameCountry,
            };
    
            // self.staffMaster.push(staffArr);
            self.jsonData.countryMaster.push(countryArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(countryArr);
            return deferred.promise;
        };

        self.addListState = function() {
            let deferred = $q.defer();
            let stateArr ={
                id: self.jsonData.stateMaster.length + 1,
                name: self.nameState,
            };
    
            // self.staffMaster.push(staffArr);
            self.jsonData.stateMaster.push(stateArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(stateArr);
            return deferred.promise;
        };

        self.addListIsland = function() {
            let deferred = $q.defer();
            let islandArr ={
                id: self.jsonData.islandMaster.length + 1,
                name: self.nameIsland,
            };
            // self.staffMaster.push(staffArr);
            self.jsonData.islandMaster.push(islandArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(islandArr);
            return deferred.promise;
        };

        self.addListHabitat = function() {
            let deferred = $q.defer();
            let habitatArr ={
                id: self.jsonData.habitatMaster.length + 1,
                name: self.nameHabitat,
            };
            // self.staffMaster.push(staffArr);
            self.jsonData.habitatMaster.push(habitatArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(habitatArr);
            return deferred.promise;
        };

        self.addListDisturbed = function() {
            let deferred = $q.defer();
            let disturbedArr ={
                id: self.jsonData.disturbedMaster.length + 1,
                name: self.nameDisturbed,
            };
            // self.staffMaster.push(staffArr);
            self.jsonData.disturbedMaster.push(disturbedArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(disturbedArr);
            return deferred.promise;
        };

        self.addTblSite = function() {
            let deferred = $q.defer();
            let siteArr ={
                id: self.jsonData.disturbedMaster.length + 1,
                selectSiteID: self.selectSiteID,
                staffSelect: self.staffSelect,
                typeSelect: self.typeSelect,
                countrySelect: self.countrySelect,
                stateSelect: self.stateSelect,
                islandSelect: self.islandSelect,
                inputZnomber: self.inputZnomber,
                descLocation: self.descLocation,
                descSite: self.descSite,
                inputStartDate: self.inputStartDate,
                inputEndDate: self.inputEndDate,
                habitatSelect: self.habitatSelect,
                disturbedSelect: self.disturbedSelect
            };
            // self.staffMaster.push(staffArr);
            self.jsonData.tblSite.push(siteArr);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "dbfile.json", JSON.stringify(self.jsonData), { append: true });
            deferred.resolve(siteArr);
            return deferred.promise;
        };

    
        return self;

    }
)