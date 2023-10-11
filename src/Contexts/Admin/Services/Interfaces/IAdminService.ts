import { BaseResponse } from "../../../../Shared/Contexts/BaseResponse";
import { AdminEntity, IAdminToUpdate } from "../../Entities/AdminEntity";

export class AdminResponse extends BaseResponse {
  constructor(message: string, statusCode: number, public admin: AdminEntity) {
    super(true, message, statusCode);
  }
}

export interface IAdminService {
  GetAllAdmins(): Promise<AdminEntity[]>;
  GetAdminById(id_admin: number): Promise<AdminEntity>;
  CreateAdmin(admin: AdminEntity): Promise<AdminResponse>;
  UpdateAdmin(
    id_admin: number,
    adminUpdate: IAdminToUpdate
  ): Promise<AdminResponse>;
  DeleteAdmin(id_admin: number): Promise<AdminResponse>;
}
