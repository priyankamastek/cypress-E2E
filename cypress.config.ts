import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "ww6s3n",

  // Reporting: JUnit XML for Jenkins + Mochawesome HTML report
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },


// Evidence for debugging CI failures
  screenshotOnRunFailure: true,
  video: false,

   // Longer waits for slow public demo sites
  defaultCommandTimeout: 10000,   // cy.get, .should, etc. (default 4000)
  pageLoadTimeout: 90000,         // cy.visit full page load (default 60000)
  responseTimeout: 60000,         // cy.request, e.g. Heroku cold start (default 30000)
  
  // Retry once in headless runs to absorb flaky network/UI failures
  retries: {
    runMode: 1,
    openMode: 0,
  },

  // defaultCommandTimeout: 8000,
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },

  // AUT to be tested
  expose: {
    URL: "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
    LOGIN_URL:
      "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
    API_URL: "https://restful-booker.herokuapp.com",
  },
});
