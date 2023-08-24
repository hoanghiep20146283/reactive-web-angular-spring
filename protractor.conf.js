// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require("jasmine-spec-reporter");

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: ["./test/**/*.e2e.js"],
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      args: ["--disable-extensions --disable-web-security"],
      binary:
        "C:\\Users\\ADMIN\\Documents\\SideProjects\\reactive-web-angular-spring\\chrome-win\\chrome.exe",
    },
  },
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: "http://localhost:3000/",
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {},
  },
  onPrepare() {
    require("ts-node").register({
      project: require("path").join(__dirname, "./tsconfig.json"),
    });
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: StacktraceOption.PRETTY,
        },
      }),
    );
  },
};
