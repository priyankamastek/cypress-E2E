// Page Object for the Edit Account page.
 
export class EditAccountPage {
 
    // 1. Locators
    private readonly weblocators = {
        telephone: '#input-telephone',
        continue: 'input[value="Continue"]'
    }
 
    // 2. Actions
    updateTelephone(phoneNo: string): void {
        // clear() removes the old number before typing the new one
        cy.get(this.weblocators.telephone).clear().type(phoneNo)
    }
 
    clickContinue(): void {
        cy.get(this.weblocators.continue).click()
    }
}