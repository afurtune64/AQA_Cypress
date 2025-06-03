/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Sign up").click();
    cy.get(".modal-body").should("be.visible");
  });

  // Registration form
  // Name validation

  it("Name. by empty input", () => {
    cy.get('input[name="name"]').clear().blur();
    cy.contains("Name required").should("be.visible");
    cy.get('input[name="name"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
  it("Name. by wrong data", () => {
    cy.get('input[name="name"]').type("@#");
    cy.get('input[name="name"]').blur();
    cy.contains("Name is invalid").should("be.visible");
    cy.get('input[name="name"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
  it("Name. by special characters", () => {
    const specialChars = [
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
      "{",
      "}",
      "|",
      ":",
      "<",
      ">",
      "?",
    ];
    specialChars.forEach((char) => {
      cy.get('input[name="name"]').clear().type(`x${char}`).blur();
      cy.contains("Name is invalid").should("be.visible");
      cy.get('input[name="name"]').should(
        "have.css",
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });

  it("Name. by less than 2 symbols", () => {
    cy.get('input[name="name"]').type("A").blur();
    cy.contains("Name has to be from 2 to 20 characters long").should(
      "be.visible"
    );
    cy.get('input[name="name"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Name. by more than 20 symbols", () => {
    cy.get('input[name="name"]').type("A".repeat(21)).blur();
    cy.contains("Name has to be from 2 to 20 characters long").should(
      "be.visible"
    );
    cy.get('input[name="name"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Name. by only the EN symbols", () => {
    const invalidInputs = ["A123", "Аліна", "阿丽娜", "Păcuraru"];
    invalidInputs.forEach((input) => {
      cy.get('input[name="name"]').clear().type(input).blur();
      cy.contains("Name is invalid").should("be.visible");
      cy.get('input[name="name"]').should(
        "have.css",
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    it("Name. by ignore space", () => {
      cy.get('input[name="name"]').type("  Alina  ").blur();
      cy.get('input[name="name"]')
        .invoke("val")
        .then((val) => {
          expect(val.trim()).to.eq("Alina");
        });
      cy.contains("Name is required").should("not.exist");
      cy.get('input[name="name"]').should(
        "not.have.css",
        "border-color",
        "rgb(220, 53, 69)"
      );
    });

    it("Name. by correct entering", () => {
      cy.get('input[name="name"]').type("Alina").blur();
      cy.contains("Name is required").should("not.exist");
      cy.get('input[name="name"]').should(
        "not.have.css",
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });

  // Last name validation

  it("Last name. by empty input", () => {
    cy.get('input[name="lastName"]').clear().blur();
    cy.contains("Last name required").should("be.visible");
    cy.get('input[name="lastName"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
  it("Last name. by wrong data", () => {
    cy.get('input[name="lastName"]').type("@#");
    cy.get('input[name="lastName"]').blur();
    cy.contains("Last name is invalid").should("be.visible");
    cy.get('input[name="lastName"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
  it("Last name. by special characters", () => {
    const specialChars = [
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
      "{",
      "}",
      "|",
      ":",
      "<",
      ">",
      "?",
    ];
    specialChars.forEach((char) => {
      cy.get('input[name="lastName"]').clear().type(`x${char}`).blur();
      cy.contains("Last name is invalid").should("be.visible");
      cy.get('input[name="lastName"]').should(
        "have.css",
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });

  it("Last name. by less than 2 symbols", () => {
    cy.get('input[name="lastName"]').type("A").blur();
    cy.contains("Last name has to be from 2 to 20 characters long").should(
      "be.visible"
    );
    cy.get('input[name="lastName"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Last name. by more than 20 symbols", () => {
    cy.get('input[name="lastName"]').type("A".repeat(21)).blur();
    cy.contains("Last name has to be from 2 to 20 characters long").should(
      "be.visible"
    );
    cy.get('input[name="lastName"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Last name. by only the EN symbols", () => {
    const invalidInputs = ["A123", "Аліна", "阿丽娜", "Păcuraru"];
    invalidInputs.forEach((input) => {
      cy.get('input[name="lastName"]').clear().type(input).blur();
      cy.contains("Last name is invalid").should("be.visible");
      cy.get('input[name="lastName"]').should(
        "have.css",
        "border-color",
        "rgb(220, 53, 69)"
      );
    });
  });

  it("Last name. by ignore space", () => {
    cy.get('input[name="lastName"]').type("  Alina  ").blur();
    cy.get('input[name="lastName"]')
      .invoke("val")
      .then((val) => {
        expect(val.trim()).to.eq("Alina");
      });
    cy.contains("Last name is required").should("not.exist");
    cy.get('input[name="lastName"]').should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Last name. by correct entering", () => {
    cy.get('input[name="lastName"]').type("Alina").blur();
    cy.contains("Last name is required").should("not.exist");
    cy.get('input[name="lastName"]').should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  // Email field validation
  it("Email. by empty field", () => {
    cy.get('input[name="email"]').clear().blur();
    cy.contains("Email required").should("be.visible");
    cy.get('input[name="email"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Email. by wrong data", () => {
    cy.get('input[name="email"]').type("alinatest.com");
    cy.get('input[name="email"]').blur();
    cy.contains("Email is incorrect").should("be.visible");
    cy.get('input[name="email"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Email. by correct entering", () => {
    cy.get('input[name="email"]').type("alina@test.com").blur();
    cy.contains("Email is required").should("not.exist");
    cy.get('input[name="email"]').should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  // Password field validation

  it("Password. by empty field", () => {
    cy.get('input[name="password"]').clear().blur();
    cy.contains("Password required").should("be.visible");
    cy.get('input[name="password"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Password. by less than 8 symbols", () => {
    cy.get('input[name="password"]').type("A").blur();
    cy.contains(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    ).should("be.visible");
    cy.get('input[name="password"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Password. by more than 15 symbols", () => {
    cy.get('input[name="password"]').type("A".repeat(16)).blur();
    cy.contains(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    ).should("be.visible");
    cy.get('input[name="password"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Password. by correct entering", () => {
    cy.get('input[name="password"]').type("Test123!").blur();
    cy.contains("Password is required").should("not.exist");
    cy.get('input[name="password"]').should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  //Re-enter password filed validation

  it("Re-enter password. by empty field", () => {
    cy.get('input[name="repeatPassword"]').clear().blur();
    cy.contains("Re-enter password required").should("be.visible");
    cy.get('input[name="repeatPassword"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Re-enter password. by password do not match", () => {
    cy.get('input[name="password"]').type("Test123!");
    cy.get('input[name="repeatPassword"]').type("Test1234!").blur();
    cy.contains("Passwords do not match").should("be.visible");
    cy.get('input[name="repeatPassword"]').should(
      "have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });

  it("Re-enter password. by password do not match", () => {
    cy.get('input[name="password"]').type("Test123!");
    cy.get('input[name="repeatPassword"]').type("Test123!").blur();
    cy.contains("Passwords do not match").should("not.exist");
    cy.get('input[name="repeatPassword"]').should(
      "not.have.css",
      "border-color",
      "rgb(220, 53, 69)"
    );
  });
  // Register button validation
  it("Register btn. by invalid data", () => {
    cy.get('input[name="name"]').type("Alina");
    cy.get('input[name="lastName"]').type("Furtune");
    cy.get('input[name="email"]').type("Alinatest.com'");
    cy.get('input[name="password"]').type("Test1234!");
    cy.get('input[name="repeatPassword"]').type("Test1234!");
    cy.get("button").contains("Register").should("be.disabled");
  });

  it("Register btn. by valid data", () => {
    const email = `alina.test+1${Date.now()}@test.com`;
    cy.get('input[name="name"]').type("Alina");
    cy.get('input[name="lastName"]').type("Furtune");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type("Test1234!@");
    cy.get('input[name="repeatPassword"]').type("Test1234!@");
    cy.get("button").contains("Register").should("not.be.disabled").click();
    cy.get(".panel-layout").should("be.visible");
  });
});
