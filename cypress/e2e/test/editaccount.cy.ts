// Edit Account test: NOT about logging in, it just NEEDS a logged-in user.
// So login is done with one line: cy.login()

import { EditAccountPage } from "../pages/EditAccountPage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { LoginPage } from "../pages/LoginPage";
 
const myAccountObj = new MyAccountPage()
const editAccountObj = new EditAccountPage()
const loginObj = new LoginPage()

describe('Edit Account', () => {
 
    
    /*beforeEach(() => {
        //cy.login('john.deo@gmail.com', 'abc123')
          cy.env(['USER_PASSWORD'], { log: false }).then(({ USER_PASSWORD }) => {
            loginObj.openURL()
            loginObj.enterEmail('john.deo@gmail.com')
            loginObj.enterPassword(USER_PASSWORD)
            loginObj.clickLogin()

            // Make sure login worked before the test continues
            cy.url().should('include', 'account/account')
        })
    })*/
 
    it('should update the telephone number', () => {
        cy.login('john.deo@gmail.com', 'abc123')
        myAccountObj.clickEditAccount()
        editAccountObj.updateTelephone('9123456780')
        editAccountObj.clickContinue()
 
        myAccountObj.verifySuccessMessage('Your account has been successfully updated')
    })
})
 