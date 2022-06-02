// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("visits the gfn root url", () => {
    cy.visit("/");
    cy.contains("h1", "You did it!");
  });
});
