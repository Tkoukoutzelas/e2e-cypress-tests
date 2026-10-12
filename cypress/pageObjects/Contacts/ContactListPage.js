class ContactListPage {
  get addContactButton() { return cy.get('#add-contact'); }
  get logoutButton() { return cy.get('#logout'); }
  get rows() { return cy.get('.contactTableBodyRow'); }

  rowFor({ firstName, lastName }) {
    return cy.contains('.contactTableBodyRow', `${firstName} ${lastName}`);
  }

  shouldBeLoaded() {
    cy.url().should('include', '/contactList');
    this.addContactButton.should('be.visible');
  }

  clickAddContact() {
    this.addContactButton.click();
  }

  openContact(contact) {
    this.rowFor(contact).click();
  }

  shouldContainContact(contact) {
    this.rowFor(contact).should('be.visible');
  }

  shouldNotContainContact(contact) {
    cy.contains('.contactTableBodyRow', `${contact.firstName} ${contact.lastName}`).should('not.exist');
  }
}

export default new ContactListPage();
