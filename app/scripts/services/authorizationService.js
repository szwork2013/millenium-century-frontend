'use strict';

angular.module('millenium.services')
  .service('authorizationService', function ($q, $injector, ENV, identityStoreService) {
    var self = this;
    var $http;
    self.authEndpoint = ENV.apiEndpoint + 'oauth/access_token';

    self.getHttp = function () {
      $http = $http || $injector.get('$http');
      return $http;
    };

    self.isAuthorized = function () {
      return identityStoreService.getIdentity().isAuth === true;
    };

    self.authorize = function () {
      var deferred = $q.defer();
      var identity = identityStoreService.getIdentity();
      if (identity.token) {
        self.getIdentityInfo()
          .then(function (data) {
            identityStoreService.storeIdentityData(data);
            deferred.resolve();
          }).catch(function () {
            identityStoreService.clearIdentity();
            deferred.reject();
          });
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };


    self.logout = function () {
      identityStoreService.clearIdentity();
    };

    self.login = function (loginInfo) {
      var deferred = $q.defer();


      self.getHttp()({
        method: 'POST',
        url: self.authEndpoint,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
          }
          return str.join('&');
        },
        data: {
          grant_type: 'password',
          username: loginInfo.username,
          password: loginInfo.password,
          client_id: ENV.clientId,
          client_secret: ENV.clientSecret
        }
      }).success(function (response) {
        //noinspection JSUnresolvedVariable
        identityStoreService.setTokens(response.access_token, response.refresh_token);
        deferred.resolve();
      }).error(function (error) {
        identityStoreService.clearIdentity();
        deferred.reject(error);
      });

      return deferred.promise;
    };

    self.refreshTokenData = {
      isRefreshingToken: false,
      refreshPromise: function () {

      }
    };

    self.refreshToken = function () {
      if (self.refreshTokenData.isRefreshingToken) {
        return self.refreshTokenData.refreshPromise;
      }
      var deferred = $q.defer();
      var identity = identityStoreService.getIdentity();
      if (!identity.refreshToken) {
        deferred.reject('No refresh token');
      } else {
        var data = 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(identity.refreshToken) + '&client_id=' + ENV.clientId + '&client_secret=' + ENV.clientSecret;
        //identityStoreService.clearIdentity();
        self.getHttp().post(self.authEndpoint, data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .success(function (response) {
            //noinspection JSUnresolvedVariable
            identityStoreService.setTokens(response.access_token, response.refresh_token);
            self.refreshTokenData.isRefreshingToken = false;
            deferred.resolve();
          }).error(function (error) {
            identityStoreService.clearIdentity();
            self.refreshTokenData.isRefreshingToken = false;
            deferred.reject(error);
          });
      }
      self.refreshTokenData.isRefreshingToken = true;
      self.refreshTokenData.refreshPromise = deferred.promise;
      return self.refreshTokenData.refreshPromise;
    };

    self.getIdentityInfo = function () {
      var deferred = $q.defer();
      self.getHttp().get(ENV.apiEndpoint + 'users/info?include=roles')
        .success(function (data) {
          deferred.resolve(data);
        }).error(function () {
          identityStoreService.clearIdentity();
          deferred.reject();
        });
      return deferred.promise;
    };

  });
