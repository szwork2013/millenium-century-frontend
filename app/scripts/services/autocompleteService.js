'use strict';
function autocompleteService(resourceService, notificationService) {

  function prepareDefaultConfig(fields, text, operator, moreFilters) {

    if (text === '*') {
      if (moreFilters) {
        return {
          search: moreFilters,
          limit: 999999
        };
      }
      return {
        limit: 999999
      };
    }

    return {
      search: fields + ':' + (operator ? operator : 'like') + ':' + text + (moreFilters ? ';' + moreFilters : ''),
      limit: 999999
    };
  }

  function query(resource, config) {
    return resource.query(config).then(
      function (result) {
        return result.data;
      }, function (err) {
        notificationService.error(err);
      }
    );
  }

  function customers(text) {
    return query(resourceService.forResource('customers'), prepareDefaultConfig('firstName,lastName,companyName,email,fax,phone,cell', text));
  }

  function locations(text) {
    return query(resourceService.forResource('locations'), angular.extend(prepareDefaultConfig('name,district.name,province.name', text), {include: 'district,province'}));
  }

  function commercials(text) {
    return query(resourceService.forResource('users'), prepareDefaultConfig('firstName,lastName', text, 'like', 'roles.slug:=,whereHas:salesrepresentative'));
  }

  function regions(text) {
    return query(resourceService.forResource('regions'), prepareDefaultConfig('name', text));
  }

  function provinces(text) {
    return query(resourceService.forResource('provinces'), prepareDefaultConfig('name', text));
  }

  function districts(text) {
    return query(resourceService.forResource('districts'), prepareDefaultConfig('name', text));
  }

  function modernLogisticArticles(text) {
    return query(resourceService.forResource('logisticArticles'), prepareDefaultConfig('description', text, 'like', 'type.description:=:Piatti'));
  }

  function elegantLogisticArticles(text) {
    return query(resourceService.forResource('logisticArticles'), prepareDefaultConfig('description', text, 'like', 'type.description:=:Piatti'));
  }

  function countryLogisticArticles(text) {
    return query(resourceService.forResource('logisticArticles'), prepareDefaultConfig('description', text, 'like', 'type.description:=:Piatti'));
  }

  return {
    customers: customers,
    locations: locations,
    commercials: commercials,
    regions: regions,
    provinces: provinces,
    districts: districts,
    modernLogisticArticles: modernLogisticArticles,
    elegantLogisticArticles: elegantLogisticArticles,
    countryLogisticArticles: countryLogisticArticles
  };
}

angular.module('millenium.services')
  .factory('autocompleteService', autocompleteService);
