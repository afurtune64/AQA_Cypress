Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get(".header_signin").click();
  cy.get("input[type='email']").type(email);
  cy.get("input[type='password']").type(password);
  cy.get("button[type='submit").click();
});
