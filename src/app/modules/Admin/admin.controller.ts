import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getAllAdmin = async (req: Request, res: Response) => {
  const result = await prisma.admin.findMany();
  res.status(200).json({
    success: true,
    message: "Admin data fetched",
    data: result,
  });
};
