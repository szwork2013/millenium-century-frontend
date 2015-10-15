'use strict';
angular.module('millenium.about.routes', [])
	.config(function ($stateProvider) {
		$stateProvider
			.state('millenium.about', {
				url: '/about',
				templateUrl: '../../views/about/index.html',
				controller: 'aboutController',
				pageTitle: 'About'
			});
	});