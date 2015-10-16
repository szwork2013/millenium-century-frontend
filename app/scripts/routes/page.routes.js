'use strict';
angular.module('millenium.page.routes', [])
	.config(function ($stateProvider) {
		$stateProvider
			.state('millenium.page', {
				url: '/page/{pageSlug}',
				templateUrl: '../../views/page/index.html',
				controller: 'pageController',
				resolve: {
					content: function(resourceService, $state, $stateParams){
						if ($stateParams.pageSlug !== null && $stateParams.pageSlug !== undefined) {
							return resourceService.forResource($stateParams.pageSlug)
								.get()
									.then(function(result){
										return result;
									})
						}
						return null;
					}
				}
			});
	});