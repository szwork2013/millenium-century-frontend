'use strict';

angular.module('millenium.controllers')
  .controller('homeController', function ($scope, $state, resourceService, identityStoreService) {

    var loggeduser = {
      id: identityStoreService.getIdentity().data.id
    }

    $scope.customerRequests = {
      pending: 0,
      assigned: 0
    };

    $scope.myCustomerRequests = {
      assigned: 0,
      processed: 0
    }

    //var toDate = moment().add(1, 'days');
    //var fromDate = moment(toDate).subtract(1, 'months').subtract(1, 'days');

    var customerRequestResourceService = resourceService.forResource('customerRequests');

    customerRequestResourceService
      .count({
        search: 'state:=:PENDING;'
      })
      .then(function (result) {
        $scope.customerRequests.pending = result;
      });

    customerRequestResourceService
      .count({
        search: 'state:=:ASSIGNED;'
      })
      .then(function (result) {
        $scope.customerRequests.assigned = result;
      });

    customerRequestResourceService
      .count({
        search: 'state:=:ASSIGNED;commercial_id:=:' + loggeduser.id
      })
      .then(function (result) {
        $scope.myCustomerRequests.assigned = result;
      });

    customerRequestResourceService
      .count({
        search: 'state:=:PROCESSED;commercial_id:=:' + loggeduser.id
      })
      .then(function (result) {
        $scope.myCustomerRequests.processed = result;
      });

    $scope.toCustomerRequests = function (state) {
      $state.go('millenium.customerRequests', {st: state, co: null});
    };

    $scope.toMyCustomerRequests = function (state) {
      $state.go('millenium.customerRequests', {st: state, co: 'users*' + loggeduser.id + '*'});
    };

    //customerRequestResourceService.changeState({id: 1}, {state: 'PROCESSED'});

  });
