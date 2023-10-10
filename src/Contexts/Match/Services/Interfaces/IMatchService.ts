import { BaseResponse } from "../../../../Shared/Contexts/BaseResponse";
import { MatchEntity, IMatchToUpdate } from "../../Entities/MatchEntity";

export class MatchResponse extends BaseResponse {
  constructor(message: string, statusCode: number, public match: MatchEntity) {
    super(true, message, statusCode);
  }
}

export interface IMatchService {
  GetAllMatches(): Promise<MatchEntity[]>;
  GetMatchById(id_match: number): Promise<MatchEntity>;
  CreateMatch(match: MatchEntity): Promise<MatchResponse>;
  UpdateMatch(
    id_match: number,
    matchUpdate: IMatchToUpdate
  ): Promise<MatchResponse>;
  DeleteMatch(id_match: number): Promise<MatchResponse>;
}
