import { Router } from "express";
import { IRoutes } from "../../../Shared/Routes/IRoutes";
import loginController from "../../Controllers/Login/LoginController";

class LoginRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.router.post("/", loginController.Login);
  }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;
