import bcrypt from "bcrypt";
import { ErrorResponse } from "../../Shared/Contexts/ErrorResponse";

/**
 * Function to encrypt passwords in function of a Seed
 * @param password the password to be encrypted
 * @returns return the password encrypted
 */
export const passwordEncrypt = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(
      password + (process.env.SEED || ""),
      saltRounds
    );
    return hash;
  } catch (err) {
    console.error(err);
    throw new ErrorResponse({
      message: "Error encrypting password",
      statusCode: 500,
      error: err,
    });
  }
};
