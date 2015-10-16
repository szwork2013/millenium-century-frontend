'use strict';
angular.module('millenium.page.controllers')
	.controller('pageController', function($scope, content){
		$scope.content = content;
	});