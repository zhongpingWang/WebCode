'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.taskList',
  'myApp.taskTree'  
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/taskList' });
}]).controller('taskCenterController',
      function ($scope) {
          $scope.isError = false;
          $scope.isWarning = false;
          $scope.TaskCenter = TaskCenter; 
      });


var TaskCenter = {
    Settings:{
        isTaskList: true,
        isTaskTree:false
    }


}

//phonecatApp.config(['$routeProvider',
//  function ($routeProvider) {
//      $routeProvider.
//        when('/phones', {
//            templateUrl: 'partials/phone-list.html',
//            controller: 'PhoneListCtrl'
//        }).
//        when('/phones/:phoneId', {
//            templateUrl: 'partials/phone-detail.html',
//            controller: 'PhoneDetailCtrl'
//        }).
//        otherwise({
//            redirectTo: '/phones'
//        });
//  }]);
