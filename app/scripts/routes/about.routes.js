'use strict';
angular.module('millenium.about.routes', [])
	.config(function ($stateProvider) {
		$stateProvider
			.state('millenium.about', {
				url: '/about',
				templateUrl: '../../views/about/index.html',
				controller: 'aboutController',
				resolve: {
					content: function(resourceService){
						return resourceService.forResource('about')
							.get()
								.then(function(result){
									return result;
								})
					}
				},
				pageTitle: 'About'
			});
	});