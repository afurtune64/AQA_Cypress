/// <reference types="cypress" />
import HomePage from "../../pom/pages/Homepage";
import GaragePage from "../../pom/pages/GaragePage";
import SignInForm from "../../pom/forms/SignInForm";

describe("API Tests for Garage Page", () => {
  it("Intercept query", () => {
    cy.intercept("GET", "/api/cars").as("getCars");
    HomePage.visit();
    SignInForm.signIn("testuser1@furtune.com", "Test1234!");
    cy.get("h1").should("have.text", "Garage");
    cy.wait("@getCars").its("response.statusCode").should("eq", 200);
  });

  it("Intercept GET request. Fake response", () => {
    const fakeResponseBody = {
      status: "ok",
      data: [
        {
          id: 364466,
          carBrandId: 1,
          carModelId: 5,
          initialMileage: 6,
          updatedMileageAt: "2025-06-09T15:57:13.000Z",
          carCreatedAt: "2025-06-09T15:54:13.000Z",
          mileage: 6,
          brand: "Audi",
          model: "A8",
          logo: "audi.png",
        },
      ],
    };
    cy.intercept("GET", "/api/cars", fakeResponseBody);
    HomePage.visit();
    SignInForm.signIn("testuser1@furtune.com", "Test1234!");
    cy.get("h1").should("have.text", "Garage");
  });

  it("Intercept POST request. Post new Car", () => {
    cy.intercept("POST", "/api/cars").as("addCar");
    HomePage.visit();
    SignInForm.signIn("testuser1@furtune.com", "Test1234!");
    cy.get("h1").should("have.text", "Garage");
    cy.get("div.panel-page_heading .btn-primary").click();
    cy.get("#addCarBrand").select("Audi");
    cy.get("#addCarModel").select("A8");
    cy.get("#addCarMileage").type("1000");
    cy.get("app-add-car-modal .btn-primary").click();
    cy.wait("@addCar").its("response.statusCode").should("eq", 201);
    cy.get(".car-item").should("contain", "Audi").and("contain", "A8");
  });

  it("Intercept GET /api/cars after adding new car", () => {
    cy.intercept("POST", "/api/cars").as("addCar");
    cy.intercept("GET", "/api/cars").as("getCars");

    HomePage.visit();
    SignInForm.signIn("testuser1@furtune.com", "Test1234!");
    cy.get("h1").should("have.text", "Garage");
    cy.get("div.panel-page_heading .btn-primary").click();
    cy.get("#addCarBrand").select("BMW");
    cy.get("#addCarModel").select("5");
    cy.get("#addCarMileage").type("568");
    cy.get("app-add-car-modal .btn-primary").click();
    cy.wait("@addCar");
    cy.wait("@getCars");
    cy.contains("BMW 5").should("exist");
  });

  // Не знаю поки чому не працює

  // it("Intercept GET request. Retrieves car by ID", () => {
  //     cy.intercept("POST", "/api/cars").as("addCarById");
  //     HomePage.visit();
  //     SignInForm.signIn("testuser1@furtune.com", "Test1234!");
  //     cy.get("h1").should("have.text", "Garage");
  //     cy.get("div.panel-page_heading .btn-primary").click();
  //     cy.get("#addCarBrand").select("BMW");
  //     cy.get("#addCarModel").select("5");
  //     cy.get("#addCarMileage").type("568");
  //     cy.get("app-add-car-modal .btn-primary").click();
  //     cy.wait("@addCarById").then((interception) => {
  //       const carId = interception.response.body.data.id;
  //       cy.intercept("GET", `/api/cars/${carId}`).as("getCarById");
  //       cy.wait("@getCarById").its("response.statusCode").should("eq", 200);
  //       cy.wait("@getCarById").its("response.body.data.id").should("eq", carId);
  //     });
  //   });

  it("Intercept PUT request. Updates car details", () => {
    cy.intercept("POST", "/api/cars").as("addCar");
    HomePage.visit();
    SignInForm.signIn("testuser1@furtune.com", "Test1234!");
    cy.get("h1").should("have.text", "Garage");
    cy.get("div.panel-page_heading .btn-primary").click();
    cy.get("#addCarBrand").select("Ford");
    cy.get("#addCarModel").select("Sierra");
    cy.get("#addCarMileage").type("500");
    cy.get("app-add-car-modal .btn-primary").click();
    cy.wait("@addCar", { timeout: 10000 }).then((interception) => {
      const carId = interception.response.body.data.id;
      cy.intercept("PUT", `/api/cars/${carId}`).as("updateCar");
      cy.get(".car-item")
        .contains("Ford")
        .parents(".car-item")
        .find(".car_edit")
        .click();
      cy.get("#addCarModel").select("Fusion");
      cy.get("div.modal-footer .btn-primary").click();
      cy.wait("@updateCar", { timeout: 10000 })
        .its("response.statusCode")
        .should("eq", 200);
      cy.reload();
      cy.get(".car-item")
        .contains("Ford")
        .parents(".car-item")
        .should("contain", "Fusion");
    });
  });

  it("Intercept DELETE request. Deletes car", () => {
    cy.intercept("POST", "/api/cars").as("addCar");
    HomePage.visit();
    SignInForm.signIn("testuser1@furtune.com", "Test1234!");
    cy.get("h1").should("have.text", "Garage");
    cy.get("div.panel-page_heading .btn-primary").click();
    cy.get("#addCarBrand").select("Fiat");
    cy.get("#addCarModel").select("Punto");
    cy.get("#addCarMileage").type("344");
    cy.get("app-add-car-modal .btn-primary").click();
    cy.wait("@addCar", { timeout: 10000 }).then((interception) => {
      const carId = interception.response.body.data.id;
      cy.intercept("DELETE", `/api/cars/${carId}`).as("deleteCar");
      cy.get(".car-item")
        .contains("Fiat")
        .parents(".car-item")
        .find(".car_edit")
        .click();
      cy.get(".btn").contains("Remove").click();
      cy.get("div.modal-footer .btn-danger").click();
      cy.wait("@deleteCar", { timeout: 10000 })
        .its("response.statusCode")
        .should("eq", 200);
      cy.wait(1000);
      cy.get(".car-item").should("not.have", "Fiat");
    });
  });
});
