/// <reference types="cypress" />

import "cypress-plugin-api";

describe("API tests", () => {
  it("should successfully sign in with valid credentials", () => {
    cy.api("POST", "/api/auth/signin", {
      email: "testuser1@furtune.com",
      password: "Test1234!",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.status).to.eq("ok");
    });
  });

  it("should return status 200 and array of cars", () => {
    cy.api("POST", "/api/auth/signin", {
      email: "testuser1@furtune.com",
      password: "Test1234!",
    }).then((loginRes) => {
      const token = loginRes.body.data.token;
      const authHeader = { Authorization: `Bearer ${token}` };

      cy.api({
        method: "GET",
        url: "/api/cars",
        headers: authHeader,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("ok");
        expect(response.body.data).to.be.an("array");
      });
    });
  });

  it("should return status 200 and Fiat Punto", () => {
    cy.api("POST", "/api/auth/signin", {
      email: "testuser1@furtune.com",
      password: "Test1234!",
    }).then((loginRes) => {
      const token = loginRes.body.data.token;
      const authHeader = { Authorization: `Bearer ${token}` };

      cy.api({
        method: "GET",
        url: "/api/cars",
        headers: authHeader,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq("ok");
        expect(response.body.data).to.be.an("array");
        expect(response.body.data[0]).to.have.property("brand", "Fiat");
        expect(response.body.data[0]).to.have.property("model", "Punto");
      });
    });
  });
});
