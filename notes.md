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


# Creating Custom reports in Cypress
===========================================================
https://docs.cypress.io/app/tooling/reporters

Setup for Cypress + TypeScript

Install packages:

Shell
npm install --save-dev \
mochawesome \
mochawesome-merge \
mochawesome-report-generator


Configure cypress.config.ts:

import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  }
});

Add scripts to package.json:
{
  "scripts": {
    "cy:run": "cypress run",
    "merge-report": "npx mochawesome-merge cypress/reports/*.json -o mochawesome.json",
    "generate-report": "npx marge mochawesome.json",
    "test:report": "npm run cy:run && npm run merge-report && npm run generate-report"
  }
}

npm run test:report
Note: Cypress + TypeScript projects generates a single consolidated HTML report after all specs execute

# Jenkins CI Pipeline
=====================================
Workflow :

VS Code (Cypress project) → git push → GitHub → Jenkins (polls) → npm ci → cypress run → JUnit + HTML reports

## Step 1: Get the project CI-ready locally
Jenkins runs Cypress headlessly with no human present. If npx cypress run doesn't pass cleanly on your machine from a fresh install, it won't pass in Jenkins.

npx cypress run


## Step 2 : Install the reporters
Jenkins needs machine-readable results (JUnit XML) for its test trend graphs, and humans want a readable HTML report. cypress-multi-reporters lets you produce both from one run.

npm install --save-dev cypress-multi-reporters mocha-junit-reporter cypress-mochawesome-reporter

## Step 3: Create reporter-config.json in the project root. 
This configures what each reporter produces and where.

## Step 4: Update cypress.config.js
1. reporter and reporterOptions route results through reporter-config.json. That produces the JUnit XML Jenkins reads for its test graphs, plus the HTML report.

2. setupNodeEvents now registers the Mochawesome plugin and returns config.

3. 
screenshotOnRunFailure changed from false to true. In Jenkins nobody watches the browser, so a screenshot of the failing moment is often your only clue. The Mochawesome report embeds it next to the failed test, and Jenkins archives it as an artifact. This would have helped straight away with your register.cy.ts failure.

4. video: false is kept off. Video recording adds noticeable time to each spec, and screenshots cover most debugging needs. Switch it to true later if a failure needs more context than a single frame.

5. retries.runMode: 1 retries a failed test once in headless runs. Our specs hit live public sites (OpenCart demo, Restful Booker on Heroku), which are occasionally slow. 

A single retry stops one-off network hiccups from turning the build red. 

openMode: 0 keeps failures immediate while you're debugging interactively.

## Step 5: Register in support/e2e.ts
import "cypress-mochawesome-reporter/register";
import "./commands";

TypeScript won't complain about missing type definitions here, because it's a side-effect-only import.

Run the : npx cypress run --spec cypress/e2e/test/register.cy.ts

This will create reports (html page) and results (.xml) file for failed test

This is done only to test to check cypress-mochawesome-reporter/ working.

## Step 6: Update package.json file (Sceripts section)
 "scripts": {
    "test": "cypress run",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "cy:clean": "rimraf cypress/results cypress/reports cypress/screenshots cypress/videos",
    "test-dashboard": "npx cypress run --record --config projectId=ww6s3n --key c2ba208c-e8ba-4987-a4a7-b23d7849d9ac"
  },

 - test now runs Cypress instead of the npm placeholder, which exits with an error. npm test is the conventional command people and tools expect.
 - cy:open and cy:run are short, memorable commands for interactive and headless runs.
 - cy:clean deletes old results, reports and screenshots before each run, so Jenkins never mixes old results with new ones. The Jenkinsfile's "Clean Old Results" stage calls this, which is why 
 - rimraf is needed: rm -rf doesn't exist on Windows.

## Step 7: Install rimraf (this is equiavlent to rm -rf)  
npm install --save-dev rimraf

## Step 8: Create or check .gitignore.
Generated output and node_modules shouldn't go into Git:
node_modules/
cypress/results/
cypress/reports/
cypress/screenshots/
cypress/videos/

## Step 9: Stage 3: Prepare Jenkins (one-time setup)

Install plugins. Go to http://localhost:8085/manage/pluginManager/available and install any of these that are missing:
| Plugin |Purpose |
| --- | --- |
| Pipeline | Runs the Jenkinsfile
| Git | Checks out from GitHub
| NodeJS | Makes a specific Node version available to builds
| JUnit	 | Test result graphs and trends
| HTML Publisher | Shows the Mochawesome report inside Jenkins
| Timestamper | Timestamps in console logs


## Step 10: Adding NodeJs 24 in Tools
- http://localhost:8085
- Jenkins > Manage Jenkins > Tools
- Under NodeJS Installation
- name: node24
- Tick : install automatically
- select : node24.18.0  or any version of node js that you have installed on local system for cypress

## Step 11: Configure credentials 

## Step 12: Add Jenkinsfile in the project root.

## Step 13: 
Create the Pipeline job

Before starting, confirm two things:

Your Jenkinsfile with nodejs 'node24' is pushed to the main branch. Check that it's visible on GitHub.
The folder C:\jenkins\cypress-cache exists.

Then:

Open http://localhost:8085 and click New Item.
Enter the name cypress-e2e-pipeline, select Pipeline, and click OK.
Optionally, in the General section, add a description such as Cypress E2E and API tests for cypress-E2E repo.
Scroll down to the Pipeline section and set:
Definition: Pipeline script from SCM
SCM: Git
Repository URL: https://github.com/priyankamastek/cypress-E2E.git
Credentials: leave as - none -
Branch Specifier: */main  or in my case (jenkins-ci-feature)
Script Path: Jenkinsfile
Click Save.

