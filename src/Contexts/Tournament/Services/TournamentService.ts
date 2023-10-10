import { Repository } from "typeorm";
import {
  ITournamentService,
  TournamentResponse,
} from "./Interfaces/ITournament";
import {
  ITournamentToUpdate,
  TournamentEntity,
} from "../Entities/TournamentEntity";
import { AppDataSource } from "../../../Configs/DBConfig";
import { ErrorResponse } from "../../../Shared/Contexts/ErrorResponse";

export class TournamentService implements ITournamentService {
  private TournamentRepository: Repository<TournamentEntity>;

  constructor() {
    this.TournamentRepository = AppDataSource.getRepository(TournamentEntity);
  }

  public async GetAllTournaments(): Promise<TournamentEntity[]> {
    try {
      const allTournaments = await this.TournamentRepository.find();
      return allTournaments;
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to get tournaments",
        statusCode: 500,
        error,
      });
    }
  }

  public async GetTournamentById(
    id_tournament: number
  ): Promise<TournamentEntity> {
    try {
      const tournamentById = await this.TournamentRepository.findOne({
        where: { id_tournament },
      });

      if (!tournamentById) {
        throw new ErrorResponse({
          message: "Error to find tournament",
          statusCode: 404,
          error: "id not found",
        });
      } else {
        return tournamentById;
      }
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting tournament in the database",
          statusCode: 500,
          error,
        });
    }
  }

  public async CreateTournament(
    tournament: TournamentEntity
  ): Promise<TournamentResponse> {
    try {
      const createTournament = await this.TournamentRepository.save(tournament);
      return new TournamentResponse(
        "Successfully created tournament",
        200,
        createTournament
      );
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to create tournament",
        statusCode: 500,
        error,
      });
    }
  }

  public async UpdateTournament(
    id_tournament: number,
    tournamentUpdate: ITournamentToUpdate
  ): Promise<TournamentResponse> {
    try {
      const dbTournament = await this.TournamentRepository.findOne({
        where: { id_tournament },
      });

      if (!dbTournament)
        throw new ErrorResponse({
          message: "Error to find tournament",
          statusCode: 404,
          error: "id not found",
        });

      dbTournament.name = tournamentUpdate.name;
      dbTournament.init_date = tournamentUpdate.init_date;
      dbTournament.end_date = tournamentUpdate.end_date;

      const updateTournament = await this.TournamentRepository.save(
        dbTournament
      );

      return new TournamentResponse(
        "Successfully update tournament",
        200,
        updateTournament
      );
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting tournament in the database",
          statusCode: 500,
          error,
        });
    }
  }

  public async DeleteTournament(
    id_tournament: number
  ): Promise<TournamentResponse> {
    try {
      const dbTournament = await this.TournamentRepository.findOne({
        where: { id_tournament },
      });

      if (!dbTournament)
        throw new ErrorResponse({
          message: "Error to find tournament",
          statusCode: 404,
          error: "id not found",
        });

      const removeTournament = await this.TournamentRepository.remove(
        dbTournament
      );

      return new TournamentResponse(
        "Successfully delete tournament",
        200,
        removeTournament
      );
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting tournament in the database",
          statusCode: 500,
          error,
        });
    }
  }
}

const tournamentService = new TournamentService();
export default tournamentService;
