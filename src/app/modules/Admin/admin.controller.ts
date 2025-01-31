import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";

const getAllFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.getAllFromDb(filters, options);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin Fetch successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    next(err);
  }
};

const getByIdFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.getByIdFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data is fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
    // res.status(500).json({
    //   success: false,
    //   message: err.message || "Something went wrong",
    //   error: err,
    // });
  }
};
const updateIntoDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.updateIntoDb(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
const deleteFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.deleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
const softDeleteFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.softDeleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const AdminController = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteFromDb,
  softDeleteFromDb,
};
