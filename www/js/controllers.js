angular.module('starter.controllers', [
  'common.project',
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

.controller('ProjectDetailCtrl', function($scope, $stateParams, factoryProject) {

  $scope.projectDetail = factoryProject.getDataByID($stateParams.id);
  $scope.listSpecies = factoryProject.listSpecies;

  console.log(factoryProject.listSpecies)

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('projectCtrl', function ($scope, $http, $timeout, $ionicModal, $cordovaCamera, factoryProject) {

    $scope._project = factoryProject;

    $scope.checkDbFile = function () {
      $scope._project.checkDbFile();
      $scope.modalProjectList.hide();
    };

    $scope.getPhoto = function () {

      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      correctOrientation:true
      };
  
      $cordovaCamera.getPicture(options).then(function(imageData) {

        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;

        $scope.dataImg = image.src;

        console.log(image);

      }, function(err) {
        // error
      });
  
    };

    $timeout(function () {
      $scope._project.loadData();
    },500)
    
    $ionicModal.fromTemplateUrl('templates/project/modal-project.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalProjectList = modal;
    });
    
    // Open the login modal
    $scope.addProjectList = function() {
      $scope.modalProjectList.show();
    };
    
    $scope.closeProjectList = function() {
      $scope.modalProjectList.hide();
    };
      
  }
)

.controller('listProjectCtrl', function ($scope, $http, factoryListProject) {

    $scope._listProject = factoryListProject;
    $scope._listProject.loadData();
      
  }
)

.controller('speciesCtrl', function ($scope, $http, $ionicModal, $stateParams, $timeout, Chats, factorySpecies, ionicDatePicker, ionicTimePicker) {

    $scope.loginData = {};

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

    $scope._species = factorySpecies;
    $scope._species.stateParams = $stateParams.id;
    $scope._species.loadData();

    $scope.projectDetail = factorySpecies.getDataByID($stateParams.id);

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
)

.controller('eventCtrl', function ($scope, $http, ionicDatePicker, ionicTimePicker) {

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
)

.controller('siteCtrl', function ($scope, $http, $ionicModal, factorySite) {

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
)

.controller('stafCtrl', function ($scope, $http, factoryStaf) {

      $scope._staf = factoryStaf;

      $scope.postData = function() {
        $scope._staf.postDB();
      };

  }
)

.controller('captureCtrl', function ($scope, $http) {


  }
)

.controller('orbCtrl', function ($scope, $http) {


  }
)

.controller('entryCtrl', function ($scope, $http) {


  }
)

.controller('partsCtrl', function ($scope, $http, $ionicModal, factoryParts) {

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
)

.controller('captureCtrl', function ($scope, $http, $ionicModal, factoryCapture) {

      

  }
);
