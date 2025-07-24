import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { SalesBoardFilterableFields } from "./SalesBoard.costant";
import { SalesBoardService } from "./SalesBoard.service";

const addSalesBoard = catchAsync(async (req, res) => {
  const result = await SalesBoardService.addSalesBoard(
    req.body,
    req.file,
    req.user.id
  );
  sendResponse(res, {
    message: "Sales Board created successfully!",
    data: result,
  });
});

const allSalesBoard = catchAsync(async (req, res) => {
  const filters = pick(req.query, SalesBoardFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await SalesBoardService.allSalesBoard(filters, options);
  sendResponse(res, {
    message: "Sales Board retrieve successfully!",
    data: result,
  });
});

const updateSalesBoard = catchAsync(async (req, res) => {
  const result = await SalesBoardService.updateSalesBoard(
    req.body,
    req.params.id,
    req.file
  );
  sendResponse(res, {
    message: "Sales Board updated successfully!",
    data: result,
  });
});

const deleteSalesBoard = catchAsync(async (req, res) => {
  const result = await SalesBoardService.deleteSalesBoard(req.params.id);
  sendResponse(res, {
    message: "Deleted successfully!",
    data: result,
  });
});

const mySalesBoard = catchAsync(async (req, res) => {
  const filters = pick(req.query, SalesBoardFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await SalesBoardService.mySalesBoard(
    filters,
    options,
    req.user.id
  );
  sendResponse(res, {
    message: "Sales Board retrieve successfully!",
    data: result,
  });
});

export const SalesBoardController = {
  addSalesBoard,
  allSalesBoard,
  updateSalesBoard,
  deleteSalesBoard,
  mySalesBoard
};
