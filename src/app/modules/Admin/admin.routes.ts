import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

router.get("/", AdminController.getAllFromDb);
router.get("/:id", AdminController.getByIdFromDb);
export const AdminRoutes = router;
