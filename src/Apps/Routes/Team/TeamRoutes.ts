import { Router } from "express";
import { IRoutes } from "../../../Shared/Routes/IRoutes";
import teamController from "../../Controllers/Team/TeamController";

class TeamRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.router.get("/", teamController.GetAllTeams);
    this.router.get("/:id_team", teamController.GetTeamById);
    this.router.post("/", teamController.CreateTeam);
    this.router.put("/:id_team", teamController.UpdateTeam);
    this.router.delete("/:id_team", teamController.DeleteTeam);
  }
}

const teamRoutes = new TeamRoutes();
export default teamRoutes.router;
