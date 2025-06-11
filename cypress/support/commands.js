Cypress.Commands.add("login", (username, password) => {
  // cy.visit("/");
  // cy.contains("Sign in").click();
  cy.get("#signinEmail").type(username);
  cy.get("#signinPassword").type(password);
  cy.contains("Login").click();
});
