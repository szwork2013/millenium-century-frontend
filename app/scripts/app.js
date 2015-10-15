'use strict';

angular
  .module('millenium', [
    'ui.router',
    'fileSaver',
    'ui.bootstrap',
    'ui.calendar',
    'ngCookies',
    'ngResource',
    'angular-loading-bar',
    'toaster',
    'ngAnimate',
    'ngMessages',
    'ui.utils.masks',
    'infinite-scroll',
    'LocalStorageModule',
    'bootstrapLightbox',
    'flow',
    'slickCarousel',
    'cmswLocationParametersService',
    'cmswSearchDataService',
    'cmswNotificationService',
    'millenium.services',
    'millenium.directives',
    'millenium.controllers',
    'millenium.routes',
    'millenium.config',
    'millenium.constants',
    'millenium.templates',
    'millenium.filters',
    'ui-rangeSlider'

  ])
  .config(function ($httpProvider, authInterceptorServiceProvider, ENV, LightboxProvider, flowFactoryProvider, slickCarouselConfig) {
    //Inietto l'interceptor per inviare il token a ogni richiesta
    /*authInterceptorServiceProvider.config.urlFilter = [
      ENV.apiEndpoint
    ];
    authInterceptorServiceProvider.config.useHeaders = true;

    $httpProvider.interceptors.push('authInterceptorService');

    LightboxProvider.templateUrl = '../../views/modals/lightboxModal.html';*/

    flowFactoryProvider.defaults = {
      permanentErrors: [404, 500, 501],
      maxChunkRetries: 1,
      chunkSize: 20*1024*1024,
      testChunks: false,
      chunkRetryInterval: 5000,
      simultaneousUploads: 1,
      singleFile: true
    };
    /*flowFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });*/

    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;

  })
  .run(function ($locale, datepickerPopupConfig, datepickerConfig, locationParametersConfig, resourceService) {

    /*moment.locale('it');

    datepickerConfig.startingDay = 1;
    datepickerPopupConfig.datepickerPopup = $locale.DATETIME_FORMATS.shortDate;
    datepickerPopupConfig.currentText = 'Oggi';
    datepickerPopupConfig.clearText = 'Pulisci';
    datepickerPopupConfig.closeText = 'Fatto';
	*/

    // Configurazione LocationParametersService
    /*locationParametersConfig.context.PropertyIdName = 'id';
    
    locationParametersConfig.context.GetByIdFunction = function (value) {
      if (value) {
        return resourceService.forResource(value.entityName).get(value.entityId, value.propertiesToExpand);
      }
      return null;
    };
    locationParametersConfig.event.RouteChangedEventName = '$locationChangeSuccess';*/

    /*
     locationParametersConfig.notification.OnErrorFunction = function (err, message) {
     if (err) {
     return notificationService.error(err, message);
     } else {
     return notificationService.error('ERRORE', message);
     }
     }
     locationParametersConfig.notification.OnWarningFunction = function (message) {
     return notificationService.warn(message);
     }
     locationParametersConfig.notification.OnInfoFunction = function (message) {
     return notificationService.completed(message);
     }
     */
  });
