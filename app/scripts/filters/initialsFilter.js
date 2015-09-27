'use strict';
angular.module('millenium.filters')
  .filter('initialsFilter', function () {
    return function (input) {
      var values = input.split(' ');
      var tmp = '';
      angular.forEach(values, function (value) {
        tmp += value.charAt(0).toUpperCase() + '. ';
      });
      return tmp;
    };
  });
