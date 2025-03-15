import { Database } from "../utils/dbClient"; 

export class MemberRepository {

  // Create a Member
  static async createMember(surname: string, firstname: string, telephone: string) {
    const queryText = `
      INSERT INTO cd.members (memid, surname, firstname, joindate, telephone)
      VALUES (DEFAULT, $1, $2, NOW(), $3) RETURNING *`;

    const result = await Database.query(queryText, [surname, firstname, telephone]);  // Using Database.query()
    return result[0];  // Return the first row from the result (created member)
  }

  // Get Member by Telephone
  static async getMemberByTelephone(telephone: string) {
    const queryText = `SELECT * FROM cd.members WHERE telephone = $1`;

    const result = await Database.query(queryText, [telephone]);  // Using Database.query()
    return result[0] || null;  // Return member or null if not found
  }

  // Update Member's Telephone
  static async updateMemberTelephone(oldTelephone: string, newTelephone: string) {
    const queryText = `UPDATE cd.members SET telephone = $1 WHERE telephone = $2 RETURNING *`;

    const result = await Database.query(queryText, [newTelephone, oldTelephone]);  // Using Database.query()
    return result[0] || null;  // Return updated member data
  }

  // Delete Member
  static async deleteMember(telephone: string) {
    const queryText = `DELETE FROM cd.members WHERE telephone = $1 RETURNING *`;

    const result = await Database.query(queryText, [telephone]);  // Using Database.query()
    return (result.length ?? 0) > 0;  // Return true if rows were deleted
  }
}