import { Request, Response } from "express";
import adminService from "../../../Contexts/Admin/Services/AdminService";
import { handleErrorResponse } from "../../../Helpers/handleErrorResponse";
import {
  AdminEntity,
  IAdminToUpdate,
} from "../../../Contexts/Admin/Entities/AdminEntity";
import teamService from "../../../Contexts/Team/Services/TeamService";

class AdminController {
  public async GetAllAdmins(_req: Request, res: Response): Promise<void> {
    try {
      const allAdmins = await adminService.GetAllAdmins();
      res.status(200).json(allAdmins);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async GetAdminById(req: Request, res: Response): Promise<void> {
    try {
      const id_admin: number = Number(req.params.id_admin);

      const adminById = await adminService.GetAdminById(id_admin);
      res.status(200).json(adminById);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async CreateAdmin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const dataToCreateAdmin = new AdminEntity(email, password);

      const createAdmin = await adminService.CreateAdmin(dataToCreateAdmin);
      res.status(200).json(createAdmin);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async UpdateAdmin(req: Request, res: Response): Promise<void> {
    try {
      const id_admin: number = Number(req.params.id_admin);
      const { email, password } = req.body;

      const adminToUpdate: IAdminToUpdate = {
        email,
        password,
      };

      const updateAdmin = await adminService.UpdateAdmin(
        id_admin,
        adminToUpdate
      );
      res.status(200).json(updateAdmin);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async DeleteAdmin(req: Request, res: Response): Promise<void> {
    try {
      const id_admin: number = Number(req.params.id_admin);

      const deleteAdmin = await adminService.DeleteAdmin(id_admin);
      res.status(200).json(deleteAdmin);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }
}

const adminController = new AdminController();
export default adminController;
