// API tests for the Restful-Booker practice API.
// To execute test from command line: npx cypress run --spec cypress/e2e/test/apitest/booking.cy.ts

// Health check API test: GET /ping
// Shows the different kinds of assertions ythat we can make on an API response.

//const apiUrl: string = Cypress.expose('API_URL')
 
describe('Health Check API - GET /ping', () => {
 
    // Inside describe(), so it doesn't clash with other test files
    const apiUrl: string = Cypress.expose('API_URL')
 
    it('TC01 - should return 201 Created (expect style)', () => {
        cy.request('GET', `${apiUrl}/ping`).then((response) => {
 
            // 1. Status code: the number
            expect(response.status).to.eq(201)
 
            // 2. Status text: the message that goes with the code
            expect(response.statusText).to.eq('Created')
 
            // 3. isOkStatusCode: true for any 2xx code
            expect(response.isOkStatusCode).to.be.true
 
            // 4. Body: what the API sends back
            expect(response.body).to.eq('Created')
            expect(response.body).to.be.a('string')
 
            // 5. Headers: information about the response
            expect(response.headers).to.have.property('content-type')
            expect(response.headers['content-type']).to.include('text/plain')
 
            // 6. Duration: how long the request took, in milliseconds
            expect(response.duration).to.be.lessThan(3000)
        })
    })
 
    it('TC02 - should return 201 Created (should style)', () => {
        // .its() picks one part of the response; .should() checks it
        cy.request('GET', `${apiUrl}/ping`).as('ping')
 
        cy.get('@ping').its('status').should('eq', 201)
        cy.get('@ping').its('statusText').should('eq', 'Created')
        cy.get('@ping').its('body').should('eq', 'Created')
        cy.get('@ping').its('headers').its('content-type').should('include', 'text/plain')
        cy.get('@ping').its('duration').should('be.lessThan', 3000)
    })
})