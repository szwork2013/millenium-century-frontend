'use strict';
angular.module('millenium.filters')
  .filter('stateFilter', function (MILLENIUM) {
    return function (input, entity) {

      if (entity === 'customerRequest') {
        for (var x = 0; x < MILLENIUM.customerRequestsStates.length; x++) {
          if (input === MILLENIUM.customerRequestsStates[x].value) {
            return MILLENIUM.customerRequestsStates[x].description;
          }
        }
      } else if (entity === 'quote') {
        for (var y = 0; y < MILLENIUM.quotesStates.length; y++) {
          if (input === MILLENIUM.quotesStates[y].value) {
            return MILLENIUM.quotesStates[y].description;
          }
        }
      }
      return '';
    };
  });
