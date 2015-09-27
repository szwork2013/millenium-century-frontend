'use strict';

angular.module('millenium.directives').directive('cmswSortable', function () {
  return {
    restrict: 'A',
    replace: true,
    transclude: true,
    scope: {
      sortData: '=cmswSortable',
      propertyName: '@sortProperty',
      title: '@sortTitle'
    },
    template: '<th class=\'sortable\' ng-class=\'sortData.getSortClass(propertyName)\' ng-click=\'sortData.toggleSort(propertyName,title)\'>{{title}}<span ng-transclude></span><span class=\'pull-right\' ng-class=\'sortData.getSortIconClass(propertyName)\'></span></th>'
  };
});
