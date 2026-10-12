import { ENDPOINTS } from '../constants/endpoints';
import { buildUserBody } from '../body/userBody';
import { buildContactBody } from '../body/contactBody';

/** Creates a user through the API. Yields { ...userBody, token, id }. */
export const apiCreateUser = (overrides = {}) => {
  const body = buildUserBody(overrides);
  return cy.request('POST', ENDPOINTS.USERS, body).then((res) => ({
    ...body,
    token: res.body.token,
    id: res.body.user._id,
  }));
};

/** Creates a contact through the API for the given user token. Yields { ...contactBody, id }. */
export const apiCreateContact = (token, overrides = {}) => {
  const body = buildContactBody(overrides);
  return cy
    .request({
      method: 'POST',
      url: ENDPOINTS.CONTACTS,
      body,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => ({ ...body, id: res.body._id }));
};
