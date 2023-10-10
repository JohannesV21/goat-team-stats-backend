import { BaseResponse } from "../../../../Shared/Contexts/BaseResponse";
import { IRoleToUpdate, RoleEntity } from "../../Entities/RoleEntity";

export class RoleResponse extends BaseResponse {
  constructor(message: string, statusCode: number, public role: RoleEntity) {
    super(true, message, statusCode);
  }
}

export interface IRoleService {
  GetAllRoles(): Promise<RoleEntity[]>;
  GetRoleById(id_role: number): Promise<RoleEntity>;
  CreateRole(role: RoleEntity): Promise<RoleResponse>;
  UpdateRole(id_role: number, roleUpdate: IRoleToUpdate): Promise<RoleResponse>;
  DeleteRole(id_role: number): Promise<RoleResponse>;
}
