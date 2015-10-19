'use strict';
angular.module('millenium.contacts.routes', [])
	.config(function ($stateProvider) {
		$stateProvider
			.state('millenium.contacts', {
				url: '/contacts',
				templateUrl: '../../views/contacts/index.html',
				controller: 'contactsController',
				resolve: {
					content: function(resourceService){
						return resourceService.forResource('contacts')
							.get()
								.then(function(result){
									return result;
								})
					}
				}
			});
	});