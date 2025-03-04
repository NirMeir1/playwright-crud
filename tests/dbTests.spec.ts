import { test, expect } from "@playwright/test";
import { UserService } from "../services/userService";
import { TestDataFactory } from "../utils/testDataFactory";

test.describe("PostgreSQL CRUD Operations with Playwright", () => {
  
  let testUser;

  test.beforeEach(() => {
    testUser = TestDataFactory.generateUser();
  });

  test("Create & Read User", async () => {
    const createdUser = await UserService.createUser(testUser.name, testUser.email);
    const fetchedUser = await UserService.findUser(testUser.email);
    expect(fetchedUser?.email).toBe(createdUser.email);
  });

  test("Delete User", async () => {
    await UserService.createUser(testUser.name, testUser.email);
    const deleted = await UserService.removeUser(testUser.email);
    expect(deleted).toBe(true);
  });

});
