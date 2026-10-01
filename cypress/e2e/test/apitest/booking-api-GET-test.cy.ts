// Checking the HTTP Response of API calls

// Run this test spec on CMD: npx cypress run --spec cypress/e2e/test/apitest/booking-api-GET-test.cy.ts

// Try this api call in browser first to see the return response: 
// https://restful-booker.herokuapp.com/booking

// test case for GET METHOD
describe("Checking the HTTP Response of API call", () => {
  // API address comes from 'expose' in cypress.config.ts
  const apiUrl: string = Cypress.expose("API_URL");

  // Pattern for a date like 2026-10-01
  const datePattern: RegExp = /^\d{4}-\d{2}-\d{2}$/;

  it("TC01 - should get the list of all booking ids", () => {
    // Send the request
    cy.request({
      method: "GET",
      url: `${apiUrl}/booking`,
      headers: {
        Accept: "application/json", // we want JSON back
      },
    }).then((response) => {
       console.log("Response object - ", response.body) 
      // Check the status
      expect(response.status).to.eq(200);

      // Check the response format
      expect(response.headers["content-type"]).to.include("application/json");

      // Check the body is a list with at least one booking
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.greaterThan(0);

      // Check the first item has a numeric booking id
      expect(response.body[0]).to.have.property("bookingid");
      expect(response.body[0].bookingid).to.be.a("number");

      // Check the response was fast enough (in milliseconds)
      expect(response.duration).to.be.lessThan(3000);

      // Check the dates exist and look like YYYY-MM-DD
      //expect(response.body[0].bookingdates).to.have.property("checkin");
      //expect(response.body[0].bookingdates).to.have.property("checkout");
      //expect(response.body[0].bookingdates.checkin).to.match(datePattern);
      //expect(response.body[0].bookingdates.checkout).to.match(datePattern);
    });
  });
});
