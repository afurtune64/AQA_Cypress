class ExpensesPage {
  visit() {
    cy.visit("/panel/expenses");
  }

  addFuelExpense(liters, cost) {
    cy.get("div.item-group .btn-primary").contains("Add an expense").click();
    cy.get("#addExpenseMileage").clear().type("1000");
    cy.get("#addExpenseLiters").type(liters);
    cy.get("#addExpenseTotalCost").type(cost);
    cy.get("div.modal-content .btn-primary").contains("Add").click();
  }
}

export default new ExpensesPage();
