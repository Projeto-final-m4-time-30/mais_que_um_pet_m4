import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

function tokenDecoder(authorization: string): any {
  const token = authorization.split(" ")[1];

  token.split(" ")[1];
  const payload = jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError("message: 'Invalid token");
      }
      return decoded;
    }
  );

  return payload;
}

export default tokenDecoder;
