import { MemberRepository } from "../repositories/memberRepository";
import { Logger } from "../utils/logger";

export class MemberService {
  
  static async createMember(surname: string, firstname: string, telephone: string) {
    Logger.log("Creating Member", { surname, firstname, telephone });
    return await MemberRepository.createMember(surname, firstname, telephone);
  }

  static async findMemberBytelephone(telephone: string) {
    return await MemberRepository.getMemberBytelephone(telephone);
  }

  static async updateMembertelephone(oldtelephone: string, newtelephone: string) {
    const existingMember = await MemberRepository.getMemberBytelephone(newtelephone);
    if (existingMember) {
      throw new Error("telephone number already in use");
    }
    Logger.log("Updating Member telephone", { oldtelephone, newtelephone });
    return await MemberRepository.updateMembertelephone(oldtelephone, newtelephone);
  }

  static async removeMember(telephone: string) {
    Logger.log("Deleting Member", { telephone });
    return await MemberRepository.deleteMember(telephone);
  }
}