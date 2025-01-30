import { Request, Response } from "express";
import { AdminServices } from "./admin.services";
const pick = (obj, keys) => {
  const finalObj = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};
const getAllFromDb = async (req: Request, res: Response) => {
  try {
    const filterDt = pick(req.query, [
      "name",
      "email",
      "searchTerm",
      "contactNumber",
    ]);
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
