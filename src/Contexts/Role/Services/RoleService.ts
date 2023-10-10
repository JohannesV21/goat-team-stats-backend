import { Repository } from "typeorm";
import { IRoleService, RoleResponse } from "./Interfaces/IRoleService";
import { IRoleToUpdate, RoleEntity } from "../Entities/RoleEntity";
import { AppDataSource } from "../../../Configs/DBConfig";
import { ErrorResponse } from "../../../Shared/Contexts/ErrorResponse";

export class RoleService implements IRoleService {
  private RoleRepository: Repository<RoleEntity>;

  constructor() {
    this.RoleRepository = AppDataSource.getRepository(RoleEntity);
  }

  public async GetAllRoles(): Promise<RoleEntity[]> {
    try {
      const allRoles = await this.RoleRepository.find();
      return allRoles;
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to get roles",
        statusCode: 500,
        error,
      });
    }
  }

  public async GetRoleById(id_role: number): Promise<RoleEntity> {
    try {
      const roleById = await this.RoleRepository.findOne({
        where: { id_role },
      });

      if (!roleById) {
        throw new ErrorResponse({
          message: "Error to find role",
          statusCode: 404,
          error: "id not found",
        });
      } else {
        return roleById;
      }
    } catch (error) {
      console.error(error);

      throw new ErrorResponse({
        message: "Error to getting role in the database",
        statusCode: 500,
        error,
      });
    }
  }

  public async CreateRole(role: RoleEntity): Promise<RoleResponse> {
    try {
      const createRole = await this.RoleRepository.save(role);
      return new RoleResponse("Role created successfully", 200, createRole);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse({
          message: "Error to create role",
          statusCode: 500,
          error,
        });
      }
    }
  }

  public async UpdateRole(
    id_role: number,
    roleUpdate: IRoleToUpdate
  ): Promise<RoleResponse> {
    try {
      const dbRole = await this.RoleRepository.findOne({ where: { id_role } });

      if (!dbRole) {
        throw new ErrorResponse({
          message: "Error to find role",
          statusCode: 404,
          error: "id not found",
        });
      }

      dbRole.name = roleUpdate.name;

      const updateRole = await this.RoleRepository.save(dbRole);
      return new RoleResponse("Successfully update role", 200, updateRole);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse({
          message: "Error to find role",
          statusCode: 500,
          error,
        });
      }
    }
  }

  public async DeleteRole(id_role: number): Promise<RoleResponse> {
    try {
      const dbRole = await this.RoleRepository.findOne({ where: { id_role } });

      if (!dbRole) {
        throw new ErrorResponse({
          message: "Error to find role",
          statusCode: 404,
          error: "id not found",
        });
      }

      const removeRole = await this.RoleRepository.remove(dbRole);
      return new RoleResponse("Successfully delete role", 200, removeRole);
    } catch (error) {
      console.error(error);

      if (error instanceof ErrorResponse) {
        throw error;
      } else {
        throw new ErrorResponse({
          message: "Error to getting role in the database",
          statusCode: 500,
          error,
        });
      }
    }
  }
}

const roleService = new RoleService();
export default roleService;
