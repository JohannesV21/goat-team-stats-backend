import { Router } from "express";
import { IRoutes } from "../../../Shared/Routes/IRoutes";
import roleController from "../../Controllers/Role/RoleController";

class RoleRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.router.get("/", roleController.GetAllRoles);
    this.router.get("/:id_role", roleController.GetRolById);
    this.router.post("/", roleController.CreateRole);
    this.router.put("/:id_role", roleController.UpdateRole);
    this.router.delete("/:id_role", roleController.DeleteRole);
  }
}

const roleRoutes = new RoleRoutes();
export default roleRoutes.router;
