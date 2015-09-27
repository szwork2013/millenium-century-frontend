'use strict';

angular.module('millenium.services')
  .service('identityStoreService', function (localStorageService) {

    var self = this;

    self.clearIdentity = function () {
      self.identity = {
        token: null,
        refreshToken: null,
        isAuth: false,
        data: null
      };
      localStorageService.set('identity', self.identity);
    };

    //self.clearIdentity();

    self.storeIdentityData = function (data) {
      self.getIdentity().data = data;
      localStorageService.set('identity', self.identity);
    };

    self.setTokens = function (token, refreshToken) {
      self.getIdentity().token = token;
      self.getIdentity().refreshToken = refreshToken;
      self.getIdentity().isAuth = true;
      localStorageService.set('identity', self.identity);
    };

    self.getIdentity = function () {

      self.identity = self.identity || localStorageService.get('identity');
      if (!self.identity) {
        self.clearIdentity();
      }

      self.identity.hasRole = function (role) {
        if (!role || !this.data || !this.data.roles || !angular.isArray(this.data.roles)) {
          return false;
        }
        var found = false;
        for (var i = 0; i < this.data.roles.length; i++) {
          if (this.data.roles[i].slug === role) {
            found = true;
            break;
          }
        }
        return found;
      };

      self.identity.hasRoles = function (roles) {
        if (!roles || !angular.isArray(roles)) {
          return false;
        }
        var ret = true;
        for (var i = 0; i < roles.length; i++) {
          ret = ret && this.hasRole(roles[i]);
          if (ret === false) {
            break;
          }
        }
        return ret;
      };

      return self.identity;
    };

  });
