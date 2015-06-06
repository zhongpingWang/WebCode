'use strict';

angular.module('myApp.taskTree', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/taskTree', {
        templateUrl: 'partials/taskTree/taskTree.html',
        controller: 'taskTreeCtrl'
    });
}])

.controller('taskTreeCtrl', [function ($scope, taskCenterController) {
    $scope.TaskCenter.Settings.isTaskTree = true;
}]);