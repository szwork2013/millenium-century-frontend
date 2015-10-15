'use strict';
angular.module('millenium.services.routes', [])
	.config(function ($stateProvider) {
		$stateProvider
			.state('millenium.services', {
				url: '/services',
				templateUrl: '../../views/services/index.html',
				controller: 'servicesController',
				resolve: {
					content: function(resourceService){
						return resourceService.forResource('services')
							.get()
								.then(function(result){
									return result;
								})
					}
				},
				pageTitle: 'Services'
			});
	});