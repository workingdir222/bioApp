// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'ionic-datepicker', 'ionic-timepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, ionicDatePickerProvider, ionicTimePickerProvider) {

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.views.maxCache(0);

  var datePickerObj = {
    inputDate: new Date(),
    titleLabel: 'Select a Date',
    setLabel: 'Set',
    todayLabel: 'Today',
    closeLabel: 'Close',
    mondayFirst: false,
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    templateType: 'popup',
    from: new Date(2012, 8, 1),
    to: new Date(2018, 8, 1),
    showTodayButton: true,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: false,
    disableWeekdays: []
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);

  var timePickerObj = {
    inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
    format: 12,
    step: 15,
    setLabel: 'Set',
    closeLabel: 'Close'
  };
  ionicTimePickerProvider.configTimePicker(timePickerObj);

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.project', {
    url: '/project',
    views: {
      'menuContent': {
        templateUrl: 'templates/project/project.html',
        controller: 'projectCtrl'
      }
    }
  })

  .state('app.project-detail-menu', {
    url: '/project-detail-menu/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/project/detail-project-menu.html',
        controller: 'ProjectDetailCtrl'
      }
    }
  })

  .state('app.project-detail-specimen', {
    url: '/project-detail-specimen/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/project/detail-project-specimen.html',
        controller: 'ProjectDetailCtrl'
      }
    }
  })

  .state('app.project.listproject', {
    url: '/listproject',
    views: {
      'tab-list-project': {
        templateUrl: 'templates/project/list-project.html',
        controller: 'listProjectCtrl'
      }
    }
  })

  .state('app.species', {
    url: '/species',
    views: {
      'menuContent': {
        templateUrl: 'templates/tabs-species.html'
      }
    }
  })

  .state('app.species.specimen', {
    url: '/specimen/:id',
    views: {
      'tab-specimen': {
        templateUrl: 'templates/specimen/specimen.html',
        controller: 'speciesCtrl'
      }
    }
  })

  .state('app.species.specimen-edit', {
    url: '/specimen-edit/:id',
    views: {
      'tab-specimen': {
        templateUrl: 'templates/specimen/specimen-edit.html',
        controller: 'speciesCtrl'
      }
    }
  })

  .state('app.species.parts', {
      url: '/parts',
      views: {
        'tab-parts': {
          templateUrl: 'templates/specimen/parts.html',
          controller: 'speciesCtrl'
        }
      }
    })

    .state('app.species.measurement', {
      url: '/measurement',
      views: {
        'tab-measurement': {
          templateUrl: 'templates/specimen/measurement.html',
          controller: 'speciesCtrl'
        }
      }
    })

    .state('app.species.capture', {
      url: '/capture',
      views: {
        'tab-capture': {
          templateUrl: 'templates/specimen/capture.html',
          controller: 'speciesCtrl'
        }
      }
    })

  .state('app.species.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/specimen/tab-chats.html',
          controller: 'speciesCtrl'
        }
      }
  })

  .state('app.species.chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
})

  .state('app.species.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('app.project-detail-event', {
    url: '/project-detail-event/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/project/detail-project-event.html',
        controller: 'ProjectDetailCtrl'
      }
    }
  })

  .state('app.event', {
    url: '/event',
    views: {
      'menuContent': {
        templateUrl: 'templates/event.html',
        controller: 'eventCtrl'
      }
    }
  })

  .state('app.project-detail-site', {
    url: '/project-detail-site/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/project/detail-project-site.html',
        controller: 'ProjectDetailCtrl'
      }
    }
  })

  .state('app.site', {
    url: '/site',
    views: {
      'menuContent': {
        templateUrl: 'templates/site.html',
        controller: 'siteCtrl'
      }
    }
  })

  .state('app.project-detail-capture', {
    url: '/project-detail-capture/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/project/detail-project-capture.html',
        controller: 'ProjectDetailCtrl'
      }
    }
  })

  .state('app.project-detail-orb', {
    url: '/project-detail-orb/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/project/detail-project-orb.html',
        controller: 'ProjectDetailCtrl'
      }
    }
  })

  .state('app.project-detail-entry', {
    url: '/project-detail-entry/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/project/detail-project-entry.html',
        controller: 'ProjectDetailCtrl'
      }
    }
  })

  .state('app.staf', {
    url: '/staf',
    views: {
      'menuContent': {
        templateUrl: 'templates/staf.html',
        controller: 'stafCtrl'
      }
    }
  })

  .state('app.capture', {
    url: '/capture',
    views: {
      'menuContent': {
        templateUrl: 'templates/capture.html',
        controller: 'captureCtrl'
      }
    }
  })

  .state('app.orb', {
    url: '/orb',
    views: {
      'menuContent': {
        templateUrl: 'templates/orb.html',
        controller: 'orbCtrl'
      }
    }
  })

  .state('app.entry', {
    url: '/entry',
    views: {
      'menuContent': {
        templateUrl: 'templates/entry.html',
        controller: 'entryCtrl'
      }
    }
  })
  
  .state('app.parts', {
    url: '/parts',
    views: {
      'menuContent': {
        templateUrl: 'templates/parts.html',
        controller: 'partsCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/project');

});
