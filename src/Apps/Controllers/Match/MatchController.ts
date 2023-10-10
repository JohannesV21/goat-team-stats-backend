import { Request, Response } from "express";
import matchService from "../../../Contexts/Match/Services/MatchService";
import { handleErrorResponse } from "../../../Helpers/handleErrorResponse";
import {
  IMatchToUpdate,
  MatchEntity,
} from "../../../Contexts/Match/Entities/MatchEntity";

class MatchController {
  public async GetAllMatches(_req: Request, res: Response): Promise<void> {
    try {
      const allMatches = await matchService.GetAllMatches();
      res.status(200).json(allMatches);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async GetMatchById(req: Request, res: Response): Promise<void> {
    try {
      const id_match: number = Number(req.params.id_match);

      const matchById = await matchService.GetMatchById(id_match);
      res.status(200).json(matchById);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async CreateMatch(req: Request, res: Response): Promise<void> {
    try {
      const {
        date,
        team_goals,
        opponent_goals,
        yellow_cards,
        red_cards,
        shots_taken,
        shots_on_goal,
        completed_passes,
        fouls_comitted,
      } = req.body;

      const dataToCreateMatch = new MatchEntity(
        date,
        team_goals,
        opponent_goals,
        yellow_cards,
        red_cards,
        shots_taken,
        shots_on_goal,
        completed_passes,
        fouls_comitted
      );

      const createMatch = await matchService.CreateMatch(dataToCreateMatch);
      res.status(200).json(createMatch);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async UpdateMatch(req: Request, res: Response): Promise<void> {
    try {
      const id_match: number = Number(req.params.id_match);
      const {
        date,
        team_goals,
        opponent_goals,
        yellow_cards,
        red_cards,
        shots_taken,
        shots_on_goal,
        completed_passes,
        fouls_comitted,
      } = req.body;

      const matchToUpdate: IMatchToUpdate = {
        date,
        team_goals,
        opponent_goals,
        yellow_cards,
        red_cards,
        shots_taken,
        shots_on_goal,
        completed_passes,
        fouls_comitted,
      };

      const updateMatch = await matchService.UpdateMatch(
        id_match,
        matchToUpdate
      );
      res.status(200).json(updateMatch);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async DeleteMatch(req: Request, res: Response): Promise<void> {
    try {
      const id_match: number = Number(req.params.id_match);

      const deleteMatch = await matchService.DeleteMatch(id_match);
      res.status(200).json(deleteMatch);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }
}

const matchController = new MatchController();
export default matchController;
