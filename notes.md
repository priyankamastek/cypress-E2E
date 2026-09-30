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
cy.get('[data-test="signup-first-name"]').type("Bob")
cy.get('[data-test="signup-last-name"]').type("Ross")
cy.get('[data-test="signup-username"]').type("PainterJoy90")
cy.get('[data-test="signup-password"]').type("s3cret")
cy.get('[data-test="signup-confirmPassword"]').type("s3cret")

You can create your own custom commands by placing them inside of cypress/support/commands.ts.
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})












Important Youtube links to check:
1. Command chaining in cypress - https://www.youtube.com/watch?v=WHDvViZazWI
