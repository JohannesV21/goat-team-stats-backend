import { Repository, PrimaryGeneratedColumn } from "typeorm";
import { AdminResponse, IAdminService } from "./Interfaces/IAdminService";
import { AdminEntity, IAdminToUpdate } from "../Entities/AdminEntity";
import { AppDataSource } from "../../../Configs/DBConfig";
import { ErrorResponse } from "../../../Shared/Contexts/ErrorResponse";

export class AdminService implements IAdminService {
  private AdminRepository: Repository<AdminEntity>;

  constructor() {
    this.AdminRepository = AppDataSource.getRepository(AdminEntity);
  }

  public async GetAllAdmins(): Promise<AdminEntity[]> {
    try {
      const allAdmins = await this.AdminRepository.find();
      return allAdmins;
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to get admins",
        statusCode: 500,
        error,
      });
    }
  }

  public async GetAdminById(id_admin: number): Promise<AdminEntity> {
    try {
      const adminById = await this.AdminRepository.findOne({
        where: { id_admin },
      });

      if (!adminById) {
        throw new ErrorResponse({
          message: "Error to find admin",
          statusCode: 404,
          error: "id not found",
        });
      } else {
        return adminById;
      }
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting admin in the database",
          statusCode: 500,
          error,
        });
    }
  }

  public async GetAdminByEmail(email: string): Promise<AdminEntity> {
    try {
      const adminByEmail = await this.AdminRepository.findOne({
        where: { email },
      });

      console.log("email service", email);

      if (!adminByEmail) {
        throw new ErrorResponse({
          message: "Error to find admin",
          statusCode: 404,
          error: "email not found",
        });
      } else {
        return adminByEmail;
      }
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting admin in the database",
          statusCode: 500,
          error,
        });
    }
  }

  public async CreateAdmin(admin: AdminEntity): Promise<AdminResponse> {
    try {
      const createAdmin = await this.AdminRepository.save(admin);
      return new AdminResponse("Admin created successfully", 200, createAdmin);
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to create admin",
        statusCode: 500,
        error,
      });
    }
  }

  public async UpdateAdmin(
    id_admin: number,
    adminUpdate: IAdminToUpdate
  ): Promise<AdminResponse> {
    try {
      const dbAdmin = await this.AdminRepository.findOne({
        where: { id_admin },
      });

      if (!dbAdmin)
        throw new ErrorResponse({
          message: "Error to find admin",
          statusCode: 404,
          error: "id not found",
        });

      dbAdmin.email = adminUpdate.email;
      dbAdmin.password = adminUpdate.password;

      const updateAdmin = await this.AdminRepository.save(dbAdmin);
      return new AdminResponse("Successfully update admin", 200, updateAdmin);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting admin in the database",
          statusCode: 500,
          error,
        });
    }
  }

  public async DeleteAdmin(id_admin: number): Promise<AdminResponse> {
    try {
      const dbAdmin = await this.AdminRepository.findOne({
        where: { id_admin },
      });

      if (!dbAdmin)
        throw new ErrorResponse({
          message: "Error to find admin",
          statusCode: 404,
          error: "id not found",
        });

      const removeAdmin = await this.AdminRepository.remove(dbAdmin);
      return new AdminResponse("Successfully delete admin", 200, removeAdmin);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) throw error;
      else
        throw new ErrorResponse({
          message: "Error to getting admin in the database",
          statusCode: 500,
          error,
        });
    }
  }
}

const adminService = new AdminService();
export default adminService;
