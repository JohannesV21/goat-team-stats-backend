import { Router } from "express";
import { IRoutes } from "../../../Shared/Routes/IRoutes";
import userController from "../../Controllers/Users/UserController";

class UserRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.router.get("/", userController.GetAllUsers);
    this.router.get("/:id_user", userController.GetUserById);
    this.router.post("/", userController.CreateUser);
    this.router.put("/:id_user", userController.UpdateUser);
    this.router.delete("/:id_user", userController.DeleteUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
