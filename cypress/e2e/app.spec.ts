describe("Weather App - ", () => {

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
    cy.get("[data-cy=today]").should("have.class", "active");
    cy.get(".description").should("exist");

    // @tab change, 3days tab should be active and display 3 blocks of info
    cy.get("[data-cy=3days]").click();
    cy.get(".weather-info-day").should("have.length", 3)

    //@select new city, active tab should return "today"
    cy.get("[data-cy=select]>select").select(3);
    cy.get("button").click();
    cy.get("[data-cy=today]").should("have.class", "active");

  });

  it("should show animation placeholder only at landing", () => {

    cy.visit("/");

    cy.get(".weather-placeholder-container").should("be.visible");

    // dont show after search
    cy.get("[data-cy=select]>select").select(2);
    cy.get("button").click();
    cy.wait("@getWeather");
    cy.get(".weather-placeholder-container").should("not.exist");

  });

  it("should show error when get fails", () => {

    cy.intercept("https://goweather.herokuapp.com/weather/*", {
      statusCode: 404,
      fixture: `../fixtures/weather_axios_error.json`,
    }).as("getWeatherError");

    cy.visit("/");

    cy.get("[data-cy=select]>select").select(2);
    cy.get("button").click();

    cy.wait("@getWeatherError");


    // error should be visible
    cy.get(".error-icon").should("exist");
    cy.get(".error-message").should("include.text", "Request failed with status code 404");

    // weather-container should NOT be visible
    cy.get(".weather-container").should("not.exist");

    // with another successful search, error should disappear
    cy.intercept("https://goweather.herokuapp.com/weather/*", {
      fixture: `../fixtures/weather.json`,
    }).as("getWeather");

    cy.get("[data-cy=select]>select").select(4);
    cy.get("button").click();
    // error should NOT be visible
    cy.get(".error-message").should("not.exist");
    // weather-container should be visible
    cy.get(".weather-container").should("exist");

  });



});