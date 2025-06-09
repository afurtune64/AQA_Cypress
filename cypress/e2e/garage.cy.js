import Homepage from "../pom/pages/Homepage";
import SignInForm from "../pom/forms/SignInForm";
import GaragePage from "../pom/pages/GaragePage";
import "../support/commands";

describe("Garage Functionality", () => {
  beforeEach(() => {
    Homepage.visit();
    SignInForm.signIn(Cypress.env("userEmail"), Cypress.env("userPassword"));
    GaragePage.pageHeader.should("be.visible");
  });

  it("should add a new car", () => {
    GaragePage.addCar("Fiat", "Panda", "50");
    GaragePage.verifyCarAdded("Fiat", "Panda");
  });
});
