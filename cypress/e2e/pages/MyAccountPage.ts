// Page Object for the My Account page (shown after registration).
 
export class MyAccountPage {
 
    // 1. Locators
    private readonly weblocators = {
        pageHeading: '#content h2',
        contentLinks: '#content a',
        sideMenuLinks: '#column-right a',
        logoutHeading: '#content h1',
        successAlert: '.alert-success'
    }
 
    // 2. Verifications and actions
     verifyPageHeading(expectedText: string): void {
        // .first() because this page has more than one h2
        cy.get(this.weblocators.pageHeading).first().should('have.text', expectedText)
    }
 
    verifyLinkVisible(linkText: string): void {
        // cy.contains finds an element by its visible text
        cy.contains(this.weblocators.contentLinks, linkText).should('be.visible')
    }
   
    clickEditAccount(): void {
        cy.contains(this.weblocators.contentLinks, 'Edit your account information').click()
    }
 
    verifySuccessMessage(expectedText: string): void {
        cy.get(this.weblocators.successAlert).should('contain.text', expectedText)
    }

    clickLogout(): void {
        cy.contains(this.weblocators.sideMenuLinks, 'Logout').click()
    }
 
    verifyLogoutSuccess(expectedText: string): void {
        cy.get(this.weblocators.logoutHeading).should('have.text', expectedText)
    }
}