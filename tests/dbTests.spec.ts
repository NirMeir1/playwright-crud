import { test, expect } from "@playwright/test";
import { MemberService } from "../services/memberService";
import { TestDataFactory } from "../utils/testDataFactory";

test.describe("PostgreSQL CRUD Operations on CD Schema", () => {
  
  let testMember: { surname: string; firstname: string; telephone: string };

  test.beforeEach(() => {
    testMember = TestDataFactory.generateMember();
  });

  test("Create and Read Member", async () => {
    // Create Member
    const createdMember = await MemberService.createMember(
      testMember.surname,
      testMember.firstname,
      testMember.telephone
    );

    // Validate that the member was created and can be read
    const fetchedMember = await MemberService.findMemberBytelephone(testMember.telephone);
    expect(fetchedMember).not.toBeNull();
    expect(fetchedMember.telephone).toBe(testMember.telephone);
  });

  test("Update Member telephone", async () => {
    await MemberService.createMember(
      testMember.surname,
      testMember.firstname,
      testMember.telephone
    );

    const newTelephone = `1${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    await MemberService.updateMembertelephone(
      testMember.telephone,
      newTelephone
    );

    // Validate the update using MemberService
    const updatedMember = await MemberService.findMemberBytelephone(newTelephone);
    expect(updatedMember).not.toBeNull();
    expect(updatedMember.telephone).toBe(newTelephone);

    // Ensure the old telephone is no longer found
    const oldMember = await MemberService.findMemberBytelephone(testMember.telephone);
    expect(oldMember).toBeNull();
  });

  test("Delete Member", async () => {
    await MemberService.createMember(
      testMember.surname,
      testMember.firstname,
      testMember.telephone
    );

    const deleted = await MemberService.removeMember(testMember.telephone);
    expect(deleted).toBe(true);

    // After deletion, ensure that the member cannot be found
    const fetchedAfterDelete = await MemberService.findMemberBytelephone(testMember.telephone);
    expect(fetchedAfterDelete).toBeNull();
  });
});