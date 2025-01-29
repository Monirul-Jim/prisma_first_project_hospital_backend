import { Request, Response } from "express";
import { AdminServices } from "./admin.services";

const getAllFromDb = async (req: Request, res: Response) => {
  const result = await AdminServices.getAllFromDb();
  res.status(200).json({
    success: true,
    message: "Admin data fetched",
    data: result,
  });
};
export const AdminController = {
  getAllFromDb,
};
