angular.module('starter.controllers', [
  'common.entry',
  'common.species',
  'common.staf',
  'common.site',
  'common.parts',
  'common.capture'
])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $ionicModal, Chats) {
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

.controller('EntryDetailCtrl', function($scope, $stateParams, factoryEntry) {

  $scope.entryDetail = factoryEntry.getDataByID($stateParams.id);

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

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
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
  '$timeout',
  '$ionicModal',
  'factoryEntry',
  function ($scope, $http, $timeout, $ionicModal, factoryEntry) {

    $scope._entry = factoryEntry;

    $timeout(function () {
      $scope._entry.loadData();
    },100)
    
    $ionicModal.fromTemplateUrl('templates/entry/modal-entry.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalEntryList = modal;
    });
    
    // Open the login modal
    $scope.addEntryList = function() {
      $scope.modalEntryList.show();
    };
    
    $scope.closeEntryList = function() {
      $scope.modalEntryList.hide();
    };
      
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
  '$ionicModal',
  'factorySite',
  function ($scope, $http, $ionicModal, factorySite) {

    $scope._site = factorySite;
    $scope.nameValue = "";
    $scope.initialValue = "";
    $scope.affiliatuinValue = "";

    $ionicModal.fromTemplateUrl('templates/addStafPopup.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCaptureList = modal;
    });

    $scope.nameTyping = function (value) {
      $scope.nameValue = value;
    };

    $scope.initialTyping = function (value) {
      $scope.initialValue = value;
    };

    $scope.affiliatuinTyping = function (value) {
      $scope.affiliatuinValue = value;
    };
    
    // Open the login modal
    $scope.addStafPopup = function() {
      $scope.modalCaptureList.show();

      document.getElementById('nameValue').value = "";
      document.getElementById('initialValue').value = "";
      document.getElementById('affiliatuinValue').value = "";

    };

    $scope.closeStafPopup = function() {
      $scope.modalCaptureList.hide();
    };

    $scope.selectStaff = function (value) {
      if (value === "add") {
        $scope.addStafPopup();
      }
    }

    $scope.stafList = [{
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

    $scope.addListStaff = function () {

      var staffArr ={
          id: $scope.stafList.length + 1,
          name: $scope.nameValue,
          lastText: $scope.nameValue,
          face: $scope.affiliatuinValue
      };

      $scope.stafList.push(staffArr);

      $scope.closeStafPopup();

      console.log($scope.stafList);
    }

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
  '$ionicModal',
  'factoryParts',
  function ($scope, $http, $ionicModal, factoryParts) {

      $scope._parts = factoryParts;

      $scope.postData = function() {
        $scope._parts.postDB();
      };

      $ionicModal.fromTemplateUrl('templates/specimen/modal-part.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalPartList = modal;
      });
      
      // Open the login modal
      $scope.addPartList = function() {
        $scope.modalPartList.show();
      };
      
      $scope.closePartList = function() {
        $scope.modalPartList.hide();
      };

  }
])

.controller('captureCtrl', [
  '$scope',
  '$http',
  '$ionicModal',
  'factoryCapture',
  function ($scope, $http, $ionicModal, factoryCapture) {

      $scope._capture = factoryCapture;

      $ionicModal.fromTemplateUrl('templates/specimen/modal-capture.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalCaptureList = modal;
      });
      
      // Open the login modal
      $scope.addCaptureList = function() {
        $scope.modalCaptureList.show();
      };
      
      $scope.closeCaptureList = function() {
        $scope.modalCaptureList.hide();
      };

  }
]);
