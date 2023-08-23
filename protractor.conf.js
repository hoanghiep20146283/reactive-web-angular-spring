/**
 * This file is a sample Conf.js used for test execution in protractor
 */

exports.config = {
  directConnect: true,
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      prefs: {
        download: {
          prompt_for_download: false,
          directory_upgrade: true,
          default_directory: "C:/downloads/",
        },
      },
    },
  },

  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["specs/f1.feature"], //Feature files to execute

  cucumberOpts: {
    "no-colors": false,
    require: "stepdefinitions/f1steps.js", // require step definition files before executing features
    tags: [], // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    strict: true, // <boolean> fail if there are any undefined or pending steps
    dryRun: false, // <boolean> invoke formatters without executing steps
    compiler: [], // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    failFast: true,
  },

  onPrepare: function () {
    browser.manage().window().maximize(); // maximize the browser before executing the feature files
  },
};
