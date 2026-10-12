class SignUpPage {
  get firstNameInput() { return cy.get('#firstName'); }
  get lastNameInput() { return cy.get('#lastName'); }
  get emailInput() { return cy.get('#email'); }
  get passwordInput() { return cy.get('#password'); }
  get submitButton() { return cy.get('#submit'); }
  get errorMessage() { return cy.get('#error'); }

  visit() {
    cy.visit('/addUser');
    return this;
  }

  signUp({ firstName, lastName, email, password }) {
    this.firstNameInput.should('be.visible').type(firstName);
    this.lastNameInput.type(lastName);
    this.emailInput.type(email);
    this.passwordInput.type(password, { log: false });
    this.submitButton.click();
    return this;
  }
}

export default new SignUpPage();
