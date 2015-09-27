'use strict';
angular.module('millenium.filters')
  .filter('roleFilter', function (MILLENIUM) {
    return function (input) {
      if (MILLENIUM.roles.hasOwnProperty(input)) {
        return MILLENIUM.roles[input].description;
      }
      return '';
    };
  }).filter('rolesFilter', function ($filter) {
    return function (inputArray) {
      var roles = [];
      for (var i = 0; i < inputArray.length; i++) {
        roles.push($filter('roleFilter')($filter('uppercase')(inputArray[i].slug)));
      }
      return roles.join('; ');
    };
  });
