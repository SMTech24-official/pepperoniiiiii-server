import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CartService } from "./Cart.service";


const addToCart = catchAsync(async (req, res) => {
  const result = await CartService.addToCart(req.body, req.user.id);
  sendResponse(res, {
    message: "Add To Cart successfully!",
    data: result,
  });
});

const myCarts = catchAsync(async (req, res) => {
  const result = await CartService.myCarts(req.user.id);
  sendResponse(res, {
    message: "Carts retrieve successfully!",
    data: result,
  });
});

const updateCart = catchAsync(async (req, res) => {
  const { id } = req?.user;
  const result = await CartService.updateCart(
    req.body,
    req.params.id,
    req.user.id
  );
  sendResponse(res, {
    message: "Cart updated successfully!",
    data: result,
  });
});

const deleteCart = catchAsync(async (req, res) => {
  const result = await CartService.deleteCart(req.params.id, req.user.id);
  sendResponse(res, {
    message: "Deleted successfully!",
    data: result,
  });
});

export const CartController = {
  addToCart,
  myCarts,
  updateCart,
  deleteCart,
};
