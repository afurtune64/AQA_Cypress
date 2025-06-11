/// <reference types="cypress" />

describe("Sign in tests without POM", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".header_signin").click();
  });
  it("Successful Log in", () => {
    cy.get("#signinEmail").type(Cypress.env("userEmail"));
    cy.get("#signinPassword").type(Cypress.env("userPassword"));
    cy.get("app-signin-modal .btn-primary").click();
    cy.get("h1").should("have.text", "Garage");
  });

  it.only("Sign in using commands", () => {
    cy.login("testuser1@furtune.com", "Test1234!");
    cy.get("h1").should("have.text", "Garage");
  });
});
