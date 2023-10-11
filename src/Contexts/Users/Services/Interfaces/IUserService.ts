import { BaseResponse } from "../../../../Shared/Contexts/BaseResponse";
import { IUserToUpdate, UserEntity } from "../../Entities/UserEntity";

export class UserResponse extends BaseResponse {
  constructor(message: string, statusCode: number, public user: UserEntity) {
    super(true, message, statusCode);
  }
}

export interface IUserService {
  GetAllUsers(): Promise<UserEntity[]>;
  GetUserById(id_user: number): Promise<UserEntity>;
  CreateUser(user: UserEntity): Promise<UserResponse>;
  DeleteUser(id_user: number): Promise<UserResponse>;
  UpdateUser(id_user: number, userUpdate: IUserToUpdate): Promise<UserResponse>;
}
