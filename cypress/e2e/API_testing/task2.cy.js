/// <reference types="cypress" />
import HomePage from "../../pom/pages/Homepage";
import SignInForm from "../../pom/forms/SignInForm";

describe("Profile page - mock user name", () => {
  it("Fake profile name response", () => {
    const fakeProfile = {
      status: "ok",
      data: {
        id: 1,
        name: "Polar Bear",
      },
    };

    cy.intercept("GET", "/api/users/profile", fakeProfile);

    HomePage.visit();
    SignInForm.signIn("testuser1@furtune.com", "Test1234!");
    cy.get("#userNavDropdown").click();
    cy.contains("Profile").click();

    cy.contains("Polar Bear").should("exist");
  });
});
