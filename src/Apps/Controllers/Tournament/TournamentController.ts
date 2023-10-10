import { Request, Response } from "express";
import tournamentService from "../../../Contexts/Tournament/Services/TournamentService";
import { handleErrorResponse } from "../../../Helpers/handleErrorResponse";
import {
  ITournamentToUpdate,
  TournamentEntity,
} from "../../../Contexts/Tournament/Entities/TournamentEntity";

class TournamentController {
  public async GetAllTournaments(_req: Request, res: Response): Promise<void> {
    try {
      const allTournaments = await tournamentService.GetAllTournaments();
      res.status(200).json(allTournaments);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async GetTournamentById(req: Request, res: Response): Promise<void> {
    try {
      const id_tournament: number = Number(req.params.id_tournament);

      const tournamentById = await tournamentService.GetTournamentById(
        id_tournament
      );
      res.status(200).json(tournamentById);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async CreateTournament(req: Request, res: Response): Promise<void> {
    try {
      const { name, init_date, end_date } = req.body;

      const dataToCreateTournament = new TournamentEntity(
        name,
        init_date,
        end_date
      );

      const createTournament = await tournamentService.CreateTournament(
        dataToCreateTournament
      );
      res.status(200).json(createTournament);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async UpdateUser(req: Request, res: Response): Promise<void> {
    try {
      const id_tournament: number = Number(req.params.id_tournament);
      const { name, init_date, end_date } = req.body;

      const tournamentToUpdate: ITournamentToUpdate = {
        name,
        init_date,
        end_date,
      };

      const updateTournament = await tournamentService.UpdateTournament(
        id_tournament,
        tournamentToUpdate
      );
      res.status(200).json(updateTournament);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async DeleteTournament(req: Request, res: Response): Promise<void> {
    try {
      const id_tournament: number = Number(req.params.id_tournament);

      const deleteTournament = await tournamentService.DeleteTournament(
        id_tournament
      );
      res.status(200).json(deleteTournament);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }
}

const tournamentController = new TournamentController();
export default tournamentController;
