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
        successHeading: '#content h1',
        successContinue: '#content .buttons a'
    }
 
    // 2. Actions: each method performs one step on the page.
    //    The ': string' after a parameter tells TypeScript what type it must be.
    //    The ': void' after () means the method does not return a value.
 
    openURL(): void {
        // Reads the URL from the 'env' section of cypress.config.ts
        //cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=account/register')
        cy.visit(Cypress.expose('URL'))
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
        cy.get(this.weblocators.password).type(password, { log: false })
        cy.get(this.weblocators.passwordConfirm).type(password, { log: false })

        // Show a masked entry instead, so the step is still visible
          Cypress.log({ name: 'type', message: '********' })
    }
 
    selectCheckbox(): void {
        cy.get(this.weblocators.policyCheckbox).check()
    }
 
    clickOnContinue(): void {
        cy.get(this.weblocators.continue).click()
    }
 
    // 3. Verification: confirms the registration actually worked - asserttion
    verifyRegistrationSuccess(expectedText: string): void {
        cy.get(this.weblocators.successHeading).should('have.text', expectedText)
    }
 
    // Clicks 'Continue' on the "Account Created" page, which opens My Account
    clickContinueOnSuccess(): void {
        cy.contains(this.weblocators.successContinue, 'Continue').click()
    }
}