import { Request, Response } from "express";
import userService from "../../../Contexts/Users/Services/UserServices";
import { ErrorResponse } from "../../../Shared/Contexts/ErrorResponse";
import { handleErrorResponse } from "../../../Helpers/handleErrorResponse";
import {
  IUserToUpdate,
  UserEntity,
} from "../../../Contexts/Users/Entities/UserEntity";

class UserController {
  public async GetAllUsers(_req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await userService.GetAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async GetUserById(req: Request, res: Response) {
    try {
      const id_user: number = Number(req.params.id_user);

      const userById = await userService.GetUserById(id_user);
      res.status(200).json(userById);
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }

  public async CreateUser(req: Request, res: Response) {
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

  public async UpdateUser(req: Request, res: Response) {
    try {
      const id_user: number = Number(req.params.id_user);
      const { first_name, last_name, birthdate, cedula, phone, role, team } =
        req.body;

      const userToUpdate: IUserToUpdate = {
        first_name,
        last_name,
        birthdate,
        cedula,
        phone,
        role,
        team,
      };
    } catch (error) {}
  }
}

const userController = new UserController();
export default userController;
