import { Request, Response } from "express";
import userService from "../../../Contexts/Users/Services/UserServices";
import { handleErrorResponse } from "../../../Helpers/handleErrorResponse";
import {
  IUserToUpdate,
  UserEntity,
} from "../../../Contexts/Users/Entities/UserEntity";
import roleService from "../../../Contexts/Roles/Services/RoleService";
import teamService from "../../../Contexts/Team/Services/TeamService";

class UserController {
  public async GetAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await userService.GetAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async GetUserById(req: Request, res: Response): Promise<void> {
    try {
      const id_user: number = Number(req.params.id_user);

      const userById = await userService.GetUserById(id_user);
      res.status(200).json(userById);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async CreateUser(req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, birthdate, cedula, phone, role, team } =
        req.body;

      const dataToCreateUser = new UserEntity(
        first_name,
        last_name,
        birthdate,
        cedula,
        phone,
        role,
        team
      );

      const createUser = await userService.CreateUser(dataToCreateUser);
      res.status(200).json(createUser);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async UpdateUser(req: Request, res: Response): Promise<void> {
    try {
      const id_user: number = Number(req.params.id_user);
      const { first_name, last_name, birthdate, cedula, phone, role, team } =
        req.body;

      const rolDB = await roleService.GetRoleById(role);
      const teamDB = await teamService.GetTeamById(team);

      const userToUpdate: IUserToUpdate = {
        first_name,
        last_name,
        birthdate,
        cedula,
        phone,
        role: rolDB,
        team: teamDB,
      };

      const updateUser = await userService.UpdateUser(id_user, userToUpdate);
      res.status(200).json(updateUser);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async DeleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id_user: number = Number(req.params.id_user);

      const deleteUser = await userService.DeleteUser(id_user);
      res.status(200).json(deleteUser);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }
}

const userController = new UserController();
export default userController;
