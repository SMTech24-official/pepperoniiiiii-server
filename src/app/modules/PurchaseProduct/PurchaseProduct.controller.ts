import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { newsFilterableFields } from "../News/News.costant";
import { PurchaseProductService } from "./PurchaseProduct.service";

const purchaseProduct = catchAsync(async (req, res) => {
  const result = await PurchaseProductService.purchaseProduct(
    req.body,
    req.user.id
  );
  sendResponse(res, {
    message: "Add To PurchaseProduct successfully!",
    data: result,
  });
});

const allOrder = catchAsync(async (req, res) => {
  const filters = pick(req.query, newsFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PurchaseProductService.allOrder(filters, options);
  sendResponse(res, {
    message: "All Order retrieve successfully!",
    data: result,
  });
});

const userOrders = catchAsync(async (req, res) => {
  const filters = pick(req.query, newsFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PurchaseProductService.userOrders(
    filters,
    options,
    req.params.id
  );
  sendResponse(res, {
    message: "User Orders retrieve successfully!",
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const result = await PurchaseProductService.updateOrderStatus(
    req.body,
    req.params.id
  );
  sendResponse(res, {
    message: "Order status updated successfully!",
    data: result,
  });
});

export const PurchaseProductController = {
  purchaseProduct,
  allOrder,
  userOrders,
  updateOrderStatus
};
