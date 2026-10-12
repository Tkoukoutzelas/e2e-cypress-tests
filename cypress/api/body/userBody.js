import { faker } from '@faker-js/faker';

export const uniqueEmail = () =>
  `qa.${Date.now()}.${faker.string.alphanumeric({ length: 6, casing: 'lower' })}@example.com`;

export const buildUserBody = (overrides = {}) => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: uniqueEmail(),
  password: faker.internet.password({ length: 12 }),
  ...overrides,
});
