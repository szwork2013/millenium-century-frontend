'use strict';

angular.module('millenium.templates')
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('error-messages',
      '<span class="help-block" ng-message="email">Il campo deve essere un\'email valida</span>\n' +
      '<span class="help-block" ng-message="max">Il valore è troppo grande</span>\n' +
      '<span class="help-block" ng-message="min">Il valore è troppo piccolo</span>\n' +
      '<span class="help-block" ng-message="maxlength">Il campo è troppo lungo</span>\n' +
      '<span class="help-block" ng-message="minlength">Il campo è troppo corto</span>\n' +
      '<span class="help-block" ng-message="number">Il valore deve essere un numero</span>\n' +
      '<span class="help-block" ng-message="pattern">Il campo non rispetta le regole definite</span>\n' +
      '<span class="help-block" ng-message="required">Il campo è obbligatorio</span>\n' +
      '<span class="help-block" ng-message="url">Il campo deve essere un url valido</span>\n' +
      '<span class="help-block" ng-message="date">Il campo deve essere una data valida</span>\n' +
      '<span class="help-block" ng-message="datetimelocal">Il campo deve essere una data valida</span>\n' +
      '<span class="help-block" ng-message="time">Il campo deve essere una data valida</span>\n' +
      '<span class="help-block" ng-message="week">Il campo deve essere una settimana valida</span>\n' +
      '<span class="help-block" ng-message="month">Il campo deve essere un mese valido</span>\n' +
      '<span class="help-block" ng-message="parse">Il valore non è valido</span>\n' +
      '');
  }]);
