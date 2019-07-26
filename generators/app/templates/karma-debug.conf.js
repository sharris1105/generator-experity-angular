// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = (config) => {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client:{
        clearContext: false, // leave Jasmine Spec Runner output visible in browser,
      },
      angularCli: {
        environment: 'dev'
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_DEBUG,
      autoWatch: true,
      customLaunchers: {
        ChromeDebugging: {
          base: 'Chrome',
          flags: [ '--remote-debugging-port=9333' ]
        }
      },
      browsers: ['ChromeDebugging'],
      singleRun: false,
    });
  };
