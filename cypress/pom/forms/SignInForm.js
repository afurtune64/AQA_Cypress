const SignInForm = {
  signIn(userEmail, userPassword) {
    cy.visit("/");
    cy.get(".header_signin").click();
    cy.get("#signinEmail").type(userEmail);
    cy.get("#signinPassword").type(userPassword);
    cy.get("app-signin-modal .btn-primary").click();
  },
};

export default SignInForm;
