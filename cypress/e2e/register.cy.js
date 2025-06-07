/// <reference types="cypress" />

describe("User Registration", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Sign up").click();
    cy.get(".modal-body").should("be.visible");
    cy.get("#signupName").type("Test");
    cy.get("#signupLastName").type("User");
    cy.get("#signupEmail").type(Cypress.env("userEmail"));
    cy.get("#signupPassword").type(Cypress.env("userPassword"));
    cy.get("#signupRepeatPassword").type(Cypress.env("userPassword"));
    cy.get("button").contains("Register").click();
  });

  it("should register a new user", () => {
    cy.get(".modal-body").should("contain", "User already exists");
  });
});
