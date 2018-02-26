// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'ionic-datepicker', 'ionic-timepicker'])

.run(function($ionicPlatform, $cordovaSQLite) {
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

    ionic.Platform.ready(function () {   
        if (window.cordova) {
            db = $cordovaSQLite.openDB({
                name: "my.db",
                location: 1
            })
        } else {
            db = window.sqlitePlugin.openDatabase({
                name: 'my.db',
                location: 1,
                androidDatabaseImplementation: 2
            });
        }
    });

    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
        tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
        tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
    }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
        console.log('Populated database OK');
    });
    
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, ionicDatePickerProvider, ionicTimePickerProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $ionicConfigProvider.tabs.position('bottom');

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

  // setup an abstract state for the tabs directive

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
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

  .state('app.species', {
    url: '/species',
    views: {
      'menuContent': {
        templateUrl: 'templates/tabs-species.html'
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

  .state('app.site', {
    url: '/site',
    views: {
      'menuContent': {
        templateUrl: 'templates/site.html',
        controller: 'siteCtrl'
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
  
  .state('app.parts', {
    url: '/parts',
    views: {
      'menuContent': {
        templateUrl: 'templates/parts.html',
        controller: 'partsCtrl'
      }
    }
  })

  // Each tab has its own nav history stack:

  .state('app.species.specimen', {
    url: '/specimen',
    views: {
      'tab-specimen': {
        templateUrl: 'templates/specimen/specimen.html',
        controller: 'AppCtrl'
      }
    }
  })

  .state('app.species.parts', {
      url: '/parts',
      views: {
        'tab-parts': {
          templateUrl: 'templates/specimen/parts.html',
          controller: 'ChatsCtrl'
        }
      }
    })

    .state('app.species.measurement', {
      url: '/measurement',
      views: {
        'tab-measurement': {
          templateUrl: 'templates/specimen/measurement.html',
          controller: 'ChatsCtrl'
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
          controller: 'ChatsCtrl'
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
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/species/specimen');

});
