'use strict';
angular.module('millenium.services')
  .service('resourceService', function ($resource, resourceExtensions, ENV) {

    var self = this;

    this.apiUrlTemplate = ENV.apiEndpoint + '_RESOURCE_/:id';


    var ServiceForResource = function (resourceName, extensions) {

      this.resourceName = resourceName;
      this.apiUrl = self.apiUrlTemplate.replace('_RESOURCE_', this.resourceName);
      var actions = {
        'update': {method: 'PUT'},
        'query': {method: 'GET', isArray: false},
        'count': {
          url: (ENV.apiEndpoint + '_RESOURCE_/count').replace('_RESOURCE_', this.resourceName),
          method: 'GET', isArray: false
        },
        'removeMedia': {
          url: (ENV.apiEndpoint + '_RESOURCE_/:id/media').replace('_RESOURCE_', this.resourceName),
          method: 'PUT', isArray: false
        },
        'getMedia': {
          url: (ENV.apiEndpoint + '_RESOURCE_/:id/media').replace('_RESOURCE_', this.resourceName),
          method: 'GET', isArray: true
        }
      };
      if (extensions) {
        for (var i = 0; i < extensions.length; i++) {
          var extension = extensions[i];
          actions = angular.merge(actions, extension.method);

          //this[extension.name] = function () {
          //  var functionName = extension.name;
          //  if (!extension.method[functionName].method || extension.method[functionName].method === 'GET') {
          //    return this.ngResourceApi[functionName](arguments[0]).$promise;
          //  }
          //  return this.ngResourceApi[functionName](arguments[0], arguments[1]).$promise;
          //};
        }
      }
      this.ngResourceApi = $resource(this.apiUrl, {id: '@id'}, actions);

      this.get = function (id, expand) {
        var params = {id: id};
        if (expand) {
          params.include = expand;
        }
        return this.ngResourceApi.get(params).$promise.then(function (result) {
          return result;
        });
      };

      this.save = function (item) {
        return this.ngResourceApi.save(item).$promise;
      };

      this.update = function (id, item) {
        return this.ngResourceApi.update({id: id}, item).$promise;
      };

      this.removeMedia = function (id, imageId) {
        return this.ngResourceApi.removeMedia({id: id}, imageId).$promise;
      };

      this.getMedia = function (id) {
        return this.ngResourceApi.getMedia({id: id}).$promise;
      };

      this.delete = function (id) {
        return this.ngResourceApi.delete({id: id}).$promise;
      };

      this.query = function (parameters) {
        return this.ngResourceApi.query(parameters).$promise;
      };

      this.count = function (parameters) {
        return this.ngResourceApi.count(parameters).$promise
          .then(function (result) {
            return result.count;
          });
        //return this.ngResourceApi.query(parameters).$promise
        //  .then(function (result) {
        //    return result.meta.pagination.total;
        //  });
      };

      this.resource = function () {
        return this.ngResourceApi;
      };
    };

    var factory = function (resourceName) {
      if (resourceExtensions.hasOwnProperty(resourceName)) {
        var resourceExtension = resourceExtensions[resourceName];
        var extensions = [];
        for (var i = 0; i < resourceExtension.methods.length; i++) {
          var extensionMethod = resourceExtension.methods[i];
          var extension = {
            name: extensionMethod.name,
            method: {}
          };
          extension.method[extensionMethod.name] = {
            url: (ENV.apiEndpoint + '_RESOURCE_/' + extensionMethod.urlSuffix).replace('_RESOURCE_', resourceName),
            method: extensionMethod.method,
            isArray: extensionMethod.isArray,
            params: extensionMethod.params
          };
          if (extensionMethod.transformResponse) {
            extension.method[extensionMethod.name].transformResponse = extensionMethod.transformResponse;
          }
          extensions.push(extension);
        }
        return new ServiceForResource(resourceName, extensions);
      }
      return new ServiceForResource(resourceName);
    };

    return {
      forResource: factory
    };
  })
;
