class ContactDetailsPage {
  get deleteButton() { return cy.get('#delete'); }

  shouldBeLoaded() {
    cy.url().should('include', '/contactDetails');
  }

  shouldShowContact({ firstName, lastName, birthdate, email, phone }) {
    this.shouldBeLoaded();
    cy.get('#firstName').should('have.text', firstName);
    cy.get('#lastName').should('have.text', lastName);
    if (birthdate) cy.get('#birthdate').should('have.text', birthdate);
    if (email) cy.get('#email').should('have.text', email);
    if (phone) cy.get('#phone').should('have.text', phone);
  }

  delete() {
    cy.on('window:confirm', () => true);
    this.deleteButton.click();
  }
}

export default new ContactDetailsPage();
