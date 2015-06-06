'use strict';

angular.module('myApp.taskList', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/taskList', {
        templateUrl: 'partials/taskList/taskList.html',
        controller: 'taskListCtrl'
    });
}])

.controller('taskListCtrl', [function ($scope) {
    console.log("load taskList");
}]);