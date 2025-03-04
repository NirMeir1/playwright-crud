import { faker } from "@faker-js/faker";
import { User } from "../models/userModel";

export class TestDataFactory {
  static generateUser(): User {
    return new User(null, faker.person.fullName(), faker.internet.email());
  }
}
