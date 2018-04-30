angular.module('starter.controllers', [
  'common.project',
  'common.species',
  'common.event',
  // 'common.staf',
  'common.site',
  'common.parts',
  'common.capture',
  'common.obs',
  'common.entry'
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


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('projectCtrl', function ($scope, $http, $timeout, $ionicModal, $cordovaCamera, factoryProject) {

    $scope._project = factoryProject;

    document.addEventListener("deviceready", function () {
      $scope._project.loadData();
    });

    $scope.checkDbFile = function () {
      $scope._project.checkDbFile();
      $scope.modalProjectList.hide();
    };

    $scope.getPhoto = function () {

      var options = {
        // quality: 3000,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        // targetWidth: 100,
        // targetHeight: 100,
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

    // $timeout(function () {
    //   $scope._project.loadData();
    // },500)
    
    $ionicModal.fromTemplateUrl('templates/project/modal-project.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalProjectList = modal;
    });
    
    // Open the login modal
    $scope.addProjectList = function() {
      $scope.modalProjectList.show();
      $scope._project.dateProject = "";
      $scope._project.location = "";
    };
    
    $scope.closeProjectList = function() {
      $scope.modalProjectList.hide();
    };
      
  }
)

.controller('listProjectCtrl', function ($scope, $http, factoryListProject) {

    $scope._listProject = factoryListProject;
    // $scope._listProject.loadData();
      
  }
)

.controller('speciesCtrl', function ($scope, $http, $ionicModal, $stateParams, $timeout, Chats, factorySpecies, ionicDatePicker, ionicTimePicker) {

    $scope.loginData = {};

    $scope._species = factorySpecies;
    $scope._species.stateParams = $stateParams.id;
    $scope._species.loadData();
  
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

    $ionicModal.fromTemplateUrl('templates/specimen/modal-age.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalAge = modal;
    });
    
    $scope.addModalAge = function() {
      $scope.modalAge.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalAge = function() {
      $scope.modalAge.hide();
    };
  
    $scope.addListAge = function() {
      factorySpecies.addListAge() 
        .then(function(response) {
          $scope.modalAge.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-collection-event.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCollectionEvent = modal;
    });
    
    $scope.addModalCollectionEvent = function() {
      $scope.modalCollectionEvent.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalCollectionEvent = function() {
      $scope.modalCollectionEvent.hide();
    };
  
    $scope.addListCollectionEvent = function() {
      factorySpecies.addListCollectionEvent() 
        .then(function(response) {
          $scope.modalCollectionEvent.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-capture-type.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCaptureType = modal;
    });
    
    $scope.addModalCaptureType = function() {
      $scope.modalCaptureType.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalCaptureType = function() {
      $scope.modalCaptureType.hide();
    };
  
    $scope.addListCaptureType = function() {
      factorySpecies.addListCaptureType() 
        .then(function(response) {
          $scope.modalCaptureType.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-trap-type.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalTrapType = modal;
    });
    
    $scope.addModalTrapType = function() {
      $scope.modalTrapType.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalTrapType = function() {
      $scope.modalTrapType.hide();
    };
  
    $scope.addListTrapType = function() {
      factorySpecies.addListTrapType() 
        .then(function(response) {
          $scope.modalTrapType.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-capture-select.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCaptureSelect = modal;
    });
    
    $scope.addModalCaptureSelect = function() {
      $scope.modalCaptureSelect.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalCaptureSelect = function() {
      $scope.modalCaptureSelect.hide();
    };
  
    $scope.addListCaptureSelect = function() {
      factorySpecies.addListCaptureSelect() 
        .then(function(response) {
          $scope.modalCaptureSelect.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-species-field.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalSpeciesField = modal;
    });
    
    $scope.addModalSpeciesField = function() {
      $scope.modalSpeciesField.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalSpeciesField = function() {
      $scope.modalSpeciesField.hide();
    };
  
    $scope.addListSpeciesField = function() {
      factorySpecies.addListSpeciesField() 
        .then(function(response) {
          $scope.modalSpeciesField.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-caught-by.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCaughtBy = modal;
    });
    
    $scope.addModalCaughtBy = function() {
      $scope.modalCaughtBy.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalCaughtBy = function() {
      $scope.modalCaughtBy.hide();
    };
  
    $scope.addListCaughtBy = function() {
      factorySpecies.addListCaughtBy() 
        .then(function(response) {
          $scope.modalCaughtBy.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-camp-time.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCampTime = modal;
    });
    
    $scope.addModalCampTime = function() {
      $scope.modalCampTime.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalCampTime = function() {
      $scope.modalCampTime.hide();
    };
  
    $scope.addListCampTime = function() {
      factorySpecies.addListCampTime() 
        .then(function(response) {
          $scope.modalCampTime.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-camp-condition.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCampCondition = modal;
    });
    
    $scope.addModalCampCondition = function() {
      $scope.modalCampCondition.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalCampCondition = function() {
      $scope.modalCampCondition.hide();
    };
  
    $scope.addListCampCondition = function() {
      factorySpecies.addListCampCondition() 
        .then(function(response) {
          $scope.modalCampCondition.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-final-condition.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalFinalCondition = modal;
    });
    
    $scope.addModalFinalCondition = function() {
      $scope.modalFinalCondition.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalFinalCondition = function() {
      $scope.modalFinalCondition.hide();
    };
  
    $scope.addListFinalCondition = function() {
      factorySpecies.addListFinalCondition() 
        .then(function(response) {
          $scope.modalFinalCondition.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-testes-position.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalTestesPosition = modal;
    });
    
    $scope.addModalTestesPosition = function() {
      $scope.modalTestesPosition.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalTestesPosition = function() {
      $scope.modalTestesPosition.hide();
    };
  
    $scope.addListTestesPosition = function() {
      factorySpecies.addListTestesPosition() 
        .then(function(response) {
          $scope.modalTestesPosition.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/specimen/modal-why.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalWhy = modal;
    });
    
    $scope.addModalWhy = function() {
      $scope.modalWhy.show();
      $scope._species.nameValue = "";
    };
    
    $scope.closeModalWhy = function() {
      $scope.modalWhy.hide();
    };
  
    $scope.addListWhy = function() {
      factorySpecies.addListWhy() 
        .then(function(response) {
          $scope.modalWhy.hide();
        }
      );
    };

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

.controller('eventCtrl', function ($scope, $http, $filter, $ionicModal, ionicDatePicker, ionicTimePicker, factoryEvent) {

  $scope._event = factoryEvent;
  $scope._event.loadData();

  $ionicModal.fromTemplateUrl('templates/event/modal-siteid.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalEventid = modal;
  });
  
  $scope.addModalSite = function() {
    $scope.modalEventid.show();
    $scope._event.nameValue = "";
  };
  
  $scope.closeModalSite = function() {
    $scope.modalEventid.hide();
  };

  $scope.addListSite = function() {
    factoryEvent.addListSite() 
      .then(function(response) {
        $scope.modalEventid.hide();
      }
    );
  };

  $ionicModal.fromTemplateUrl('templates/event/modal-collection.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalCollection = modal;
  });
  
  $scope.addModalCollection = function() {
    $scope.modalCollection.show();
    $scope._event.nameCollection = "";
  };
  
  $scope.closeModalCollection = function() {
    $scope.modalCollection.hide();
  };

  $scope.addListCollection = function() {
    factoryEvent.addListCollection() 
      .then(function(response) {
        $scope.modalCollection.hide();
      }
    );
  };

  $ionicModal.fromTemplateUrl('templates/event/modal-staff.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalStaff = modal;
  });
  
  $scope.addModalStaff = function() {
    $scope.modalStaff.show();
    $scope._event.nameStaff = "";
  };
  
  $scope.closeModalStaff = function() {
    $scope.modalStaff.hide();
  };

  $scope.addListStaff = function() {
    factoryEvent.addListStaff() 
      .then(function(response) {
        $scope.modalStaff.hide();
      }
    );
  };

  $ionicModal.fromTemplateUrl('templates/event/modal-role.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalRole = modal;
  });
  
  $scope.addModalRole = function() {
    $scope.modalRole.show();
    $scope._event.nameRole = "";
  };
  
  $scope.closeModalRole = function() {
    $scope.modalRole.hide();
  };

  $scope.addListRole = function() {
    factoryEvent.addListRole() 
      .then(function(response) {
        $scope.modalRole.hide();
      }
    );
  };

  $scope.dateEvent = "";

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope._event.dateEvent = val;
        let dateEnd = $filter("date")(val, 'dd MMMM yyyy');
        document.getElementById('dateEvent').value = dateEnd;
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
            $scope._event.timeEventStar = val;

            let dateStart = $filter("date")(val, 'HH:mm');
            document.getElementById('timeEventStar').value = dateStart;
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
            $scope._event.timeEventEnd = val;

            let dateEnd = $filter("date")(val, 'HH:mm');
            document.getElementById('timeEventEnd').value = dateEnd;
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

    $scope._site = factorySite;;
    $scope._site.loadData();

    $ionicModal.fromTemplateUrl('templates/site/modal-staff.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalStaff = modal;
    });
    
    $scope.addModalStaff = function() {
      $scope.modalStaff.show();
      $scope._site.nameStaff = "";
    };
    
    $scope.closeModalStaff = function() {
      $scope.modalStaff.hide();
    };
  
    $scope.addListStaff = function() {
      factorySite.addListStaff() 
        .then(function(response) {
          $scope.modalStaff.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/site/modal-type.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalType = modal;
    });
    
    $scope.addModalType = function() {
      $scope.modalType.show();
      $scope._site.nameType = "";
    };
    
    $scope.closeModalType = function() {
      $scope.modalType.hide();
    };
  
    $scope.addListType = function() {
      factorySite.addListType() 
        .then(function(response) {
          $scope.modalType.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/site/modal-country.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCountry = modal;
    });
    
    $scope.addModalCountry = function() {
      $scope.modalCountry.show();
      $scope._site.nameCountry = "";
    };
    
    $scope.closeModalCountry = function() {
      $scope.modalCountry.hide();
    };
  
    $scope.addListCountry = function() {
      factorySite.addListCountry() 
        .then(function(response) {
          $scope.modalCountry.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/site/modal-state.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalState = modal;
    });
    
    $scope.addModalState = function() {
      $scope.modalState.show();
      $scope._site.nameState = "";
    };
    
    $scope.closeModalState = function() {
      $scope.modalState.hide();
    };
  
    $scope.addListState = function() {
      factorySite.addListState() 
        .then(function(response) {
          $scope.modalState.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/site/modal-island.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalIsland = modal;
    });
    
    $scope.addModalIsland = function() {
      $scope.modalIsland.show();
      $scope._site.nameIsland = "";
    };
    
    $scope.closeModalIsland = function() {
      $scope.modalIsland.hide();
    };
  
    $scope.addListIsland = function() {
      factorySite.addListIsland() 
        .then(function(response) {
          $scope.modalIsland.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/site/modal-habitat.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalHabitat = modal;
    });
    
    $scope.addModalHabitat = function() {
      $scope.modalHabitat.show();
      $scope._site.nameHabitat = "";
    };
    
    $scope.closeModalHabitat = function() {
      $scope.modalHabitat.hide();
    };
  
    $scope.addListHabitat = function() {
      factorySite.addListHabitat() 
        .then(function(response) {
          $scope.modalHabitat.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/site/modal-disturbed.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalDisturbed = modal;
    });
    
    $scope.addModalDisturbed = function() {
      $scope.modalDisturbed.show();
      $scope._site.nameDisturbed = "";
    };
    
    $scope.closeModalDisturbed = function() {
      $scope.modalDisturbed.hide();
    };
  
    $scope.addListDisturbed = function() {
      factorySite.addListDisturbed() 
        .then(function(response) {
          $scope.modalDisturbed.hide();
        }
      );
    };

    $scope.addTblSite = function() {
      factorySite.addTblSite() 
        .then(function(response) {
          
        }
      );
    };
    
  }
)

.controller('stafCtrl', function ($scope, $http, factoryStaf) {

      $scope._staf = factoryStaf;

      $scope.postData = function() {
        $scope._staf.postDB();
      };

  }
)

.controller('captureCtrl', function ($scope, $http, $filter, $ionicModal, ionicDatePicker, ionicTimePicker, factoryCapture) {

    $scope._capture = factoryCapture;

    $ionicModal.fromTemplateUrl('templates/capture/modal-age.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalAge = modal;
    });
    
    $scope.addModalAge = function() {
      $scope.modalAge.show();
      $scope._capture.nameValue = "";
    };
    
    $scope.closeModalAge = function() {
      $scope.modalAge.hide();
    };
  
    $scope.addListAge = function() {
      factoryCapture.addListAge() 
        .then(function(response) {
          $scope.modalAge.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/capture/modal-capture-type.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCaptureType = modal;
    });
    
    $scope.addModalCaptureType = function() {
      $scope.modalCaptureType.show();
      $scope._capture.nameValue = "";
    };
    
    $scope.closeModalCaptureType = function() {
      $scope.modalCaptureType.hide();
    };
  
    $scope.addListCaptureType = function() {
      factoryCapture.addListCaptureType() 
        .then(function(response) {
          $scope.modalCaptureType.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/capture/modal-caught-by.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCaughtBy = modal;
    });
    
    $scope.addModalCaughtBy = function() {
      $scope.modalCaughtBy.show();
      $scope._capture.nameValue = "";
    };
    
    $scope.closeModalCaughtBy = function() {
      $scope.modalCaughtBy.hide();
    };
  
    $scope.addListCaughtBy = function() {
      factoryCapture.addListCaughtBy() 
        .then(function(response) {
          $scope.modalCaughtBy.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/capture/modal-colecting-event.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalColectingEvent = modal;
    });
    
    $scope.addModalColectingEvent = function() {
      $scope.modalColectingEvent.show();
      $scope._capture.nameValue = "";
    };
    
    $scope.closeModalColectingEvent = function() {
      $scope.modalColectingEvent.hide();
    };
  
    $scope.addListColectingEvent = function() {
      factoryCapture.addListColectingEvent() 
        .then(function(response) {
          $scope.modalColectingEvent.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/capture/modal-species-field.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalSpeciesField = modal;
    });
    
    $scope.addModalSpeciesField = function() {
      $scope.modalSpeciesField.show();
      $scope._capture.nameValue = "";
    };
    
    $scope.closeModalSpeciesField = function() {
      $scope.modalSpeciesField.hide();
    };
  
    $scope.addListSpeciesField = function() {
      factoryCapture.addListSpeciesField() 
        .then(function(response) {
          $scope.modalSpeciesField.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/capture/modal-trap-type.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalTrapType = modal;
    });
    
    $scope.addModalTrapType = function() {
      $scope.modalTrapType.show();
      $scope._capture.nameValue = "";
    };
    
    $scope.closeModalTrapType = function() {
      $scope.modalTrapType.hide();
    };
  
    $scope.addListTrapType = function() {
      factoryCapture.addListTrapType() 
        .then(function(response) {
          $scope.modalTrapType.hide();
        }
      );
    };

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope._capture.dateEvent = val;
        let dateEnd = $filter("date")(val, 'dd MMMM yyyy');
        document.getElementById('dateEvent').value = dateEnd;
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

    $scope.openTimePickerCapture = function(){
      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            var selectedTime = new Date(val * 1000);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            $scope._capture.timeEventEnd = val;

            let dateEnd = $filter("date")(val, 'HH:mm');
            document.getElementById('timeEventEnd').value = dateEnd;
          }
        },
        inputTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),
        format: 24
      };
      ionicTimePicker.openTimePicker(ipObj1);
    };

    $scope.openTimePickerCaptureRelease = function(){
      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            var selectedTime = new Date(val * 1000);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            $scope._capture.timeEventEnd = val;

            let dateEnd = $filter("date")(val, 'HH:mm');
            document.getElementById('timeEventEnd').value = dateEnd;
          }
        },
        inputTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),
        format: 24
      };
      ionicTimePicker.openTimePicker(ipObj1);
    };

    $scope.openTimePickerCaptureCamp = function(){
      var ipObj1 = {
        callback: function (val) {
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            var selectedTime = new Date(val * 1000);
            console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
            $scope._capture.timeEventEnd = val;

            let dateEnd = $filter("date")(val, 'HH:mm');
            document.getElementById('timeEventEnd').value = dateEnd;
          }
        },
        inputTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),
        format: 24
      };
      ionicTimePicker.openTimePicker(ipObj1);
    };

  }
)

.controller('orbCtrl', function ($scope, $http, $ionicModal, factoryObs) {

    $scope._obs = factoryObs;

    $ionicModal.fromTemplateUrl('templates/obs/modal-age.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalAge = modal;
    });
    
    $scope.addModalAge = function() {
      $scope.modalAge.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalAge = function() {
      $scope.modalAge.hide();
    };
  
    $scope.addListAge = function() {
      factoryObs.addListAge() 
        .then(function(response) {
          $scope.modalAge.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/obs/modal-bird-id.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalBirdID = modal;
    });
    
    $scope.addModalBirdID = function() {
      $scope.modalBirdID.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalBirdID = function() {
      $scope.modalBirdID.hide();
    };
  
    $scope.addListBirdID = function() {
      factoryObs.addListBirdID() 
        .then(function(response) {
          $scope.modalBirdID.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/obs/modal-frog-id.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalFrogID = modal;
    });
    
    $scope.addModalFrogID = function() {
      $scope.modalFrogID.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalFrogID = function() {
      $scope.modalFrogID.hide();
    };
  
    $scope.addListFrogID = function() {
      factoryObs.addListFrogID() 
        .then(function(response) {
          $scope.modalFrogID.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/obs/modal-mammal-id.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalMammalID = modal;
    });
    
    $scope.addModalMammalID = function() {
      $scope.modalMammalID.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalMammalID = function() {
      $scope.modalMammalID.hide();
    };
  
    $scope.addListMammalID = function() {
      factoryObs.addListMammalID() 
        .then(function(response) {
          $scope.modalMammalID.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/obs/modal-reptile-id.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalReptileID = modal;
    });
    
    $scope.addModalReptileID = function() {
      $scope.modalReptileID.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalReptileID = function() {
      $scope.modalReptileID.hide();
    };
  
    $scope.addListReptileID = function() {
      factoryObs.addListReptileID() 
        .then(function(response) {
          $scope.modalReptileID.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/obs/modal-other-taxa-id.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalOtherTaxaID = modal;
    });
    
    $scope.addModalOtherTaxaID = function() {
      $scope.modalOtherTaxaID.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalOtherTaxaID = function() {
      $scope.modalOtherTaxaID.hide();
    };
  
    $scope.addListOtherTaxaID = function() {
      factoryObs.addListOtherTaxaID() 
        .then(function(response) {
          $scope.modalOtherTaxaID.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/obs/modal-collection-event.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalCollectionEvent = modal;
    });
    
    $scope.addModalCollectionEvent = function() {
      $scope.modalCollectionEvent.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalCollectionEvent = function() {
      $scope.modalCollectionEvent.hide();
    };
  
    $scope.addListCollectionEvent = function() {
      factoryObs.addListCollectionEvent() 
        .then(function(response) {
          $scope.modalCollectionEvent.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/obs/modal-obs-name.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalObsName = modal;
    });
    
    $scope.addModalObsName = function() {
      $scope.modalObsName.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalObsName = function() {
      $scope.modalObsName.hide();
    };
  
    $scope.addListObsName = function() {
      factoryObs.addListObsName() 
        .then(function(response) {
          $scope.modalObsName.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/obs/modal-record-type.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalRecordType = modal;
    });
    
    $scope.addModalRecordType = function() {
      $scope.modalRecordType.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalRecordType = function() {
      $scope.modalRecordType.hide();
    };
  
    $scope.addListRecordType = function() {
      factoryObs.addListRecordType() 
        .then(function(response) {
          $scope.modalRecordType.hide();
        }
      );
    };

    $ionicModal.fromTemplateUrl('templates/obs/modal-taxon-group.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modalTaxonGroup = modal;
    });
    
    $scope.addModalTaxonGroup = function() {
      $scope.modalTaxonGroup.show();
      $scope._obs.nameValue = "";
    };
    
    $scope.closeModalTaxonGroup = function() {
      $scope.modalTaxonGroup.hide();
    };
  
    $scope.addListTaxonGroup = function() {
      factoryObs.addListTaxonGroup() 
        .then(function(response) {
          $scope.modalTaxonGroup.hide();
        }
      );
    };

  }
)

.controller('entryCtrl', function ($scope, $http, factoryEntry, ionicDatePicker) {

  $scope._entry = factoryEntry;

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        var date = new Date(val);
        $scope._entry.dateEntry = date.getDate() +' - '+ (date.getMonth()+1) +' - '+ date.getFullYear();
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

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

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
);
