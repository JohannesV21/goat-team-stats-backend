import { Repository } from "typeorm";
import { IMatchService, MatchResponse } from "./Interfaces/IMatchService";
import { IMatchToUpdate, MatchEntity } from "../Entities/MatchEntity";
import { AppDataSource } from "../../../Configs/DBConfig";
import { ErrorResponse } from "../../../Shared/Contexts/ErrorResponse";

export class MatchService implements IMatchService {
  private MatchRepository: Repository<MatchEntity>;

  constructor() {
    this.MatchRepository = AppDataSource.getRepository(MatchEntity);
  }

  public async GetAllMatches(): Promise<MatchEntity[]> {
    try {
      const allMatches = await this.MatchRepository.find({
        relations: { team: true, tournament: true },
        order: { createdAt: "DESC" },
      });
      return allMatches;
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to get matches",
        statusCode: 500,
        error,
      });
    }
  }

  // get matches by tournament
  public async GetAllMatchesByTournament(
    id_tournament: number
  ): Promise<MatchEntity[]> {
    try {
      const allMatches = await this.MatchRepository.find({
        relations: { team: true, tournament: true },
        order: { createdAt: "DESC" },
        where: { tournament: { id_tournament } },
      });
      return allMatches;
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to get matches",
        statusCode: 500,
        error,
      });
    }
  }

  // get matches by teams
  public async GetAllMatchesByTeam(id_team: number): Promise<MatchEntity[]> {
    try {
      const allMatches = await this.MatchRepository.find({
        relations: { team: true, tournament: true },
        order: { createdAt: "DESC" },
        where: { team: { id_team } },
      });
      return allMatches;
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to get matches",
        statusCode: 500,
        error,
      });
    }
  }

  public async GetMatchById(id_match: number): Promise<MatchEntity> {
    try {
      const matchById = await this.MatchRepository.findOne({
        where: { id_match },
        relations: { team: true, tournament: true },
      });

      if (!matchById) {
        throw new ErrorResponse({
          message: "Error to find match",
          statusCode: 404,
          error: "id not found",
        });
      } else {
        return matchById;
      }
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting match in the database",
          statusCode: 500,
          error,
        });
    }
  }

  public async CreateMatch(match: MatchEntity): Promise<MatchResponse> {
    try {
      const createMatch = await this.MatchRepository.save(match);
      return new MatchResponse("Successfully created match", 200, createMatch);
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to create match",
        statusCode: 500,
        error,
      });
    }
  }

  public async UpdateMatch(
    id_match: number,
    matchUpdate: IMatchToUpdate
  ): Promise<MatchResponse> {
    try {
      const dbMatch = await this.MatchRepository.findOne({
        where: { id_match },
      });

      if (!dbMatch)
        throw new ErrorResponse({
          message: "Error to find match",
          statusCode: 404,
          error: "id not found",
        });

      dbMatch.date = matchUpdate.date;
      dbMatch.opponent_name = matchUpdate.opponent_name;
      dbMatch.team_goals = matchUpdate.team_goals;
      dbMatch.opponent_goals = matchUpdate.opponent_goals;
      dbMatch.yellow_cards = matchUpdate.yellow_cards;
      dbMatch.red_cards = matchUpdate.red_cards;
      dbMatch.shots_taken = matchUpdate.shots_taken;
      dbMatch.shots_on_goal = matchUpdate.shots_on_goal;
      dbMatch.completed_passes = matchUpdate.completed_passes;
      dbMatch.fouls_comitted = matchUpdate.fouls_comitted;
      dbMatch.team = matchUpdate.team;
      dbMatch.tournament = matchUpdate.tournament;

      const updateMatch = await this.MatchRepository.save(dbMatch);
      return new MatchResponse("Successfully update match", 200, updateMatch);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting match in the database",
          statusCode: 500,
          error,
        });
    }
  }

  public async DeleteMatch(id_match: number): Promise<MatchResponse> {
    try {
      const dbMatch = await this.MatchRepository.findOne({
        where: { id_match },
      });

      if (!dbMatch)
        throw new ErrorResponse({
          message: "Error to find match",
          statusCode: 404,
          error: "id not found",
        });

      const removeMatch = await this.MatchRepository.remove(dbMatch);
      return new MatchResponse("Successfully delete match", 200, removeMatch);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting match in the database",
          statusCode: 500,
          error,
        });
    }
  }
}

const matchService = new MatchService();
export default matchService;
