// Karma configuration
// Generated on Sat Dec 03 2016 15:15:16 GMT+0100 (Romance Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
        'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js',
        'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular-mocks.js',
        'http://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.js',
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.0/moment.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-moment/1.0.1/angular-moment.min.js',

        'public/javascripts/external/angular-flash.min.js',
        'public/javascripts/external/angular-md5.min.js',

        './public/javascripts/angular.model.js',
        './public/javascripts/angularApp.js',
        './public/javascripts/controllers/*.js',
        './public/javascripts/directives/*.js',
        './public/javascripts/services/*.js',


        './public/javascripts/tests/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
