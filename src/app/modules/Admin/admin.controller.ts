import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.services";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default catchAsync;

const getAllFromDb = catchAsync(async (req, res) => {
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
});

const getByIdFromDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.getByIdFromDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data is fetched successfully",
    data: result,
  });
});
// res.status(500).json({
//   success: false,
//   message: err.message || "Something went wrong",
//   error: err,
// });
const updateIntoDb = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await AdminServices.updateIntoDb(id, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data updated successfully",
      data: result,
    });
  }
);
const deleteFromDb = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await AdminServices.deleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  }
);
const softDeleteFromDb = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await AdminServices.softDeleteFromDb(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data deleted successfully",
      data: result,
    });
  }
);

export const AdminController = {
  getAllFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteFromDb,
  softDeleteFromDb,
};
