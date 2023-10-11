import { Repository } from "typeorm";
import { ITeamService, TeamResponse } from "./Interfaces/ITeamService";
import { ITeamToUpdate, TeamEntity } from "../Entities/TeamEntity";
import { AppDataSource } from "../../../Configs/DBConfig";
import { ErrorResponse } from "../../../Shared/Contexts/ErrorResponse";

export class TeamService implements ITeamService {
  private TeamRepository: Repository<TeamEntity>;

  constructor() {
    this.TeamRepository = AppDataSource.getRepository(TeamEntity);
  }

  public async GetAllTeams(): Promise<TeamEntity[]> {
    try {
      const allTeams = await this.TeamRepository.find({
        relations: { admin: true, users: { role: true } },
      });
      return allTeams;
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to get teams",
        statusCode: 500,
        error,
      });
    }
  }

  public async GetTeamById(id_team: number): Promise<TeamEntity> {
    try {
      const dbTeam = await this.TeamRepository.findOne({ where: { id_team } });

      if (!dbTeam) {
        throw new ErrorResponse({
          message: "Error to find team",
          statusCode: 404,
          error: "id not found",
        });
      } else {
        return dbTeam;
      }
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting team in the database",
          statusCode: 500,
          error,
        });
    }
  }

  public async CreateTeam(team: TeamEntity): Promise<TeamResponse> {
    try {
      const createTeam = await this.TeamRepository.save(team);
      return new TeamResponse("Successfully create team", 200, createTeam);
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to create team",
        statusCode: 500,
        error,
      });
    }
  }

  public async UpdateTeam(
    id_team: number,
    teamUpdate: ITeamToUpdate
  ): Promise<TeamResponse> {
    try {
      const dbTeam = await this.TeamRepository.findOne({ where: { id_team } });

      if (!dbTeam)
        throw new ErrorResponse({
          message: "Error to find team",
          statusCode: 404,
          error: "id not found",
        });

      dbTeam.name = teamUpdate.name;
      dbTeam.rif = teamUpdate.rif;

      const updateTeam = await this.TeamRepository.save(dbTeam);
      return new TeamResponse("Successfully update team", 200, updateTeam);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting team in the database",
          statusCode: 500,
          error,
        });
    }
  }

  public async DeleteTeam(id_team: number): Promise<TeamResponse> {
    try {
      const dbTeam = await this.TeamRepository.findOne({ where: { id_team } });

      if (!dbTeam)
        throw new ErrorResponse({
          message: "Error to find team",
          statusCode: 404,
          error: "id not found",
        });

      const removeTeam = await this.TeamRepository.remove(dbTeam);
      return new TeamResponse("Successfully delete team", 200, removeTeam);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting team in the database",
          statusCode: 500,
          error,
        });
    }
  }
}

const teamService = new TeamService();
export default teamService;
