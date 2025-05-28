/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("by CCS selector", () => {
    cy.get("h1");
  });
  it("by button type", () => {
    cy.get("button").first().should("have.class", "btn");
  });
  it("by footer ", () => {
    cy.get("footer").should("be.visible");
  });
  it("by header ", () => {
    cy.get("header").should("be.visible");
  });
  it("by header links ", () => {
    cy.get(".btn.header-link").should("be.visible");
  });
  it("by primary btn ", () => {
    cy.get(".hero-descriptor_btn.btn.btn-primary").should("be.visible");
  });
  it("by input email", () => {
    cy.contains("button", "Sign In").click();
    cy.get('input[formcontrolname="email"]').should("be.visible");
  });
  it("by input password", () => {
    cy.contains("button", "Sign In").click();
    cy.get('input[formcontrolname="password"]').should("be.visible");
  });
  it("by modal", () => {
    cy.contains("button", "Sign In").click();
    cy.get(".modal-content").should("be.visible");
  });
  it("by modal title", () => {
    cy.contains("button", "Sign In").click();
    cy.get(".modal-content").find(".modal-title").should("be.visible");
  });
});
