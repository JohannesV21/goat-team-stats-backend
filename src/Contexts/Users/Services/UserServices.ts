import { Repository } from "typeorm";
import { IUserService, UserResponse } from "./Interfaces/IUserService";
import { IUserToUpdate, UserEntity } from "../Entities/UserEntity";
import { AppDataSource } from "../../../Configs/DBConfig";
import { ErrorResponse } from "../../../Shared/Contexts/ErrorResponse";

export class UserService implements IUserService {
  private UserRepository: Repository<UserEntity>;

  constructor() {
    this.UserRepository = AppDataSource.getRepository(UserEntity);
  }

  public async GetAllUsers(): Promise<UserEntity[]> {
    try {
      const allUsers = await this.UserRepository.find({
        order: { createdAt: "DESC" },
        relations: { role: true, team: true },
      });

      return allUsers;
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to get users",
        statusCode: 500,
        error,
      });
    }
  }

  public async GetUserById(id_user: number): Promise<UserEntity> {
    try {
      const userById = await this.UserRepository.findOne({
        where: { id_user },
      });

      if (!userById) {
        throw new ErrorResponse({
          message: "Error to find user",
          statusCode: 404,
          error: "id not found",
        });
      } else {
        return userById;
      }
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse({
          message: "Error getting user in the database",
          statusCode: 500,
          error,
        });
      }
    }
  }

  public async CreateUser(user: UserEntity): Promise<UserResponse> {
    try {
      const createUser = await this.UserRepository.save(user);
      return new UserResponse("User created successfully", 200, createUser);
    } catch (error) {
      throw new ErrorResponse({
        message: "Error to created user",
        statusCode: 500,
        error,
      });
    }
  }

  public async UpdateUser(
    id_user: number,
    userUpdate: IUserToUpdate
  ): Promise<UserResponse> {
    try {
      const dbUser = await this.UserRepository.findOne({ where: { id_user } });

      if (!dbUser)
        throw new ErrorResponse({
          message: "Error to find user",
          statusCode: 404,
          error: "id not found",
        });

      dbUser.first_name = userUpdate.first_name;
      dbUser.last_name = userUpdate.last_name;
      dbUser.birthdate = userUpdate.birthdate;
      dbUser.cedula = userUpdate.cedula;
      dbUser.phone = userUpdate.phone;
      dbUser.role = userUpdate.role;
      dbUser.team = userUpdate.team;

      const updateUser = await this.UserRepository.save(dbUser);
      return new UserResponse("Sucessfully update user", 200, updateUser);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse({
          message: "Error to created user",
          statusCode: 500,
          error,
        });
      }
    }
  }

  public async DeleteUser(id_user: number): Promise<UserResponse> {
    try {
      const dbUser = await this.UserRepository.findOne({ where: { id_user } });

      if (!dbUser) {
        throw new ErrorResponse({
          message: "Error to find user",
          statusCode: 404,
          error: "id not found",
        });
      }

      const removeUser = await this.UserRepository.remove(dbUser);
      return new UserResponse("Successfully delete user", 200, removeUser);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse({
          message: "Error to getting user in the database",
          statusCode: 500,
          error,
        });
      }
    }
  }
}

const userService = new UserService();
export default userService;
