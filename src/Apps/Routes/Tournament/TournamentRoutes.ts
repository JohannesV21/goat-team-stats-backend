import { Router } from "express";
import { IRoutes } from "../../../Shared/Routes/IRoutes";
import tournamentController from "../../Controllers/Tournament/TournamentController";

class TournamentRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.router.get("/", tournamentController.GetAllTournaments);
    this.router.get("/:id_tournament", tournamentController.GetTournamentById);
    this.router.post("/", tournamentController.CreateTournament);
    this.router.put("/:id_tournament", tournamentController.UpdateUser);
    this.router.delete(
      "/:id_tournament",
      tournamentController.DeleteTournament
    );
  }
}

const tournamentRoutes = new TournamentRoutes();
export default tournamentRoutes.router;
