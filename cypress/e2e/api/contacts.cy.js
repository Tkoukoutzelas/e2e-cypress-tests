import { ENDPOINTS } from '../../api/constants/endpoints';
import { STATUS } from '../../api/constants/statusCodes';
import { MESSAGES } from '../../api/constants/messages';
import { buildContactBody } from '../../api/body/contactBody';
import { apiCreateUser, apiCreateContact } from '../../api/helpers/apiHelpers';

const auth = (token) => ({ Authorization: `Bearer ${token}` });

describe('Contacts API', () => {
  beforeEach(() => {
    apiCreateUser().then((user) => cy.wrap(user).as('user'));
  });

  it('creates a contact', function () {
    const body = buildContactBody();
    cy.request({ method: 'POST', url: ENDPOINTS.CONTACTS, body, headers: auth(this.user.token) }).then((res) => {
      expect(res.status).to.eq(STATUS.CREATED);
      expect(res.body).to.include({ firstName: body.firstName, lastName: body.lastName, email: body.email });
    });
  });

  it('lists the created contact', function () {
    apiCreateContact(this.user.token).then((contact) => {
      cy.request({ url: ENDPOINTS.CONTACTS, headers: auth(this.user.token) }).then((res) => {
        expect(res.status).to.eq(STATUS.OK);
        expect(res.body.map((c) => c._id)).to.include(contact.id);
      });
    });
  });

  it('rejects a contact with an invalid birthdate', function () {
    cy.request({
      method: 'POST',
      url: ENDPOINTS.CONTACTS,
      body: buildContactBody({ birthdate: '2024-02-31' }),
      headers: auth(this.user.token),
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(STATUS.BAD_REQUEST);
      expect(res.body.message).to.contain(MESSAGES.INVALID_BIRTHDATE);
    });
  });

  it('deletes a contact', function () {
    apiCreateContact(this.user.token).then((contact) => {
      cy.request({ method: 'DELETE', url: ENDPOINTS.contactById(contact.id), headers: auth(this.user.token) })
        .its('status').should('eq', STATUS.OK);
      cy.request({ url: ENDPOINTS.contactById(contact.id), headers: auth(this.user.token), failOnStatusCode: false })
        .its('status').should('eq', STATUS.NOT_FOUND);
    });
  });

  it('rejects requests without a token', () => {
    cy.request({ url: ENDPOINTS.CONTACTS, failOnStatusCode: false })
      .its('status').should('eq', STATUS.UNAUTHORIZED);
  });
});
