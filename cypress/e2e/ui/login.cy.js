import LoginPage from '../../pageObjects/Login/LoginPage';
import SignUpPage from '../../pageObjects/Login/SignUpPage';
import ContactListPage from '../../pageObjects/Contacts/ContactListPage';
import { buildUserBody } from '../../api/body/userBody';
import { apiCreateUser } from '../../api/helpers/apiHelpers';
import { MESSAGES } from '../../api/constants/messages';

describe('Login & Sign up (UI)', () => {
  it('signs up a new user and lands on the contact list', () => {
    SignUpPage.visit().signUp(buildUserBody());
    ContactListPage.shouldBeLoaded();
  });

  it('logs in with valid credentials', () => {
    apiCreateUser().then((user) => {
      LoginPage.visit().login(user);
      ContactListPage.shouldBeLoaded();
    });
  });

  it('shows an error for invalid credentials', () => {
    LoginPage.visit().login(buildUserBody());
    LoginPage.shouldShowError(MESSAGES.INVALID_CREDENTIALS);
  });
});
