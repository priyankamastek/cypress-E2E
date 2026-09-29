// Test file: register a new user, then check the My Account page and log out.

import { MyAccountPage } from "../pages/MyAccountPage";
import { RegisterPage } from "../pages/RegisterPage";


// An interface describes the "shape" of our test data.
// If a field is missing or misspelled, TypeScript shows an error before the test runs.
interface RegisterData {
    firstName: string
    lastName: string
    email: string
    telephone: string
    password: string
    successMessage: string
}

interface MyAccountData {
    heading: string
    editAccountLink: string
    logoutMessage: string
}

// Static test data that follows the interfaces above.
const registerData: RegisterData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    telephone: '9876543210',
    password: 'Test@1234',
    successMessage: 'Your Account Has Been Created!'
}

const myAccountData: MyAccountData = {
    heading: 'My Account',
    editAccountLink: 'Edit your account information',
    logoutMessage: 'Account Logout'
}

// One object per page
const registerObj = new RegisterPage()
const myAccountObj = new MyAccountPage()

describe('Register - test automation', () => {

    it('should register a new user, open My Account and log out', () => {

        // The site rejects an email that is already registered,
        // so we add a timestamp to make it unique on every run.
        const uniqueEmail: string = `${Date.now()}_${registerData.email}`

        // Page 1: Register
        registerObj.openURL()
        registerObj.enterFirstName(registerData.firstName)
        registerObj.enterLastName(registerData.lastName)
        registerObj.enterEmail(uniqueEmail)
        registerObj.enterTelephone(registerData.telephone)
        registerObj.enterPassword(registerData.password)
        registerObj.selectCheckbox()
        registerObj.clickOnContinue()
        registerObj.verifyRegistrationSuccess(registerData.successMessage)
        registerObj.clickContinueOnSuccess()

        // Page 2: My Account
        myAccountObj.verifyPageHeading(myAccountData.heading)
        myAccountObj.verifyLinkVisible(myAccountData.editAccountLink)
        myAccountObj.clickLogout()
        myAccountObj.verifyLogoutSuccess(myAccountData.logoutMessage)
    })
})