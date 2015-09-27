'use strict';

angular.module('millenium.directives')
  .directive('updateTitle', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
      return {
        link: function (scope, element) {

          var listener = function (event, toState) {

            var title = 'Millenium Century Contacting Corp.';
            if (toState && toState.pageTitle) {
              title = toState.pageTitle;
            }

            $timeout(function () {
              element.text(title);
            }, 0, false);
          };

          $rootScope.$on('$stateChangeSuccess', listener);
        }
      };
    }
  ]);
