import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

router.get("/", AdminController.getAllFromDb);
router.get("/:id", AdminController.getByIdFromDb);
router.patch("/:id", AdminController.updateIntoDb);
export const AdminRoutes = router;
