import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PurchaseProductService } from "./PurchaseProduct.service";

const purchaseProduct = catchAsync(async (req, res) => {
  const result = await PurchaseProductService.purchaseProduct(req.body, req.user.id);
  sendResponse(res, {
    message: "Add To PurchaseProduct successfully!",
    data: result,
  });
});

const purchaseDetails = catchAsync(async (req, res) => {
  const result = await PurchaseProductService.purchaseDetails();
  sendResponse(res, {
    message: "Purchase Details retrieve successfully!",
    data: result,
  });
});



export const PurchaseProductController = {
  purchaseProduct,
  purchaseDetails,
};
