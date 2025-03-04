import { test, expect } from "@playwright/test";
import { UserService } from "../services/userService";
import { TestDataFactory } from "../utils/testDataFactory";
import { User } from "../models/userModel";

test.describe("PostgreSQL CRUD Operations with Playwright", () => {
  
  let testUser: User;
  let updatedEmail: string;

  test.beforeEach(() => {
    testUser = TestDataFactory.generateUser();
    updatedEmail = "updated_" + testUser.email;
  });

  // **1️⃣ Create User**
  test("Create User", async () => {
    const createdUser = await UserService.createUser(testUser.name, testUser.email);
    expect(createdUser).not.toBeNull();
    expect(createdUser.email).toBe(testUser.email);
    console.log("✅ User Created:", createdUser);
  });

  // **2️⃣ Read User**
  test("Read User", async () => {
    await UserService.createUser(testUser.name, testUser.email);
    const fetchedUser = await UserService.findUser(testUser.email);
    expect(fetchedUser).not.toBeNull();
    expect(fetchedUser?.email).toBe(testUser.email);
    console.log("✅ User Retrieved:", fetchedUser);
  });

  // **3️⃣ Update User Email**
  test("Update User Email", async () => {
    await UserService.createUser(testUser.name, testUser.email);
    const updatedUser = await UserService.updateUserEmail(testUser.email, updatedEmail);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.email).toBe(updatedEmail);
    console.log("✅ User Email Updated:", updatedUser);
  });

  // **4️⃣ Delete User**
  test("Delete User", async () => {
    await UserService.createUser(testUser.name, testUser.email);
    const deleted = await UserService.removeUser(testUser.email);
    expect(deleted).toBe(true);
    console.log("✅ User Deleted:", testUser.email);
  });

});