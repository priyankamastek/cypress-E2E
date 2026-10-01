// Page Object for the Login page.

export class LoginPage {
  // 1. Locators
  private weblocators = {
    email: "#input-email",
    password: "#input-password",
    loginButton: 'input[value="Login"]',
    warningAlert: ".alert-danger",
  };

  // 2. Actions
  openURL(): void {
   // cy.visit(
     // "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
    //);
    cy.visit(Cypress.expose('LOGIN_URL'))
  }

  enterEmail(email: string): void {
    cy.get(this.weblocators.email).type(email);
  }

  enterPassword(password: string): void {
    //cy.get(this.weblocators.password).type(password, { log: false });
    // Show a masked entry instead, so the step is still visible
    //Cypress.log({ name: "type", message: "********" });
     cy.get(this.weblocators.password)
        .type(password, { log: false })   // real password hidden
        .then(() => {
            // runs only after typing finishes, so it appears at the right place
            Cypress.log({ name: 'type', message: '********' })
        })
  }

  clickLogin(): void {
    cy.get(this.weblocators.loginButton).click();
  }

  // 3. Verifications
  verifyWarning(expectedText: string): void {
    cy.get(this.weblocators.warningAlert).should("contain.text", expectedText);
  }
}
