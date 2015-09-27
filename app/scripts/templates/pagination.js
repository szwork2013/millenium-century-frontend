'use strict';

angular.module('millenium.templates')
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('pagination-full-template',
      '<div class="row">' +
      '<div class="col-sm-6">' +
      '<span>Pagina {{pageData.currentPage}} di {{pageData.totalPages}}</span>' +
      '</div>' +
      '<div class="col-sm-2 col-sm-offset-2">' +
      '<select class="form-control input-sm pull right text-right" ng-model="pageData.itemsPerPage" ng-options="item.value as item.description for item in itemsPerPage" ng-change="changeLimit()">' +
      '</select>' +
      '</div>' +
      '<div class="col-sm-2">' +
      '<div cmsw-pagination="pageData" search="search()"></div>' +
      '</div>' +
      '</div>' +
      '');
    $templateCache.put('pagination-template',
      '<pagination boundary-links="false" total-items="pageData.totalItems" ng-model="pageData.currentPage" items-per-page="pageData.itemsPerPage" max-size="5" class="pagination-sm pull-right" previous-text="&lsaquo;" next-text="&rsaquo;" ng-change="search()"></pagination>' +
      '');
  }]);


