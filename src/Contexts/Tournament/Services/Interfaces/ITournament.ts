import { BaseResponse } from "../../../../Shared/Contexts/BaseResponse";
import {
  TournamentEntity,
  ITournamentToUpdate,
} from "../../Entities/TournamentEntity";

export class TournamentResponse extends BaseResponse {
  constructor(
    message: string,
    statusCode: number,
    public tournament: TournamentEntity
  ) {
    super(true, message, statusCode);
  }
}

export interface ITournamentService {
  GetAllTournaments(): Promise<TournamentEntity[]>;
  GetTournamentById(id_tournament: number): Promise<TournamentEntity>;
  CreateTournament(tournament: TournamentEntity): Promise<TournamentResponse>;
  UpdateTournament(
    id_tournament: number,
    tournamentUpdate: ITournamentToUpdate
  ): Promise<TournamentResponse>;
  DeleteTournament(id_tournament: number): Promise<TournamentResponse>;
}
