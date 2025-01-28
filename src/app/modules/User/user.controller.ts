import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  const result = await UserServices.createAdmin();
  res.send(result);
};
export const UserController = {
  createAdmin,
};
