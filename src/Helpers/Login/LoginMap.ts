import { AdminEntity } from "../../Contexts/Admin/Entities/AdminEntity";

export interface ITokenAdmin {
  id_admin: number;
  email: string;
}

export interface ITokenDecode {
  tokenAdmin: ITokenAdmin;
  iat: number;
  exp: number;
}

/**
 * Function to map the admin that will be returns inside of the jwt
 * @param admin admin of Type AdminEntity
 */
export const AdminTokenMap = (admin: AdminEntity): ITokenAdmin => {
  const adminTokenMapped: ITokenAdmin = {
    id_admin: admin.id_admin,
    email: admin.email,
  };

  return adminTokenMapped;
};
