import jwt from "jsonwebtoken";

function tokenDecoder(token: string) {
  const payload = token.split(" ")[1];

  const payloadData: any = jwt.verify(
    token,
    String(process.env.JWT_SECRET),
    (err, decoded) => {
      if (!decoded) {
        throw new Error("Missing authorization token.");
      }
      return decoded;
    }
  );

  return payloadData;
}

export default tokenDecoder;
