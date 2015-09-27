'use strict';
angular.module('millenium.login.controllers')
  .controller('loginWidgetController', function ($scope, authorizationService, identityStoreService, $timeout, $state, MILLENIUM) {

    $scope.authorizationService = authorizationService;
    $scope.identityStoreService = identityStoreService;

    $scope.isAuthorized = function () {
      return $scope.authorizationService.isAuthorized();
    };

    $scope.logout = function () {
      $scope.authorizationService.logout();
      $timeout(function () {
        $state.go('login');
      });
    };

    $scope.isAdmin = function () {
      return $scope.identityStoreService.getIdentity().hasRole(MILLENIUM.roles.ADMIN.slug);
    };

  });
