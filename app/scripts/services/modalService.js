'use strict';
angular.module('millenium.services').service('modalService',
  function ($modal) {

    var modalDefaults = {
      backdrop: true,
      keyboard: true,
      modalFade: true,
      templateUrl: 'modal-service-template',
      //TODO: riabilitare le animazioni quando ui-bootstrap supporterà a pieno angular 1.4
      animation: false
    };

    var modalOptions = {
      closeButtonText: 'Chiudi',
      actionButtonText: 'OK',
      headerText: 'Continuare?',
      bodyText: ''
    };

    this.confirmDeletionDialog = function () {
      return this.confirmDialog('Sei sicuro di voler eliminare l\'oggetto?');
    };

    this.confirmDialog = function (message) {
      return this.showModal(null, {closeButtonText: 'Annulla', bodyText: message});
    };

    this.showModal = function (customModalDefaults, customModalOptions) {
      if (!customModalDefaults) {
        customModalDefaults = {};
      }
      customModalDefaults.backdrop = 'static';
      return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {
      //Create temp objects to work with since we're in a singleton service
      var tempModalDefaults = {};
      var tempModalOptions = {};

      //Map angular-ui modal custom defaults to modal defaults defined in service
      angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

      //Map modal.html $scope custom properties to defaults defined in service
      angular.extend(tempModalOptions, modalOptions, customModalOptions);

      if (!tempModalDefaults.controller) {
        tempModalDefaults.resolve = {
          tempModalOptions: function () {
            return tempModalOptions;
          }
        };
        tempModalDefaults.controller = ['$scope', '$modalInstance', 'tempModalOptions',
          function ($scope, $modalInstance, tempModalOptions) {
            $scope.modalOptions = tempModalOptions;
            $scope.modalOptions.ok = function (result) {
              $modalInstance.close(result);
            };
            $scope.modalOptions.close = function () {
              $modalInstance.dismiss('cancel');
            };
          }];
      }

      return $modal.open(tempModalDefaults).result;
    };
  });
