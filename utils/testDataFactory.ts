import { faker } from "@faker-js/faker";

export class TestDataFactory {
  static generateMember() {
    return {
      surname: faker.person.lastName(),
      firstname: faker.person.firstName(),
      telephone: faker.string.numeric(10) 
    };
  }
}