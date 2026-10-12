import LoginPage from '../../pageObjects/Login/LoginPage';
import ContactListPage from '../../pageObjects/Contacts/ContactListPage';
import AddContactPage from '../../pageObjects/Contacts/AddContactPage';
import ContactDetailsPage from '../../pageObjects/Contacts/ContactDetailsPage';
import { buildContactBody } from '../../api/body/contactBody';
import { apiCreateUser, apiCreateContact } from '../../api/helpers/apiHelpers';
import { MESSAGES } from '../../api/constants/messages';

describe('Contacts (UI)', () => {
  beforeEach(() => {
    // Each test gets its own user, created via API for speed and isolation.
    apiCreateUser().then((user) => {
      cy.wrap(user).as('user');
      LoginPage.visit().login(user);
      ContactListPage.shouldBeLoaded();
    });
  });

  it('adds a contact and validates the contact details page', () => {
    const contact = buildContactBody({
      firstName: 'Random',
      lastName: 'Testguy',
      birthdate: '1990-05-17',
      email: 'random.testguy@example.com',
      phone: '2025550147',
    });

    ContactListPage.clickAddContact();
    AddContactPage.fill(contact).submit();

    ContactListPage.shouldContainContact(contact);
    ContactListPage.openContact(contact);
    ContactDetailsPage.shouldShowContact(contact);
  });

  it('shows validation feedback when a contact has an invalid date of birth', () => {
    const contact = buildContactBody({ firstName: 'Invalid', lastName: 'Date' });

    ContactListPage.clickAddContact();
    AddContactPage.fill({ firstName: contact.firstName, lastName: contact.lastName });
    AddContactPage.forceBirthdate('2024-02-31').submit();

    AddContactPage.shouldShowError(MESSAGES.INVALID_BIRTHDATE);
  });

  it('deletes an existing contact and verifies it is removed from the list', function () {
    apiCreateContact(this.user.token).then((contact) => {
      cy.reload();
      ContactListPage.shouldContainContact(contact);

      ContactListPage.openContact(contact);
      ContactDetailsPage.delete();

      ContactListPage.shouldBeLoaded();
      ContactListPage.shouldNotContainContact(contact);
    });
  });
});
