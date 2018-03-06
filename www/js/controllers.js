angular.module('starter.controllers', [
  'common.entry',
  'common.species',
  'common.staf',
  'common.parts',
])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Chats) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('entryCtrl', [
  '$scope',
  '$http',
  'factoryEntry',
  function ($scope, $http, factoryEntry) {

    $scope._entry = factoryEntry;
      
  }
])

.controller('listEntryCtrl', [
  '$scope',
  '$http',
  'factoryListEntry',
  function ($scope, $http, factoryListEntry) {

    $scope._listEntry = factoryListEntry;
    $scope._listEntry.loadData();
      
  }
])

.controller('speciesCtrl', [
  '$scope',
  '$http',
  'factorySpecies',
  'ionicDatePicker',
  'ionicTimePicker',
  function ($scope, $http, factorySpecies, ionicDatePicker, ionicTimePicker) {

      $scope._species = factorySpecies;

      $scope.postData = function() {
        $scope._species.postDB();
      };

      $scope.dateCapture = "";

      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          var date = new Date(val);
          $scope.dateCapture = date.getDate() +' - '+ (date.getMonth()+1) +' - '+ date.getFullYear();
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
  
      $scope.openDatePickerCapture = function(){
        ionicDatePicker.openDatePicker(ipObj1);
      };

      $scope.timeCapture = "";

      $scope.openTimePickerCapture = function(){
        var ipObj1 = {
          callback: function (val) {
            if (typeof (val) === 'undefined') {
              console.log('Time not selected');
            } else {
              var selectedTime = new Date(val * 1000);
              console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
              $scope.timeCapture = selectedTime.getUTCHours() +' : '+ selectedTime.getUTCMinutes();
            }
          },
          inputTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),
          format: 24
        };
        ionicTimePicker.openTimePicker(ipObj1);
      };
  }
])

.controller('eventCtrl', [
  '$scope',
  '$http',
  'ionicDatePicker',
  'ionicTimePicker',
  function ($scope, $http, ionicDatePicker, ionicTimePicker) {

    $scope.dateEvent = "";

      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          var date = new Date(val);
          $scope.dateEvent = date.getDate() +' - '+ (date.getMonth()+1) +' - '+ date.getFullYear();
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
  
      $scope.openDatePickerEvent = function(){
        ionicDatePicker.openDatePicker(ipObj1);
      };

      $scope.timeEventStar = "";

      $scope.openTimePickerEventStart = function(){
        var ipObj1 = {
          callback: function (val) {
            if (typeof (val) === 'undefined') {
              console.log('Time not selected');
            } else {
              var selectedTime = new Date(val * 1000);
              console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
              $scope.timeEventStar = selectedTime.getUTCHours() +' : '+ selectedTime.getUTCMinutes();
            }
          },
          inputTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),
          format: 24
        };
        ionicTimePicker.openTimePicker(ipObj1);
      };

      $scope.timeEventEnd = "";

      $scope.openTimePickerEventEnd = function(){
        var ipObj1 = {
          callback: function (val) {
            if (typeof (val) === 'undefined') {
              console.log('Time not selected');
            } else {
              var selectedTime = new Date(val * 1000);
              console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
              $scope.timeEventEnd = selectedTime.getUTCHours() +' : '+ selectedTime.getUTCMinutes();
            }
          },
          inputTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),
          format: 24
        };
        ionicTimePicker.openTimePicker(ipObj1);
      };

  }
])

.controller('siteCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {



  }
])

.controller('stafCtrl', [
  '$scope',
  '$http',
  'factoryStaf',
  function ($scope, $http, factoryStaf) {

      $scope._staf = factoryStaf;

      $scope.postData = function() {
        $scope._staf.postDB();
      };

  }
])

.controller('partsCtrl', [
  '$scope',
  '$http',
  'factoryParts',
  function ($scope, $http, factoryParts) {

      $scope._parts = factoryParts;

      $scope.postData = function() {
        $scope._parts.postDB();
      };

  }
]);
