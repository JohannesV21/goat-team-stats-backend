import { Router } from "express";
import { IRoutes } from "../../../Shared/Routes/IRoutes";
import adminController from "../../Controllers/Admin/AdminController";
import { VerifyToken } from "../../Middelwares/Auth/LoginMiddleware";

class AdminRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.router.get("/", [VerifyToken], adminController.GetAllAdmins);
    this.router.get("/:id_admin", [VerifyToken], adminController.GetAdminById);
    this.router.post("/", adminController.CreateAdmin);
    this.router.put("/:id_admin", [VerifyToken], adminController.UpdateAdmin);
    this.router.delete(
      "/:id_admin",
      [VerifyToken],
      adminController.DeleteAdmin
    );
  }
}

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;
