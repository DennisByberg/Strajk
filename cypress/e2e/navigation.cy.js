describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  /*/ //-----------------------------------------|
	As a user, I want to be able to navigate between the booking and confirmation view.
  */ //------------------------------------------|
  it("Should display the nav-icon correctly", () => {
    cy.get(".navigation__icon").should("be.visible");
  });

  it("Should be possible to navigate beetween the home view and the confirmation view", () => {
    // Trycker på nav bar...
    cy.get(".navigation__icon").click();
    // Trycker på confimation...
    cy.get(".navigation__link").last().click();
    // Kollar så att vi fått upp navigations view...
    cy.get(".confirmation").should("be.visible");
    // Trycker på nav bar...
    cy.get(".navigation__icon").click();
    // Trycker på booking...
    cy.get(".navigation__link").first().click();
    // Kollar så att vi fått upp boknings view...
    cy.get(".booking").should("be.visible");
  });
});
