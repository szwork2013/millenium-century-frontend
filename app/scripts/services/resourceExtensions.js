'use strict';
angular.module('millenium.services')
  .constant('resourceExtensions', {
    customerRequests: {
      methods: [
        {
          name: 'changeState',
          urlSuffix: ':id/changeState',
          method: 'PUT',
          isArray: false
        },
        {
          name: 'export',
          urlSuffix: 'export',
          method: 'GET',
          transformResponse: function (data, headers) {
            var response = {};
            response.data = data;
            response.headers = headers();
            return response;
          },
          isArray: false
        }
      ]
    },
    quotes: {
      methods: [
        {
          name: 'changeState',
          urlSuffix: ':id/changeState',
          method: 'PUT',
          isArray: false
        }
      ]
    },
    users: {
      methods: [
        {
          name: 'attachRole',
          urlSuffix: ':id/roles',
          method: 'POST',
          isArray: false
        },
        {
          name: 'updateRole',
          urlSuffix: ':id/roles/:roleId',
          method: 'PUT',
          isArray: false
        },
        {
          name: 'detachRole',
          urlSuffix: ':id/roles/:roleId',
          method: 'DELETE',
          isArray: false
        },
        {
          name: 'activate',
          urlSuffix: ':id/activate',
          method: 'PUT',
          isArray: false
        }
      ]
    }
  });
