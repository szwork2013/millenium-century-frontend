// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-06-27 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/blob-polyfill/Blob.js',
      'bower_components/file-saver.js/FileSaver.js',
      'bower_components/angular-file-saver/src/file-saver.js',
      'bower_components/br-validations/releases/br-validations.js',
      'bower_components/string-mask/src/string-mask.js',
      'bower_components/angular-input-masks/angular-input-masks-standalone.min.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-rangeslider/angular.rangeSlider.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/slick-carousel/slick/slick.min.js',
      'bower_components/angular-slick-carousel/dist/angular-slick.js',
      'bower_components/moment/moment.js',
      'bower_components/fullcalendar/dist/fullcalendar.js',
      'bower_components/angular-ui-calendar/src/calendar.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-xeditable/dist/js/xeditable.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angularjs-toaster/toaster.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/flow.js/dist/flow.js',
      'bower_components/ng-flow/dist/ng-flow.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/bootstrap-css/js/bootstrap.min.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/services/services.js",
      "app/scripts/templates/templates.js",
      "app/scripts/**/**/*.module.js",
      "app/scripts/**/**/*.js",
      "app/scripts/directives/directives.js",
      "app/scripts/filters/filters.js",
      "app/scripts/routes/routes.js",
      "app/scripts/**/*.js",
      "app/scripts/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
