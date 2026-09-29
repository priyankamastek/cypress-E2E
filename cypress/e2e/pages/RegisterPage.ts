// Page Object for the Register page.
// A Page Object keeps all locators and actions for ONE page in ONE place,
// so tests stay short and readable, and locator changes are made only here.

export class RegisterPage {

    // 1. Locators: CSS selectors for every element we interact with.
   private weblocators = {
        firstName: '#input-firstname',
        lastName: '#input-lastname',
        email: '#input-email',
        telephone: '#input-telephone',
        password: '#input-password',
        passwordConfirm: '#input-confirm',
        policyCheckbox: 'input[type="checkbox"]',
        continue: '.btn.btn-primary',
        successHeading: '#content h1'
    }

    // 2. Actions: each method performs one step on the page.
    openURL(): void {
        // Reads the URL from the 'env' section of cypress.config.ts
        // Currently added static URL in code, however, it can be configured in cypress.config.ts file in env {} object.
        cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=account/register')
    }

    enterFirstName(firstName: string): void {
        cy.get(this.weblocators.firstName).type(firstName)
    }

    enterLastName(lastName: string): void {
        cy.get(this.weblocators.lastName).type(lastName)
    }

    enterEmail(email: string): void {
        cy.get(this.weblocators.email).type(email)
    }

    enterTelephone(phoneNo: string): void {
        cy.get(this.weblocators.telephone).type(phoneNo)
    }

    enterPassword(password: string): void {
        cy.get(this.weblocators.password).type(password)
        cy.get(this.weblocators.passwordConfirm).type(password)
    }

    selectCheckbox(): void {
        cy.get(this.weblocators.policyCheckbox).check()
    }

    clickOnContinue(): void {
        cy.get(this.weblocators.continue).click()
    }

    // 3. Verification: confirms the registration actually worked.
    verifyRegistrationSuccess(expectedText: string): void {
        cy.get(this.weblocators.successHeading).should('have.text', expectedText)
    }
}