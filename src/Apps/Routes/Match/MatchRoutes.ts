import { Router } from "express";
import { IRoutes } from "../../../Shared/Routes/IRoutes";
import matchController from "../../Controllers/Match/MatchController";

class MatchRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.router.get("/", matchController.GetAllMatches);
    this.router.get("/:id_match", matchController.GetMatchById);
    this.router.post("/", matchController.CreateMatch);
    this.router.put("/:id_match", matchController.UpdateMatch);
    this.router.delete("/:id_match", matchController.DeleteMatch);
  }
}

const matchRoutes = new MatchRoutes();
export default matchRoutes.router;
