import { Request, Response } from "express";
import teamService from "../../../Contexts/Team/Services/TeamService";
import { handleErrorResponse } from "../../../Helpers/handleErrorResponse";
import {
  ITeamToUpdate,
  TeamEntity,
} from "../../../Contexts/Team/Entities/TeamEntity";

class TeamController {
  public async GetAllTeams(_req: Request, res: Response) {
    try {
      const allTeams = await teamService.GetAllTeams();
      res.status(200).json(allTeams);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async GetTeamById(req: Request, res: Response) {
    try {
      const id_team: number = Number(req.params.id_team);

      const teamById = await teamService.GetTeamById(id_team);
      res.status(200).json(teamById);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async CreateTeam(req: Request, res: Response) {
    try {
      const { name, rif, admin } = req.body;

      const dataToCreateTeam = new TeamEntity(name, rif, admin);

      const createTeam = await teamService.CreateTeam(dataToCreateTeam);
      res.status(200).json(createTeam);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async UpdateTeam(req: Request, res: Response) {
    try {
      const id_team: number = Number(req.params.id_team);
      const { name, rif } = req.body;

      const userToUpdate: ITeamToUpdate = {
        name,
        rif,
      };

      const updateTeam = await teamService.UpdateTeam(id_team, userToUpdate);
      res.status(200).json(updateTeam);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async DeleteTeam(req: Request, res: Response) {
    try {
      const id_team: number = Number(req.params.id_team);

      const deleteTeam = await teamService.DeleteTeam(id_team);
      res.status(200).json(deleteTeam);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }
}

const teamController = new TeamController();
export default teamController;
