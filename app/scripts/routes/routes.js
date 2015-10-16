'use strict';
angular.module('millenium.routes', [
	'millenium.page.routes'
]);

angular.module('millenium.routes')
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('millenium', {
				abstract: true,
				template: '<div ui-view></div>',
				pageTitle: '-',
				reloadOnSearch: false,
				resolve: {
					/*authorize: [
						'authorizationService', '$timeout', '$state', function (authorizationService, $timeout, $state) {
							var promise = authorizationService.authorize();
							promise.then(
								function () {
									$timeout(function () {

									});
								}, function () {
									$timeout(function () {
										$state.go('login');
									});
								});
								return promise;
						}
					]*/
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: '../../views/login/login.html',
				controller: 'loginController'
			})
			.state('millenium.home', {
				url: '/',
				templateUrl: '../../views/home/home.html',
				controller: 'homeController',
				pageTitle: 'Home'
			});
			$urlRouterProvider.otherwise('/');
	});
