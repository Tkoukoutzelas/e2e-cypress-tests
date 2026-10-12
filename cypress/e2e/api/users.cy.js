import { ENDPOINTS } from '../../api/constants/endpoints';
import { STATUS } from '../../api/constants/statusCodes';
import { MESSAGES } from '../../api/constants/messages';
import { buildUserBody } from '../../api/body/userBody';
import { apiCreateUser } from '../../api/helpers/apiHelpers';

describe('Users API', () => {
  it('creates a user and returns a token', () => {
    const body = buildUserBody();
    cy.request('POST', ENDPOINTS.USERS, body).then((res) => {
      expect(res.status).to.eq(STATUS.CREATED);
      expect(res.body.token).to.be.a('string').and.not.be.empty;
      expect(res.body.user).to.include({ firstName: body.firstName, lastName: body.lastName, email: body.email });
    });
  });

  it('rejects a duplicate email', () => {
    apiCreateUser().then((user) => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.USERS,
        body: buildUserBody({ email: user.email }),
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(STATUS.BAD_REQUEST);
        expect(res.body.message).to.contain(MESSAGES.EMAIL_IN_USE);
      });
    });
  });

  it('logs in with valid credentials', () => {
    apiCreateUser().then(({ email, password }) => {
      cy.request('POST', ENDPOINTS.LOGIN, { email, password }).then((res) => {
        expect(res.status).to.eq(STATUS.OK);
        expect(res.body.token).to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('rejects login with a wrong password', () => {
    apiCreateUser().then(({ email }) => {
      cy.request({
        method: 'POST',
        url: ENDPOINTS.LOGIN,
        body: { email, password: 'wrong-password' },
        failOnStatusCode: false,
      }).its('status').should('eq', STATUS.UNAUTHORIZED);
    });
  });
});
