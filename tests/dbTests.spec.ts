import { test, expect } from "@playwright/test";
import { MemberService } from "../services/memberService";
import { TestDataFactory } from "../utils/testDataFactory";

test.describe("PostgreSQL CRUD Operations on CD Schema", () => {
  
  let testMember: { surname: string; firstname: string; telephone: string };

  test.beforeEach(() => {
    testMember = TestDataFactory.generateMember();
  });

  test("Create Member", async () => {
    const createdMember = await MemberService.createMember(
      testMember.surname,
      testMember.firstname,
      testMember.telephone
    );
    expect(createdMember).not.toBeNull();
    expect(createdMember.telephone).toBe(testMember.telephone);
    console.log("✅ Member Created:", createdMember);
  });

  test("Read Member", async () => {
    await MemberService.createMember(
      testMember.surname,
      testMember.firstname,
      testMember.telephone
    );
    const fetchedMember = await MemberService.findMemberBytelephone(testMember.telephone);
    expect(fetchedMember).not.toBeNull();
    expect(fetchedMember?.telephone).toBe(testMember.telephone);
    console.log("✅ Member Retrieved:", fetchedMember);
  });

  test("Update Member telephone", async () => {
    await MemberService.createMember(
      testMember.surname,
      testMember.firstname,
      testMember.telephone
    );
    const updatedMember = await MemberService.updateMembertelephone(
      testMember.telephone,
      "1234567890"
    );
    expect(updatedMember).not.toBeNull();
    expect(updatedMember?.telephone).toBe("1234567890");
    console.log("✅ Member telephone Updated:", updatedMember);
  });

  test("Delete Member", async () => {
    await MemberService.createMember(
      testMember.surname,
      testMember.firstname,
      testMember.telephone
    );
    const deleted = await MemberService.removeMember(testMember.telephone);
    expect(deleted).toBe(true);
    console.log("✅ Member Deleted:", testMember.telephone);
  });
});