'use strict';

function locationParametersService($location, $parse, $q, locationParametersConfig) {

  var entityFieldSeparator = '*';
  var config = locationParametersConfig;
  var Id = '';
  var routeChangedEventName = '';
  // Validazione Configurazione LocationParametersService
  if (config.context.PropertyIdName !== '' || angular.isString(config.context.PropertyIdName)) {
    Id = config.context.PropertyIdName;
  } else {
    config.notification.OnErrorFunction('LocationParametersConfig', 'PropertyIdName Must be a String - Default Value <id> Restored');
    Id = 'id';
  }

  if (config.event.RouteChangedEventName !== '' && angular.isString(config.event.RouteChangedEventName)) {
    routeChangedEventName = config.event.RouteChangedEventName;
  } else {
    config.notification.OnErrorFunction('LocationParametersConfig', 'RouteChangedEventName Must be a String - Default Value <empty> Restored');
    routeChangedEventName = '';
  }

  function isNothing(value) {
    return value === null || value === undefined || value === '';
  }

  function formatEntityQuery(entityName, entityId, propertiesToExpand) {
    return entityName + entityFieldSeparator + entityId + entityFieldSeparator + (propertiesToExpand || '');
  }

  function parseEntityQuery(string) {
    var split = string.split(entityFieldSeparator);
    return {
      entityName: split[0],
      entityId: split[1],
      propertiesToExpand: split[2] || null
    };
  }

  function BaseType() {
    var self = this;

    // ReSharper disable once UnusedParameter
    this.convertToQuery = function (object, watch) {
      if (angular.isDefined(watch) && watch.defaultValue === null) {
        return isNothing(object) ? null : self.__formatQueryString__(object, watch);
      }
      return isNothing(object) ? self.noFilterString : self.__formatQueryString__(object, watch);
    };
    this.__formatQueryString__ = function (object) {
      return object;
    };
    this.convertFromQuery = function (string, watch) {

      if (watch.defaultValue === null) {
        return isNothing(string) ? null : self.__parseQueryString__(string);
      }
      if (isNothing(string)) {
        return self.__getDefaultValue__(watch);
      }
      return self.noFilterString === string ? null : self.__parseQueryString__(string);
    };
    this.__getDefaultValue__ = function (watch) {
      return watch.defaultValue;
    };
    this.__parseQueryString__ = function (string) {
      return string;
    };
    this.__getScopeVariableToWatch__ = function (scopeVariable) {
      return scopeVariable;
    };
    this.__areEqual__ = function (queryValue, scopeValue) {
      var isNullOp1 = isNothing(queryValue);
      var isNullOp2 = isNothing(scopeValue);

      return (isNullOp1 && isNullOp2) ||
// ReSharper disable once CoercedEqualsUsing
        (!isNullOp1 && !isNullOp2 && queryValue === scopeValue);
    };
    this.__setScopeVariable__ = function (scope, variableSetter, value, deferred, onParamChanged) {
      variableSetter(scope, value);
      if (onParamChanged) {
        deferred.resolve(true);
      } else {
        deferred.resolve(false);
      }

    };
    this.noFilterString = '*';
  }

  function DateType() {
    var self = this;

    BaseType.call(self);
    // ReSharper disable once UnusedParameter
    this.__formatQueryString__ = function (object) {
      return object.toJSON();
    };
    this.__parseQueryString__ = function (string) {
      return new Date(string);
    };
    this.__areEqual__ = function (queryValue, scopeValue) {
      var isNullOp1 = isNothing(queryValue);
      var isNullOp2 = isNothing(scopeValue);

      return (isNullOp1 && isNullOp2) ||
// ReSharper disable once CoercedEqualsUsing
        (!isNullOp1 && !isNullOp2 && queryValue.toISOString() === scopeValue.toISOString());
    };
  }

  function BoolType() {
    var self = this;

    BaseType.call(self);
    // ReSharper disable once UnusedParameter
    this.__formatQueryString__ = function (object) {
      return object.toString();
    };
    this.__parseQueryString__ = function (string) {
      return JSON.parse(string);
    };
  }

  function NumberType() {
    var self = this;

    BaseType.call(self);
    // ReSharper disable once UnusedParameter
    this.__formatQueryString__ = function (object) {
      return object.toString();
    };
    this.__parseQueryString__ = function (string) {
      return JSON.parse(string);
    };
  }

  function EntityType() {
    var self = this;

    BaseType.call(self);
    // ReSharper disable once UnusedParameter
    this.__formatQueryString__ = function (object, watch) {
      return formatEntityQuery(watch.entityInfo.entityName, object[Id], watch.entityInfo.propertiesToExpand);
    };
    this.__parseQueryString__ = function (string) {
      return parseEntityQuery(string);
    };
    this.__getDefaultValue__ = function (watch) {
      return {
        entityId: watch.defaultValue[Id],
        entityName: watch.entityInfo.entityName,
        propertiesToExpand: watch.entityInfo.propertiesToExpand
      };
    };
    this.__getScopeVariableToWatch__ = function (scopeVariable) {
      return scopeVariable + '.' + Id;
    };
    this.__areEqual__ = function (queryValue, scopeValue) {
      var isNullOp1 = isNothing(queryValue);
      var isNullOp2 = isNothing(scopeValue);

      return (isNullOp1 && isNullOp2) ||
// ReSharper disable once CoercedEqualsUsing
        (!isNullOp1 && !isNullOp2 && queryValue.entityId === scopeValue[Id]);
    };
    this.__setScopeVariable__ = function (scope, variableSetter, value, deferred, onParamChanged) {
      if (isNothing(value)) {
        variableSetter(scope, null);
        if (onParamChanged) {
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
        deferred.resolve(true);
      } else {
        config.context.GetByIdFunction(value)
          .then(function (result) {
            variableSetter(scope, result);
            if (onParamChanged) {
              deferred.resolve(true);
            } else {
              deferred.resolve(false);
            }
          })
          .catch(function (error) {
            //noinspection JSUnresolvedVariable
            config.Notification.OnErrorFunction(error, 'Errore durante il caricamento dei parametri!!!');
            deferred.reject(error);
          });
      }
    };
  }

  var types = {
    string: new BaseType(),
    date: new DateType(),
    entity: new EntityType(),
    bool: new BoolType(),
    number: new NumberType()
  };

  function create(scope) {
    function LocService() {
      var self = this;
      var autoUpdateValue = true;

      this.scope = scope;
      this.watches = [];
      var getScopeValue = function (watch) {

        return self.scope.$eval(watch.scopeVariableName);
      };

      var setterFromWatch = function (watch) {
        var variableSetter = $parse(watch.scopeVariableName).assign;
        var deferred = $q.defer();
        var value = watch.type.convertFromQuery($location.search()[watch.parameterName], watch);

        if (watch.type.__areEqual__(value, getScopeValue(watch))) {
          deferred.resolve(false);
        } else {
          watch.type.__setScopeVariable__(self.scope, variableSetter, value, deferred, watch.onParamChanged);
        }
        return deferred.promise;
      };

      var addSetterToPromise = function (promise, watch) {
        return promise.then(function (previousIsChanged) {
          return setterFromWatch(watch)
            .then(function (isChanged) {
              return previousIsChanged || isChanged;
            });
        });
      };

      var setScopeFromQuery = function () {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var queryParameters = $location.search();
        var anyOnWatch = false;

        if (queryParameters && self.watches && self.watches.length !== 0) {
          for (var i = 0; i < self.watches.length; i++) {
            if (!self.watches[i].__queryChangedByService__) {
              promise = addSetterToPromise(promise, self.watches[i]);
            }
            anyOnWatch = anyOnWatch || self.watches[i].__onWatch__;
            self.watches[i].__queryChangedByService__ = false;
            self.watches[i].__onWatch__ = false;
          }
        }
        deferred.resolve(anyOnWatch);
        return promise;
      };

      var setQueryFor = function (watch) {
        var value = getScopeValue(watch);
        var currentQueryStringValue = $location.search()[watch.parameterName];
        var newQueryStringValue = watch.type.convertToQuery(value, watch);

        currentQueryStringValue = isNothing(currentQueryStringValue) ?
          watch.type.convertToQuery(watch.defaultValue, watch) : currentQueryStringValue;
        if (newQueryStringValue !== currentQueryStringValue &&
          (!isNothing(newQueryStringValue) || !isNothing(currentQueryStringValue))) {
          watch.__queryChangedByService__ = true;
          $location.search(watch.parameterName, newQueryStringValue);
        } else {
          watch.__onWatch__ = false;
        }
      };

      this.addVariable = function (parameters) {
        if (!parameters) {
          return self;
        }
        if (!parameters.parameterName) {
          parameters.parameterName = parameters.scopeVariableName;
        }
        if (!parameters.type) {
          parameters.type = types.string;
        }
        if (parameters.defaultValue === undefined || parameters.defaultValue === null) {
          parameters.defaultValue = null;
        }
        if (angular.isUndefined(parameters.onParamChanged)) {
          parameters.onParamChanged = true;
        }
        if (angular.isUndefined(parameters.isNothingPrevent)) {
          parameters.isNothingPrevent = false;
        }
        self.watches.push(parameters);
        // Inizializzazione e Gestione AutoUpdate
        if (parameters.onParamChanged) {
          self.scope.$watch(parameters.type.__getScopeVariableToWatch__(parameters.scopeVariableName),
            function (newValue, oldValue) {
              if (autoUpdateValue && newValue !== oldValue && !(parameters.isNothingPrevent && isNothing(newValue))) {
                parameters.__onWatch__ = true;
                setQueryFor(parameters);
              }
            });
        }

        return self;
      };

      this.autoUpdate = function (value) {
        autoUpdateValue = !!value;
        return self;
      };

      this.updateLocation = function () {
        for (var i = 0; i < self.watches.length; i++) {
          self.watches[i].__onWatch__ = false;
          setQueryFor(self.watches[i]);
        }
      };

      this.init = function (onParamChangedCallback) {
        onParamChangedCallback = (typeof onParamChangedCallback === 'function') ? onParamChangedCallback : function () {
        };
        return setScopeFromQuery().then(function () {
          onParamChangedCallback();
          if (routeChangedEventName !== '') {
            self.scope.$on(routeChangedEventName, function () {
              setScopeFromQuery().then(function (isChanged) {
                if (isChanged) {
                  onParamChangedCallback();
                }
              });
            });
          }
        });
      };
    }

    return new LocService(scope);
  }

  return {
    create: create,
    types: types
  };
}

var config = {
  context: {
    PropertyIdName: 'id',
    /**
     * @return {null}
     */
    GetByIdFunction: function () {
      return null;
    }
  },
  event: {
    RouteChangedEventName: ''
  },
  notification: {
    OnErrorFunction: function (error, message) {
      console.log('ERROR: ' + error + ' - ' + message);
    },
    OnWarningFunction: function (message) {
      console.log('WARNING: ' + message);
    },
    OnInfoFunction: function (message) {
      console.log('INFO: ' + message);
    }
  }
};

angular
  .module('cmswLocationParametersService', [])
  .constant('locationParametersConfig', config)
  .factory('locationParametersService', [
    '$location',
    '$parse',
    '$q',
    'locationParametersConfig', locationParametersService
  ]);

