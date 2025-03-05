import { Pool } from "pg";
import DatabaseConfig from "../config/dbConfig";
import { Logger } from "../utils/logger";

const pool: Pool = DatabaseConfig.getInstance();

export class MemberRepository {
  static async createMember(surname: string, firstname: string, telephone: string) {
    const queryText = `
        INSERT INTO cd.members (memid, surname, firstname, joindate, telephone) 
        VALUES (DEFAULT, $1, $2, NOW(), $3) RETURNING *`;
    
    try {
      const result = await pool.query(queryText, [surname, firstname, telephone]);
      return result.rows[0];
    } catch (error) {
      Logger.error("Database Query Failed", { queryText, error });
      throw error;
    }
}


  static async getMemberBytelephone(telephone: string) {
    const queryText = `SELECT * FROM cd.members WHERE telephone = $1`;
    
    try {
      const result = await pool.query(queryText, [telephone]);
      return result.rows[0] || null;
    } catch (error) {
      Logger.error("Database Query Failed", { queryText, error });
      throw error;
    }
  }

  static async updateMembertelephone(oldtelephone: string, newtelephone: string) {
    const queryText = `UPDATE cd.members SET telephone = $1 WHERE telephone = $2 RETURNING *`;
    
    try {
      const result = await pool.query(queryText, [newtelephone, oldtelephone]);
      return result.rows[0] || null;
    } catch (error) {
      Logger.error("Database Query Failed", { queryText, error });
      throw error;
    }
  }

  static async deleteMember(telephone: string) {
    const queryText = `DELETE FROM cd.members WHERE telephone = $1 RETURNING *`;

    try {
      const result = await pool.query(queryText, [telephone]);
      return (result.rowCount ?? 0) > 0; // Ensures rowCount is always a number
    } catch (error) {
      Logger.error("Database Query Failed", { queryText, error });
      throw error;
    }
  }
}