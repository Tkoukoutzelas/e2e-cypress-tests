import { faker } from '@faker-js/faker';

export const buildContactBody = (overrides = {}) => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  birthdate: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).toISOString().slice(0, 10),
  email: faker.internet.email({ provider: 'example.com' }).toLowerCase(),
  phone: faker.string.numeric(10),
  street1: faker.location.streetAddress(),
  street2: faker.location.secondaryAddress(),
  city: faker.location.city(),
  stateProvince: faker.location.state(),
  postalCode: faker.string.numeric(5),
  country: faker.location.country(),
  ...overrides,
});
