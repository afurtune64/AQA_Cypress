/// <reference types="cypress" />

import Homepage from "../pom/pages/Homepage";
import GaragePage from "../pom/pages/GaragePage";
import ExpensesPage from "../pom/pages/ExpensesPage";
import SignInForm from "../pom/forms/SignInForm";
import "../support/commands";

describe("Fuel Expenses Functionality", () => {
  beforeEach(() => {
    Homepage.visit();
    SignInForm.signIn(Cypress.env("userEmail"), Cypress.env("userPassword"));
    GaragePage.pageHeader.should("be.visible");
    GaragePage.addCar("Audi", "TT", "248");
    cy.get(".car-item").invoke("attr", "data-car-id").as("carId");
  });

  it("should add fuel expense for a car", () => {
    ExpensesPage.visit();

    ExpensesPage.addFuelExpense("50", "1000");
  });
});
