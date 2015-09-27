'use strict';

var serviceFunction = function (identityStoreService, $q, authorizationService, $injector) {
  var authInterceptorServiceInstance = {};
  var $http;
  var matchUrlFn = this.matchUrl;
  var configuration = this.config;

  var addAuthorizationHeader = function (headers) {
    var identity = identityStoreService.getIdentity();
    if (identity && identity.token) {
      headers.Authorization = 'Bearer ' + identity.token;
    }
  };

  var addAuthorizationParameter = function (config) {
    var identity = identityStoreService.getIdentity();
    if (identity && identity.token) {
      if (config.method === 'GET') {
        config.params = config.params || {};
        config.params.access_token = identity.token;
      } else {
        config.data = config.data || {};
        config.data.access_token = identity.token;
      }
    }
  };

  var addAuthorization = function (config) {
    if (configuration.useHeaders) {
      config.headers = config.headers || {};
      addAuthorizationHeader(config.headers);
    } else {
      config.params = config.params || {};
      addAuthorizationParameter(config);
    }
  };

  var request = function (config) {
    if (matchUrlFn(config.url)) {
      addAuthorization(config);
    }
    return config;
  };

  var manageStatusCode401 = function (rejection, retryFn, failFn) {
    if (rejection.status === 401) {
      if (rejection.config.data && rejection.config.data.indexOf('grant_type=refresh_token') >= 0) {
        failFn();
      }
      if (typeof retryFn === 'function') {
        authorizationService.refreshToken().then(retryFn, failFn);
      } else {
        failFn();
      }
      return true;
    }
    return false;
  };

  var retryHttpRequest = function (config, deferred) {
    $http = $http || $injector.get('$http');
    $http(config).then(function (response) {
      deferred.resolve(response);
    }, function (response) {
      deferred.reject(response);
    });
  };

  var responseError = function (rejection) {
    var deferred = $q.defer();

    function retryFn() {
      retryHttpRequest(rejection.config, deferred);
    }

    function failFn() {
      deferred.reject(rejection);
    }

    if (!manageStatusCode401(rejection, retryFn, failFn)) {
      failFn();
    }

    return deferred.promise;
  };

  authInterceptorServiceInstance.request = request;
  authInterceptorServiceInstance.responseError = responseError;
  authInterceptorServiceInstance.addAuthorizationHeader = addAuthorizationHeader;
  authInterceptorServiceInstance.manageStatusCode401 = manageStatusCode401;

  return authInterceptorServiceInstance;
};

var providerFunction = function () {

  var self = this;

  this.matchUrl = function (requestUrl) {
    var ret = false;
    for (var i = 0; i < self.config.urlFilter.length; i++) {
      var match = self.config.urlFilter[i];
      ret = ret || requestUrl.indexOf(match) >= 0;
    }
    return ret;
  };

  this.config = {
    useHeaders: true,
    urlFilter: []
  };

  this.$get = ['identityStoreService', '$q', 'authorizationService', '$injector', serviceFunction];
};

angular.module('millenium.services')
  .provider('authInterceptorService', providerFunction);
