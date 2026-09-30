// Edit Account test: NOT about logging in, it just NEEDS a logged-in user.
// So login is done with one line: cy.login()

import { EditAccountPage } from "../pages/EditAccountPage";
import { MyAccountPage } from "../pages/MyAccountPage";
 
const myAccountObj = new MyAccountPage()
const editAccountObj = new EditAccountPage()
 
describe('Edit Account', () => {
 
    beforeEach(() => {
        cy.login('john.deo@gmail.com', 'abc123')
    })
 
    it('should update the telephone number', () => {
        myAccountObj.clickEditAccount()
        editAccountObj.updateTelephone('9123456780')
        editAccountObj.clickContinue()
 
        myAccountObj.verifySuccessMessage('Your account has been successfully updated')
    })
})
 