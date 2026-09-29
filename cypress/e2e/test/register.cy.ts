// Test file: uses the Page Object with static test data defined in the file using interface

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

// Static test data that follows the RegisterData interface.
const registerData: RegisterData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    telephone: '9876543210',
    password: 'Test@1234',
    successMessage: 'Your Account Has Been Created!'
}

const registerObj = new RegisterPage()

describe('Register - test automation', () => {

    it('should register a new user successfully', () => {

        // The site rejects an email that is already registered,
        // so we add a timestamp to make it unique on every run.
        const uniqueEmail: string = `${Date.now()}_${registerData.email}`

        registerObj.openURL()
        registerObj.enterFirstName(registerData.firstName)
        registerObj.enterLastName(registerData.lastName)
        registerObj.enterEmail(uniqueEmail)
        registerObj.enterTelephone(registerData.telephone)
        registerObj.enterPassword(registerData.password)
        registerObj.selectCheckbox()
        registerObj.clickOnContinue()

        // A test should always check a result, not just perform clicks.
        registerObj.verifyRegistrationSuccess(registerData.successMessage)
    })
})