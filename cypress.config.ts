import { defineConfig } from "cypress";

export default defineConfig({
  screenshotOnRunFailure: false,
  video: false,
  // defaultCommandTimeout: 8000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // AUT to be tested
      /* env : {
          URL: 'https://naveenautomationlabs.com/opencart/index.php?route=account/register'
      }*/
    },
  },

  // AUT to be tested
  expose: {
    URL: "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
    LOGIN_URL: "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
    API_URL: "https://restful-booker.herokuapp.com",
  },
});
