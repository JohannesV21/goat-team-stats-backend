import { BaseResponse } from "../../../../Shared/Contexts/BaseResponse";
import { TeamEntity, ITeamToUpdate } from "../../Entities/TeamEntity";

export class TeamResponse extends BaseResponse {
  constructor(message: string, statusCode: number, public team: TeamEntity) {
    super(true, message, statusCode);
  }
}

export interface ITeamService {
  GetAllTeams(): Promise<TeamEntity[]>;
  GetTeamById(id_team: number): Promise<TeamEntity>;
  CreateTeam(team: TeamEntity): Promise<TeamResponse>;
  UpdateTeam(id_team: number, teamUpdate: ITeamToUpdate): Promise<TeamResponse>;
  DeleteTeam(id_team: number): Promise<TeamResponse>;
}
