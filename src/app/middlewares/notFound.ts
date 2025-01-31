import { Request, Response, NextFunction } from "express";
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Api Not Found",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found",
    },
  });
};

export default notFound;
