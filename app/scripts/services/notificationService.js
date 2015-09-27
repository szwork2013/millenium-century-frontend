'use strict';

function notificationService(toaster) {
  function error(err, message) {
    var errors = [];
    var i;

    if (err) {
      if (typeof err === 'string') {
        errors.push(err);
      } else if (Object.prototype.toString.call(err) === '[object Array]') {
        for (i = 0; i < err.length; i++) {
          errors.push(err[i]);
        }
      } else if (err.data && err.data.error && err.data.error.message) {
        err = err.data.error;
        errors.push(err.message);
        //noinspection JSUnresolvedVariable
        if (err.fields) {
          //noinspection JSUnresolvedVariable
          for (var prop in err.fields) {
            //noinspection JSUnresolvedVariable
            for (i = 0; i < err.fields[prop].length; i++) {
              //noinspection JSUnresolvedVariable
              errors.push(err.fields[prop][i]);
            }
          }
        }
      } else if (err.status === 500) {
        errors.push('Errore interno al server');
      } else {
        errors.push('Errore di validazione');
      }
    }
    if (message) {
      errors.push(message);
    }
    if (errors.length > 0) {
      for (i = 0; i < errors.length; i++) {
        toaster.pop('error', 'ERRORE', errors[i]);
      }
    }
  }

  function success(message) {
    toaster.pop('success', 'Operazione Completata!', message || 'Successo');
  }

  function warning(message) {
    toaster.pop('warning', 'Attenzione', message);
  }

  return {
    error: error,
    success: success,
    warning: warning
  };
}

angular
  .module('cmswNotificationService', [])
  .factory('notificationService', [
    'toaster', notificationService
  ]);


