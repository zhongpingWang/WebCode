'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.version'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/view1' });
}]).controller('TextController',
      function ($scope) {
          var someText = {};
          someText.message = 'You have started your journey.';
          $scope.someText = someText;
      });
