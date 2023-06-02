describe("Booking", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  /*/ //-----------------------------------------|
   As a user, I want to be able to book a date and time and specify the number of players so that I can reserve 1 or more lanes in the bowling alley.
   */ //-----------------------------------------|
  it("Should be possible to enter a date in the date input", () => {
    // Hitta input fältet för datum och kolla om labeln är "Date"...
    cy.get('label[class="input__label"]').first().contains("Date");
    // Matar in ett fungerande datum och kollar om inmatningen skett korrekt...
    cy.get(".input__field")
      .first()
      .type("2022-03-12")
      .should("have.value", "2022-03-12");
  });

  it("Should be possible to enter time in the time input.", () => {
    // Hitta input fältet för tid och kolla om labeln är "Time"...
    cy.get('label[class="input__label"]').eq(1).contains("Time");
    // Matar in en fungerande tid och kollar om inmatningen skett korrekt...
    cy.get(".input__field").eq(1).type("18:00").should("have.value", "18:00");
  });

  it("Should be possible to enter the number of bowlers", () => {
    // Hitta input fältet för bowlare och kolla om labeln är "Number of awesome bowlers"...
    cy.get('label[class="input__label"]')
      .eq(2)
      .contains("Number of awesome bowlers");
    // Matar in antal bowlare och kollar om inmatningen skett korrekt...
    cy.get(".input__field").eq(2).type("2").should("have.value", "2");
  });

  it("Should be possible to enter the number of lanes", () => {
    // Hitta input fältet för bowlare och kolla om labeln är "Number of lanes"...
    cy.get('label[class="input__label"]').eq(3).contains("Number of lanes");
    // Matar in antal banor och kollar om inmatningen skett korrekt...
    cy.get(".input__field").eq(3).type("1").should("have.value", "1");
  });

  ////// ERROR-HANDLING //////
  it("Should display an error message if all fields are not filled correctly", () => {
    // Trycker på STRIKE utan att ha fyllt i något fält...
    cy.get(".button.booking__button").click();
    cy.get(".error-message").should("be.visible");

    // datum...
    cy.get(".input__field").first().type("2022-03-12");

    // Trycker på STRIKE efter att ha fyllt i datum...
    cy.get(".button.booking__button").click();
    cy.get(".error-message").should("be.visible");

    // tid...
    cy.get(".input__field").eq(1).type("18:00");

    // Trycker på STRIKE efter att ha fyllt i datum och tid...
    cy.get(".button.booking__button").click();
    cy.get(".error-message").should("be.visible");

    // antal bowlare...
    cy.get(".input__field").eq(2).type("2");

    // Trycker på STRIKE efter att ha fyllt i datum, tid och antal bowlare...
    cy.get(".button.booking__button").click();
    cy.get(".error-message").should("be.visible");

    // antal banor...
    cy.get(".input__field").eq(3).type("1");

    // Trycker på STRIKE efter att ha fyllt i datum, tid, antal bowlare och antal banor...
    cy.get(".button.booking__button").click();
    cy.get(".error-message").should("be.visible");

    // ett par skor...
    cy.get(".shoes__button").click();
    cy.get(".input__field.shoes__input").type("42");

    // Trycker på STRIKE efter att ha fyllt i datum, tid, antal bowlare, antal banor och ett par skor...
    cy.get(".button.booking__button").click();
    cy.get(".error-message").should("be.visible");

    // andra paret skor...
    cy.get(".shoes__button").eq(1).click();
    cy.get(".input__field.shoes__input").eq(1).type("45");

    // Trycker på STRIKE efter att ha fyllt i allt korrekt...
    cy.get(".button.booking__button").click();
    // Nu ska allt funka...
    cy.get(".confirmation").should("be.visible");
  });

  it("Should only be possible to enter a number in the number of bowlers field.", () => {
    // Matar in antal bowlare med en bokstav och kollar så att det inte funkade...
    cy.get(".input__field").eq(2).type("X").should("have.value", "");
  });

  it("Should only be possible to enter a number in the number of lanes field.", () => {
    // Matar in antal banor med en bokstav och kollar så att det inte funkade...
    cy.get(".input__field").eq(3).type("X").should("have.value", "");
  });

  /*/ //-----------------------------------------|
  As a user, I want to be able to choose the shoe size for each player so that each player gets shoes that fit.
  */ //------------------------------------------|
  it("Should be possible to add one pair of shoes", () => {
    // Trycker på "+"...
    cy.get(".shoes__button").click();
    // Kollar om vi får upp rätt form...
    cy.get(".shoes__form").should("be.visible");
    // Matar in antal skor och kollar om inmatningen skett korrekt...
    cy.get(".input__field.shoes__input").type("42").should("have.value", "42");
  });

  it("Should be possible to add two pair of shoes", () => {
    // Trycker på "+"...
    cy.get(".shoes__button").first().click();
    // Kollar om vi får upp rätt form...
    cy.get(".shoes__form").should("be.visible");
    // Matar in antal skor och kollar om inmatningen skett korrekt...
    cy.get(".input__field.shoes__input").type("43").should("have.value", "43");
    // Trycker på "+" för att få upp en till input för skor...
    cy.get(".shoes__button").eq(1).click();
    // Matar in antal skor i andra input och kollar om inmatningen skett korrekt...
    cy.get(".input__field.shoes__input")
      .eq(1)
      .type("45")
      .should("have.value", "45");
  });

  ////// ERROR-HANDLING //////
  it("Should only be possible to enter a number in the shoe-size field.", () => {
    // Trycker på "+"...
    cy.get(".shoes__button").click();
    // Matar in en bokstav och kollar så att det inte fungerade...
    cy.get(".input__field.shoes__input").type("X").should("have.value", "");
  });

  it("Should display an error message if the number does not match the number of bowlers.", () => {
    cy.visit("http://localhost:5173/");

    // Matar in en reservation med ett par skor för lite...
    cy.get(".input__field").first().type("2023-09-14");
    cy.get(".input__field").eq(1).type("20:00");
    cy.get(".input__field").eq(2).type("2").should("have.value", "2");
    cy.get(".input__field").eq(3).type("1").should("have.value", "1");
    cy.get(".shoes__button").first().click();
    cy.get(".input__field.shoes__input").type("43");
    cy.get(".button.booking__button").click();

    // Kollar så att error meddelandet visas...
    cy.get(".error-message").should("be.visible");
  });

  /*/ //-----------------------------------------|
  // As a user, I want to be able to remove a shoe size field if I happened to click one too many so I don't book shoes unnecessarily.
  */ //------------------------------------------|
  it("Should display a minus icon when i press add shoes.", () => {
    // Trycker på "+"...
    cy.get(".shoes__button").first().click();
    // Kontrollerar så att en minus ikon är synlig...
    cy.get(".shoes__button.shoes__button--small").should("be.visible");
  });

  it("Should be possible to remove a pair of shoes", () => {
    // Trycker på "+" två gånger...
    cy.get(".shoes__button").first().click();
    cy.get(".shoes__button").eq(1).click();
    // Kollar så att vi har två shoes form eftersom vi lagt till ett par skor två gånger...
    cy.get(".shoes__form").should("have.length", "2");
    // Trycker på "-" för att ta bort ett par skor...
    cy.get(".shoes__button").eq(1).click();
    // Kollar så att shoes__form har tagits bort och borttagningen utförts korrekt...
    cy.get(".shoes__form").should("have.length", "1");
  });
});
