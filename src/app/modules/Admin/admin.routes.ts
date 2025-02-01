import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidationSchema } from "./admin.validations";
const router = express.Router();

router.get("/", AdminController.getAllFromDb);
router.get("/:id", AdminController.getByIdFromDb);
router.patch(
  "/:id",
  validateRequest(AdminValidationSchema.update),
  AdminController.updateIntoDb
);
router.delete("/:id", AdminController.deleteFromDb);
router.delete("/soft/:id", AdminController.softDeleteFromDb);
export const AdminRoutes = router;
