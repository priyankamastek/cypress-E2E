// Checking the HTTP Response of API calls

// Run this test spec on CMD: npx cypress run --spec cypress/e2e/test/apitest/booking-api-POST-test.cy.ts


// POST METHOD
describe("Booking API - Create Booking", () => {
  // Inside describe(), so it doesn't clash with other test files
  const apiUrl: string = Cypress.expose("API_URL");

  const newBooking: any = {
    firstname: "John",
    lastname: "Deo",
    totalprice: 1100,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-10-01",
      checkout: "2026-10-05",
    },
    additionalneeds: "Breakfast",
  };
  it("TC03 - should create a new booking and return its details(except style))", () => {
    // Send the request
    cy.request({
      method: "POST",
      url: `${apiUrl}/booking`,
      headers: {
        "Content-Type": "application/json", // we are sending JSON
        Accept: "application/json", // we want JSON back
      },
      body: newBooking,
    }).then((response) => {
      // Check the status
      expect(response.status).to.eq(200);

      // Check the response format
      expect(response.headers["content-type"]).to.include("application/json");

      // Check the new booking id
      expect(response.body.bookingid).to.be.a("number");

      // Check every field matches what we sent
      const booking = response.body.booking;

      expect(booking.firstname).to.eq(newBooking.firstname);
      expect(booking.lastname).to.eq(newBooking.lastname);
      expect(booking.totalprice).to.eq(newBooking.totalprice);
      expect(booking.depositpaid).to.eq(newBooking.depositpaid);
      expect(booking.bookingdates.checkin).to.eq(
        newBooking.bookingdates.checkin,
      );
      expect(booking.bookingdates.checkout).to.eq(
        newBooking.bookingdates.checkout,
      );
      expect(booking.additionalneeds).to.eq(newBooking.additionalneeds);

      // Check the response was fast enough (in milliseconds)
      expect(response.duration).to.be.lessThan(3000);
    });
  });
});
