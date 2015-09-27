'use strict';

angular.module('millenium.templates')
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('modal-service-template',
      '<div class="modal-header">' +
      ' <h3>{{modalOptions.headerText}}</h3>' +
      '</div>' +
      '<div class="modal-body">' +
      ' <p>{{modalOptions.bodyText}}</p>' +
      '</div>' +
      '<div class="modal-footer">' +
      ' <button type="button" class="btn" data-ng-click="modalOptions.close()">{{modalOptions.closeButtonText}}</button>' +
      ' <button type="button" class="btn btn-primary" data-ng-click="modalOptions.ok()">{{modalOptions.actionButtonText}}</button>' +
      '</div>' +
      '');
  }]);


