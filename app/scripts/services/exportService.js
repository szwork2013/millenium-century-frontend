'use strict';
var services = angular.module('millenium.services');

function exportService($http, ENV, SaveAs) {

  var Model = function (entity) {
    var self = this;

    var url = ENV.apiEndpoint + entity + '/export';

    this.status = 0;

    this.setDownloading = function () {
      self.status = 10;
    };

    this.setDone = function () {
      self.status = 20;
    };

    this.setError = function () {
      self.status = 30;
    };

    this.reset = function () {
      self.status = 0;
    };

    this.sendRequest = function (additionalParameters) {

      var params = angular.extend(additionalParameters, {
        mode: self.mode,
        extension: self.extension
      });

      self.setDownloading();
      return $http.get(url, {params: params, responseType: 'arraybuffer'});
    };

    this.download = function () {
      if (self.status === 10) {
        return;
      }
      if (self.status === 20) {
        SaveAs.download(self.data, self.filename, self.type);
      }
      self.reset();
    };

    this.extractFileName = function (headers) {
      var filename = headers['millenium-export-filename'];
      return filename ? filename : 'export_' + entity;
    };

    this.setMode = function (mode) {
      self.mode = mode;
    };

    this.setExtension = function (extension) {
      self.extension = extension;
    };

    this.setData = function (data) {
      self.data = [data];
    };

    this.setFilename = function (headers) {
      self.filename = self.extractFileName(headers());
    };

    this.setType = function (headers) {
      self.type = {type: headers()['content-type']};
    };
  };

  function getInstance(type, resource) {
    return new Model(type, resource);
  }

  var service = {
    getInstance: getInstance
  };

  return service;
}

services.factory('exportService', ['$http', 'ENV', 'SaveAs', exportService]);
