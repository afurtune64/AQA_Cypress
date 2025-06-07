/// <reference types="cypress" />

describe("Sign in tests without POM", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".header_signin").click();
  });
  it("Successful Log in", () => {
    cy.get("signInEmail").type("a.test.katrina@gmail.com");
    cy.get("signInPassword").type("Test123!");
    cy.get("app-signin-modal .btn-primary").click();
    cy.get("h1").should("have.text", "Garage");
  });
});
