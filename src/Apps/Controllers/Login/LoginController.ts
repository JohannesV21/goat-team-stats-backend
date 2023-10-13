import { Request, Response } from "express";
import { AdminTokenMap, ITokenAdmin } from "../../../Helpers/Login/LoginMap";
import { BaseResponse } from "../../../Shared/Contexts/BaseResponse";
import bcrypt from "bcrypt";
import adminService from "../../../Contexts/Admin/Services/AdminService";
import { ErrorResponse } from "../../../Shared/Contexts/ErrorResponse";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { handleErrorResponse } from "../../../Helpers/handleErrorResponse";

/**
 * Response class for successful user login actions.
 * Extends from BaseResponse.
 *
 * @param message - Descriptive response message.
 * @param statusCode - Associated HTTP status code.
 * @param token - JWT for future authentications.
 * @param refresh - Refresh token to renew JWT.
 * @param payload - Token payload with authenticated user info.
 */

export class LoginResponse extends BaseResponse {
  constructor(
    message: string,
    statusCode: number,
    public token: string,
    public refresh: string,
    public payload: ITokenAdmin
  ) {
    super(true, message, statusCode);
  }
}

class LoginController {
  public async Login(req: Request, res: Response): Promise<void> {
    try {
      let token = "";
      let refresh = "";

      const { email, password } = req.body;

      const admin = await adminService.GetAdminByEmail(email);

      if (
        !bcrypt.compareSync(password + (process.env.SEED || ""), admin.password)
      ) {
        // In case of the password doesn't match with the dbPassword
        res.status(401).json(
          new ErrorResponse({
            message: "The credentials are incorrect",
            error: "incorrect credentials",
            statusCode: 401,
          })
        );
      } else {
        // Else, make the token and refresh token
        const tokenAdmin = AdminTokenMap(admin);
        const { password: dbUserPassword, ...adminLogin } = admin;

        // Serialize token to set in the cookies
        const tokenSerialized = serialize("adminToken", token, {
          sameSite: "none",
          path: "/",
          secure: true,
        });

        token = jwt.sign({ tokenAdmin }, process.env.SEED || "", {
          expiresIn: "10d",
        });

        refresh = jwt.sign({ tokenAdmin }, process.env.SEED || "", {
          expiresIn: "20d",
        });

        res
          .status(200)
          .setHeader("Set-Cookie", tokenSerialized)
          .json(
            new LoginResponse(
              "Session started successfully",
              200,
              token,
              refresh,
              adminLogin
            )
          );
      }
    } catch (error) {
      handleErrorResponse({ error, res });
    }
  }
}

const loginController = new LoginController();
export default loginController;
