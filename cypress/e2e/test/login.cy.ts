// Login tests: these tests are ABOUT logging in.
 
import { LoginPage } from '../pages/LoginPage'
import { MyAccountPage } from '../pages/MyAccountPage'
 
interface LoginData {
    email: string
    password: string
}
 
// Valid account comes from cypress.config.ts (one place to change it)
const validUser: LoginData = {
    email: 'john.deo@gmail.com',
    password: 'abc123'
}
 
// An email that is not registered.
const invalidUser: LoginData = {
    email: 'not.registered@example.com',
    password: 'Wrong@1234'
}
 
const loginObj = new LoginPage()
const myAccountObj = new MyAccountPage()
 
describe('Login', () => {
      
    it('should log in with valid email and password', () => {
        loginObj.openURL()
        loginObj.enterEmail(validUser.email)
        loginObj.enterPassword(validUser.password)
        loginObj.clickLogin()
 
        myAccountObj.verifyPageHeading('My Account')
    })
 
   /* it('should show a warning with invalid email and password', () => {
        loginObj.openURL()
        loginObj.enterEmail(invalidUser.email)
        loginObj.enterPassword(invalidUser.password)
        loginObj.clickLogin()
 
        loginObj.verifyWarning('No match for E-Mail Address and/or Password')
    }) */
})