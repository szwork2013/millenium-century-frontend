'use strict';
angular.module('millenium.controllers')
  .controller('menuController', function ($scope, authorizationService, identityStoreService) {

    $scope.authorizationService = authorizationService;
    $scope.identity = function () {
      return identityStoreService.getIdentity();
    };

    $scope.isAuthorized = function () {
      return $scope.authorizationService.isAuthorized();
    };

  });
