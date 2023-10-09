import { Router } from "express";
import { IRoutes } from "../../Shared/Routes/IRoutes";
import indexController from "../Controllers/IndexController";

class IndexRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.router.get("/", indexController.WelcomeApi);
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
