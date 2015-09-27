'use strict';
angular.module('millenium.login.controllers')
  .controller('loginController', function ($scope, authorizationService, $timeout, $state) {
    $scope.itemSource = {
      username: '',
      password: ''
    };

    $scope.login = function () {
      authorizationService.login($scope.itemSource)
        .then(function () {
          $timeout(function () {
            $state.go('millenium.home');
          });
        })
        .catch(function () {
          $scope.errorMessage = 'Username or password not valid.';
        });
    };
  });
