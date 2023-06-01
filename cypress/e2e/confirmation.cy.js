describe("Confirmation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    // Matar in ett fungerande datum och kollar om inmatningen skett korrekt...
    cy.get(".input__field")
      .first()
      .type("2023-09-14")
      .should("have.value", "2023-09-14");
    // Matar in en fungerande tid och kollar om inmatningen skett korrekt...
    cy.get(".input__field").eq(1).type("20:00").should("have.value", "20:00");
    // Matar in antal bowlare och kollar om inmatningen skett korrekt...
    cy.get(".input__field").eq(2).type("2").should("have.value", "2");
    // Matar in antal banor och kollar om inmatningen skett korrekt...
    cy.get(".input__field").eq(3).type("1").should("have.value", "1");
    // Trycker på "+"...
    cy.get(".shoes__button").first().click();
    // Matar in antal skor och kollar om inmatningen skett korrekt...
    cy.get(".input__field.shoes__input").type("43").should("have.value", "43");
    // Trycker på "+" för att få upp en till input för skor...
    cy.get(".shoes__button").eq(1).click();
    // Matar in antal skor i andra input och kollar om inmatningen skett korrekt...
    cy.get(".input__field.shoes__input")
      .eq(1)
      .type("37")
      .should("have.value", "37");

    cy.get(".button.booking__button").click();
  });

  /*/ //-----------------------------------------|
   As a user, I want to be able to send my reservation and get back a reservation number and total so I know how much I have to pay. (120 SEK / person + 100 SEK / course).
   */ //-----------------------------------------|
  it("Should be able to see a confirmation page", () => {
    cy.get(".confirmation").should("be.visible");
  });

  it("Should be able to see a reservation number", () => {
    cy.get(".input__field.confirmation__input")
      .last()
      .should(($input) => {
        expect($input.val()).to.have.lengthOf(11);
      });
  });

  it("Should be able to see a total number", () => {
    cy.get(".confirmation__price")
      .find("p")
      .last()
      .should("have.text", "340 sek");
  });
});
