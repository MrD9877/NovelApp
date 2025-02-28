import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function tokenGenerator(data: any, time: "1d" | "50d") {
  try {
    const token = await jwt.sign({ ...data }, process.env.LOCAL_SECRET, { expiresIn: time });
    return token;
  } catch {
    return "_Error";
  }
}

export async function verifyToken(token: string) {
  try {
    const data = await jwt.verify(token, process.env.LOCAL_SECRET);
    return data;
  } catch (err) {
    console.log(err);
    return "_Error";
  }
}
