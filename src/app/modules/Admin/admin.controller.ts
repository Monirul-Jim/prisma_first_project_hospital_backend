import { Request, Response } from "express";
import { AdminServices } from "./admin.services";

const getAllFromDb = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.getAllFromDb(req.query);
    res.status(200).json({
      success: true,
      message: "Admin data fetched",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};
export const AdminController = {
  getAllFromDb,
};
