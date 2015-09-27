'use strict';

function searchDataService() {

  function FilterData() {
    var self = this;

    this.addFilter = function (propertyName, filterName, operator, subPropertyName, subPropertyOperator) {
      if (!filterName) {
        filterName = propertyName + 'Filter';
      }
      self[filterName] = {
        'propertyName': propertyName,
        'operator': operator,
        'subPropertyName': subPropertyName,
        'subPropertyOperator': subPropertyOperator,
        'value': null,
        'isValid': false
      };
      return self;
    };
    this.addContainsFilter = function (propertyName, filterName) {
      return self.addFilter(propertyName, filterName, 'like');
    };
    this.addEqualsFilter = function (propertyName, filterName) {
      return self.addFilter(propertyName, filterName, '=');
    };
    //noinspection JSUnusedGlobalSymbols
    this.addLesserFilter = function (propertyName, filterName) {
      return self.addFilter(propertyName, filterName, '<');
    };
    //noinspection JSUnusedGlobalSymbols
    this.addGreaterFilter = function (propertyName, filterName) {
      return self.addFilter(propertyName, filterName, '>');
    };
    this.addLesserOrEqualFilter = function (propertyName, filterName) {
      return self.addFilter(propertyName, filterName, '<=');
    };
    this.addGreaterOrEqualFilter = function (propertyName, filterName) {
      return self.addFilter(propertyName, filterName, '>=');
    };
    this.createQueryParameters = function () {
      var ret = {
        search: ''
      };

      var statements = [];
      for (var key in self) {
        var data = self[key];
        if (angular.isDefined(data.value) && data.value !== null && data.value !== undefined && data.value !== '' && data.propertyName && data.operator) {
          var filterValue = data.value;
          if (filterValue.id) {
            filterValue = filterValue.id;
          } else if (angular.isDate(filterValue)) {
            filterValue = moment(filterValue).format('YYYY-MM-DD');
          }
          filterValue = encodeURIComponent(filterValue);
          statements.push(data.propertyName + ':' + data.operator + ':' + filterValue);
        }
      }
      if (statements.length === 0) {
        return {};
      }
      ret.search = statements.join(';');
      return ret;
    };
    this.clean = function () {
      for (var key in self) {
        var data = self[key];
        if (angular.isDefined(data.value) && data.propertyName && data.operator) {
          data.value = null;
        }
      }
    };
  }

  function PageData() {
    var self = this;

    this.totalItems = 0;
    //noinspection JSUnusedGlobalSymbols
    this.itemsInPage = 0;
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalPages = 1;

    this.fromResponse = function (pagination) {
      self.totalItems = pagination.total;
      self.itemsInPage = pagination.count;
      //noinspection JSUnresolvedVariable
      self.itemsPerPage = pagination.per_page;
      //noinspection JSUnresolvedVariable
      self.currentPage = pagination.current_page;
      //noinspection JSUnresolvedVariable
      self.totalPages = pagination.total_pages;

      return self;
    };

    //noinspection JSUnusedGlobalSymbols
    this.setItemsPerPage = function (itemsPerPage) {
      self.itemsPerPage = itemsPerPage;
      return self;
    };

    this.createQueryParameters = function () {
      return {
        page: self.currentPage,
        limit: self.itemsPerPage
      };
    };
  }

  function SortData() {
    var self = this;
    this.orderFields = [];

    this.ASC = 'asc';
    this.DESC = 'desc';

    this.setSortField = function (propertyName, direction, title) {
      self.orderFields.push({property: propertyName, direction: direction, title: title});
      return self;
    };

    //noinspection JSUnusedGlobalSymbols
    this.toggleSort = function (propertyName, title) {
      var i;

      for (i = 0; i < self.orderFields.length; i++) {
        if (self.orderFields[i].property === propertyName) {
          break;
        }
      }
      if (i < self.orderFields.length) {
        var found = self.orderFields[i];
        if (found.direction === self.ASC) {
          found.direction = self.DESC;
        } else {
          self.orderFields.splice(i, 1);
        }
      } else {
        self.orderFields.push({property: propertyName, direction: self.ASC, title: title});
      }
      if (typeof self.callback === 'function') {
        self.callback();
      }
    };

    //noinspection JSUnusedGlobalSymbols
    this.getSortClass = function (propertyName) {
      var found = null;
      angular.forEach(self.orderFields, function (element) {
        if (element.property === propertyName) {
          found = element;
        }
      });
      if (found) {
        return found.direction === self.ASC ? 'sorted_asc' : 'sorted_desc';
      }
      return '';
    };

    //noinspection JSUnusedGlobalSymbols
    this.getSortIconClass = function (propertyName) {
      var found = null;
      angular.forEach(self.orderFields, function (element) {
        if (element.property === propertyName) {
          found = element;
        }
      });
      if (found) {
        return found.direction === self.ASC ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
      }
      return '';
    };

    this.setSortChangedCallback = function (callback) {
      self.callback = callback;
      return self;
    };

    this.createQueryParameters = function () {
      if (self.orderFields.length === 0) {
        return {};
      }
      var items = [];
      angular.forEach(self.orderFields, function (element) {
        items.push(element.property + ':' + element.direction);
      });

      return {
        orderBy: items.join(';')
      };
    };

    this.toHumanString = function () {
      var ret = 'Ordinamento: ';
      if (self.orderFields.length === 0) {
        return ret;
      }
      var items = [];
      angular.forEach(self.orderFields, function (element) {
        items.push(element.title + ' [' + element.direction + ']');
      });
      ret += items.join(' -> ');
      return ret;
    };
  }

  function SearchData() {
    var self = this;

    this.lastParameters = null;

    this.filterData = new FilterData();
    this.pageData = new PageData();
    this.sortData = new SortData();

    this.createQueryParameters = function () {
      var ret = {};
      angular.extend(ret, self.filterData.createQueryParameters());
      angular.extend(ret, self.pageData.createQueryParameters());
      angular.extend(ret, self.sortData.createQueryParameters());

      if (self.lastParameters !== null && !angular.equals(self.lastParameters.search, ret.search)) {
        ret.page = 1;
      }
      self.lastParameters = ret;
      return ret;
    };
  }

  return {
    create: function () {
      return new SearchData();
    }
  };
}


angular
  .module('cmswSearchDataService', [])
  .factory('searchDataService', searchDataService);

