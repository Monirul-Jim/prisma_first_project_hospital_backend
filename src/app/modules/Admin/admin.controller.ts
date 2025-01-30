import { Request, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllFromDb = async (req: Request, res: Response) => {
  try {
    const filterDt = pick(req.query, adminFilterableFields);
    const result = await AdminServices.getAllFromDb(filterDt);
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
