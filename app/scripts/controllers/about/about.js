'use strict';
angular.module('millenium.about.controllers')
	.controller('aboutController', function($scope, content){
		$scope.content = content;
	});