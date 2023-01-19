describe("Weather search - ", () => {

  beforeEach(() => {

    cy.intercept("https://goweather.herokuapp.com/weather/*", {
      fixture: `../fixtures/weather.json`,
    }).as("getWeather");

  });

  it("should get weather and show correct info", () => {

    cy.visit("/");

    // @city selection, weather should be fetcher and displayed "today" info
    cy.get("[data-cy=select]>select").select(2);
    cy.get("button").click();
    cy.wait("@getWeather").its('request.url').should('include', 'London');
    
    // }).its('request.url').should('include', 'London')
    cy.get("[data-cy=today]").should("have.class","active");
    cy.get(".description").should("exist");

    // @tab change, 3days tab should be active and display 3 blocks of info
    cy.get("[data-cy=3days]").click();
    cy.get(".weather-info-day").should("have.length", 3)
    
    //@select new city, active tab should return "today"
    cy.get("[data-cy=select]>select").select(3);
    cy.get("button").click();
    cy.get("[data-cy=today]").should("have.class","active");

  });
});