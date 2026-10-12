const FIELDS = [
  'firstName', 'lastName', 'birthdate', 'email', 'phone',
  'street1', 'street2', 'city', 'stateProvince', 'postalCode', 'country',
];

class AddContactPage {
  get birthdateInput() { return cy.get('#birthdate'); }
  get submitButton() { return cy.get('#submit'); }
  get errorMessage() { return cy.get('#error'); }

  // Fills every field present in `contact`; absent fields are left untouched. 
  fill(contact) {
    cy.get('#firstName').should('be.visible');
    FIELDS.forEach((field) => {
      if (contact[field]) cy.get(`#${field}`).clear().type(contact[field]);
    });
    return this;
  }

  /**
   * Types a value into the birthdate field even if it is not a valid date.
   * The field is a native date input, which silently discards invalid values,
   * so we switch it to a plain text input to exercise server-side validation.
   */
  forceBirthdate(value) {
    this.birthdateInput.invoke('attr', 'type', 'text').clear().type(value);
    return this;
  }

  submit() {
    this.submitButton.click();
  }

  shouldShowError(message) {
    this.errorMessage.should('be.visible').and('contain.text', message);
    cy.url().should('include', '/addContact');
  }
}

export default new AddContactPage();
