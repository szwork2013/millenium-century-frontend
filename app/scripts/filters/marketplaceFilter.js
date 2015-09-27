'use strict';
angular.module('millenium.filters')
  .filter('marketplaceFilter', function (MILLENIUM) {
    return function (input) {
      for (var x = 0; x < MILLENIUM.marketplaces.length; x++) {
        if (input === MILLENIUM.marketplaces[x].value) {
          return MILLENIUM.marketplaces[x].description;
        }
      }
    };
  });
