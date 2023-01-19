

// const searchSpec = 
describe("Weather search - ", () => {
  beforeEach(() => {
    cy.intercept("https://goweather.herokuapp.com/weather/*", {
      fixture: `../fixtures/weather.json`,
    }).as("getWeather");
  });

  it("should click select input", () => {

    cy.visit("/");
    cy.get("[data-cy=select]>select").select(2);
    cy.get("button").click();
    cy.wait("@getWeather").its('request.url').should('include', 'London') 

  });
});

export { };