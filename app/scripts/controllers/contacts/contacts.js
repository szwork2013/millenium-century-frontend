'use strict';
angular.module('millenium.contacts.controllers')
	.controller('contactsController', function($scope, content){
		$scope.content = content;
	});