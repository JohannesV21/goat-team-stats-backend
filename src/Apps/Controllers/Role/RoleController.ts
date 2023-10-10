import { Request, Response } from "express";
import roleService from "../../../Contexts/Role/Services/RoleService";
import { handleErrorResponse } from "../../../Helpers/handleErrorResponse";
import {
  IRoleToUpdate,
  RoleEntity,
} from "../../../Contexts/Role/Entities/RoleEntity";

class RoleController {
  public async GetAllRoles(_req: Request, res: Response) {
    try {
      const allRoles = await roleService.GetAllRoles();
      res.status(200).json(allRoles);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async GetRolById(req: Request, res: Response): Promise<void> {
    try {
      const id_role: number = Number(req.params.id_role);

      const rolById = await roleService.GetRoleById(id_role);
      res.status(200).json(rolById);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async CreateRole(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;

      const dataToCreateRol = new RoleEntity(name);

      const createRol = await roleService.CreateRole(dataToCreateRol);
      res.status(200).json(createRol);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async UpdateRole(req: Request, res: Response): Promise<void> {
    try {
      const id_role: number = Number(req.params.id_role);
      const { name } = req.body;

      const roleToUpdate: IRoleToUpdate = {
        name,
      };

      const updateRole = await roleService.UpdateRole(id_role, roleToUpdate);
      res.status(200).json(updateRole);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async DeleteRole(req: Request, res: Response): Promise<void> {
    try {
      const id_role: number = Number(req.params.id_role);

      const deleteRole = await roleService.DeleteRole(id_role);
      res.status(200).json(deleteRole);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }
}

const roleController = new RoleController();
export default roleController;
