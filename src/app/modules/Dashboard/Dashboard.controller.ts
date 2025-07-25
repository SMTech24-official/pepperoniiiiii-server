import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DashboardService } from "./Dashboard.service";

const overView = catchAsync(async (req, res) => {
  const result = await DashboardService.overView();
  sendResponse(res, {
    message: "Dashboard created successfully!",
    data: result,
  });
});

const revenueChart = catchAsync(async (req, res) => {
  const result = await DashboardService.revenueChart();
  sendResponse(res, {
    message: "Revenue Chart data retrieved successfully!",
    data: result,
  });
});



export const DashboardController = {
  overView,
  revenueChart
};
