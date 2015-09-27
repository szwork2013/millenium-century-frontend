'use strict';

angular.module('millenium.directives')
  .directive('cmswPaginationFull', function () {
    return {
      restrict: 'A',
      replace: false,
      transclude: true,
      scope: {
        pageData: '=cmswPaginationFull',
        search: '&search'
      },
      templateUrl: 'pagination-full-template',
      link: function (scope) {
        scope.itemsPerPage = [
          {value: 10, description: '10 elem. per pagina'},
          {value: 20, description: '20 elem. per pagina'},
          {value: 50, description: '50 elem. per pagina'},
          {value: 100, description: '100 elem. per pagina'}
        ];
        scope.changeLimit = function () {
          scope.pageData.currentPage = 1;
          scope.search();
        };
      }
    };
  })
  .directive('cmswPagination', function () {
    return {
      restrict: 'A',
      replace: false,
      transclude: true,
      scope: {
        pageData: '=cmswPagination',
        search: '&search'
      },
      templateUrl: 'pagination-template'
    };
  });
