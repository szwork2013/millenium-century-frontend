'use strict';
angular.module('millenium.controllers')
  .controller('menuController', function ($scope, authorizationService, identityStoreService, resourceService) {
	
	resourceService.forResource('menuItems')
		.get()
			.then(function(result){
				$scope.menuItems = result.menuItems;
			});
	

    $scope.authorizationService = authorizationService;
    $scope.identity = function () {
      return identityStoreService.getIdentity();
    };

    $scope.isAuthorized = function () {
      return $scope.authorizationService.isAuthorized();
    };

  });
