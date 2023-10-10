import { Router } from "express";
import { IRoutes } from "../../../Shared/Routes/IRoutes";
import adminController from "../../Controllers/Admin/AdminController";

class AdminRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.router.get("/", adminController.GetAllAdmins);
    this.router.get("/:id_user", adminController.GetAdminById);
    this.router.post("/", adminController.CreateAdmin);
    this.router.put("/:id_user", adminController.UpdateAdmin);
    this.router.delete("/:id_user", adminController.DeleteAdmin);
  }
}

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;