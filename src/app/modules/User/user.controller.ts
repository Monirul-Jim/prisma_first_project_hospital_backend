import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createAdmin(req.body);
    res.status(200).json({
      success: true,
      message: "Admin Created Successfully",
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
export const UserController = {
  createAdmin,
};
