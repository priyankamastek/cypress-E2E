// This test is written to check custom command
// My Account tests: NOT about logging in, they just NEED a logged-in user.
// So login is done with one line: cy.login()

import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";

const myAccountObj = new MyAccountPage();
const loginObj = new LoginPage();

describe("My Account", () => {
  // Runs before EACH test (Cypress clears the session between tests)
  beforeEach(() => {
    
    //cy.login('john.deo@gmail.com', 'abc123')
    
     cy.env(["USER_PASSWORD"], { log: false }).then(({ USER_PASSWORD }) => {
      cy.login("john.deo@gmail.com", USER_PASSWORD);
    });
 
  }); 

    // Runs before EACH test (Cypress clears the session between tests)
  /*beforeEach(() => {
    cy.env(["USER_PASSWORD"], { log: false }).then(({ USER_PASSWORD }) => {
      loginObj.openURL();
      loginObj.enterEmail("john.deo@gmail.com");
      loginObj.enterPassword(USER_PASSWORD);
      loginObj.clickLogin();

      // Make sure login worked before each test continues
      cy.url().should("include", "account/account");
    });
  });*/

  it.skip("should show the My Account heading and links", () => {
    myAccountObj.verifyPageHeading("My Account");
    myAccountObj.verifyLinkVisible("Edit your account information");
    myAccountObj.verifyLinkVisible("Change your password");
  });

  it("should log out successfully", () => {
    myAccountObj.clickLogout();
    myAccountObj.verifyLogoutSuccess("Account Logout");
  });
});
