import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Login successfully",
    data: result,
  });
});
