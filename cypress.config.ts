import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // AUT to be tested
      env : {
          URL: 'https://naveenautomationlabs.com/opencart/index.php?route=account/register'
      }
    },
  },
});
