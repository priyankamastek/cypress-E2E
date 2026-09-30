cypress-E2E/
├── cypress/
│   ├── e2e/
│   │   ├── pages/
│   │   │   └── registerPage.ts
│   │   └── test/
│   │       └── registerTest.cy.ts
│   ├── fixtures/
│   │   └── registerData.json
│   └── support/
│       └── e2e.ts
├── node_modules/
├── .gitignore
├── cypress.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json

Testing
================
A = Arrange => Inputs provided to the test
A = Act / Action => type(), click(), check(), select()
A = Assert => .should() / expect().to.be()

## Page Object Model - Pattern for arranging the test code

It a design pattern that separates web page elements and actions from your test script logic

  e2e folder
    - pages 
      loginPage 
         - Web Locators [cy.get('locators') or cy.contain('location')]
         - Actions
      registerPage
          - Web Locators [cy.get('locators') or cy.contain('location')]
         - Actions (type, click, select)
      dashboardPage
          - Web Locators [cy.get('locators') or cy.contain('location')]
         - Actions (type, click, select)

     - test
      logintest.cy.ts
         - Create the object of Page (loginPage)
         - Assertions
     registerPage
         - Create the object of Page (registerPage)
         - Assertions
Practical : GITHUB + POM 
 
GitHub repo
  - branch
      main > Cypress common structure
    -feature branch > feature under test
    
  User 1 
        |
           push work on GitHub > trigger the pipeline (GitHub actions, Jenkins, Circle) 
        |  
  user 2

1. Clone the GitHub repo on the local system
         - https (Hypertext transfer protocol) - username + password
         - ssl (secure shell protocol) - token 

ssh-keygen
   private (on local system)
   public (on windows / Linux - home directory : C:\Users\Priyank15196\.ssh (2 files)


## commands to get started with the project
1. npm init -y
2. npm install -D cypress typescript
3. add tsconfig.json file in the root folder
4. npx cypress open

## We designed two test Registration Page and My Account Page actions using POM.

## Observe: 
Right now registration takes nine lines in the test. 
Future tests (login, edit account, add to cart) will all need a fresh registered user as setup, and they shouldn't repeat those nine lines. 

## we can use custom commands 
A custom command wraps it in one line, and inside it can still call your page object, so the two work together instead of duplicating locators.

## What is custom commands?
Custom commands hold actions you need across many tests or pages, usually as setup or teardown.

http://learn.cypress.io/advanced-cypress-concepts/building-the-right-cypress-commands

## When to use custom commands?
 A helpful thing to think about when you should write your custom command is when your test code forces you to do so. What exactly does this mean?

 When you begin to notice yourself writing the same functionality over and over again, aka repeating yourself, across multiple tests, that is usually a good sign to make a custom command. Don't begin writing your tests by thinking in abstractions, i.e., custom commands—rather abstract custom commands from your tests.

## Analogy: Typically you will create a custom JS function to abstract some functionality to re-use within your application, i.e., utility functions. Cypress commands are the same thing. They allow you to re-use functionality across multiple tests.

## Example:
cy.visit(Cypress.expose('URL'))
cy.get('#input-firstname').type('Test')
cy.get('#input-lastname').type('User')
cy.get('#input-email').type(email)
cy.get('#input-telephone').type('9876543210')
cy.get('#input-password').type('Test@1234')
cy.get('#input-confirm').type('Test@1234')
cy.get('input[type="checkbox"]').check()
cy.get('.btn.btn-primary').click()

### With a custom command, each test writes just one line:
cy.registerUser('Test', 'User', email, '9876543210', 'Test@1234')

### Step 1: Write the command (cypress/support/commands.ts)
Cypress.Commands.add('registerUser', (firstName, lastName, email, telephone, password) => {
    cy.visit(Cypress.expose('URL'))
    cy.get('#input-firstname').type(firstName)
    cy.get('#input-lastname').type(lastName)
    cy.get('#input-email').type(email)
    cy.get('#input-telephone').type(telephone)
    cy.get('#input-password').type(password)
    cy.get('#input-confirm').type(password)
    cy.get('input[type="checkbox"]').check()
    cy.get('.btn.btn-primary').click()
})

### Step 2: Tell TypeScript it exists (same file, at the top)
Cypress now knows the command, but TypeScript doesn't.
declare namespace Cypress {
    interface Chainable {
        registerUser(firstName: string, lastName: string, email: string,
                     telephone: string, password: string): Chainable<void>
    }
}
### Step 3: Load the file (cypress/support/e2e.ts)
import './commands'

Cypress runs e2e.ts before every test. This one line makes it read commands.ts, so the command is ready in every test file.

### Step 4: Use it in a test (cypress/e2e/test/registerCommandTest.cy.ts)

describe('Register with a custom command', () => {

    it('should register a new user', () => {
        // Unique email, because the site rejects one that's already registered
        const email: string = `${Date.now()}_testuser@example.com`

        // One line does the whole registration
        cy.registerUser('Test', 'User', email, '9876543210', 'Test@1234')

        // Check the result
        cy.get('#content h1').should('have.text', 'Your Account Has Been Created!')
    })
})

### The flow in one picture
registerCommandTest.cy.ts        e2e.ts                commands.ts
cy.registerUser(...)   ──►   import './commands'  ──►  runs the 9 steps


# Customize Test-level Configuration
For video, enable it per spec file from the command line:

npx cypress run --spec cypress/e2e/test/login.cy.ts --config video=true

For screenshots, set it per test:
it('should log in', { screenshotOnRunFailure: true }, () => { ... })

For baseUrl, you can use either form:
Cypress.config('baseUrl', 'https://react-redux.realworld.io/')     // inside the test
it('...', { baseUrl: 'https://react-redux.realworld.io/' }, () => { ... })   // as test config

# Refer this link - https://docs.cypress.io/api/cypress-api/config
to understand more about global configurations.

# For Public and Sensitive data

Cypress 16 separates values into two kinds:

1. Public values, such as URLs or a test email, go in expose and are read with Cypress.expose().
2. Secrets, such as passwords, tokens and API keys, go in env and are read with cy.env().

# API Testing
API: SIMPLE GET requests, POST with a body, and a login token for PUT and DELETE.
1. apiUrl has to be defined before it's used.
2. The request has to be inside an it(), which is one test.
3. The it() has to be inside a describe(), which groups the tests.





Important Youtube links to check:
1. Command chaining in cypress - https://www.youtube.com/watch?v=WHDvViZazWI
