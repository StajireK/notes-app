describe("template spec", () => {
  it("should display the notes list", () => {
    cy.visit("http://localhost:9000");
    cy.get(".note-list-container").should("have.length.greaterThan", 0);
  });
});
