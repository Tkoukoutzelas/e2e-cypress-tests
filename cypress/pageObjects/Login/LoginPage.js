class LoginPage {
  get emailInput() { return cy.get('#email'); }
  get passwordInput() { return cy.get('#password'); }
  get submitButton() { return cy.get('#submit'); }
  get signUpButton() { return cy.get('#signup'); }
  get errorMessage() { return cy.get('#error'); }

  visit() {
    cy.visit('/');
    return this;
  }

  login({ email, password }) {
    this.emailInput.should('be.visible').type(email);
    this.passwordInput.type(password, { log: false });
    this.submitButton.click();
    return this;
  }

  goToSignUp() {
    this.signUpButton.click();
  }

  shouldShowError(message) {
    this.errorMessage.should('be.visible').and('contain.text', message);
  }
}

export default new LoginPage();
