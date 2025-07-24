import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductService } from "./Product.service";
import pick from "../../../shared/pick";
import { ProductFilterableFields } from "./Product.costant";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProduct(req.body, req.files);
  sendResponse(res, {
    message: "Product Created successfully!",
    data: result,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const filters = pick(req.query, ProductFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ProductService.getProductsFromDb(filters, options);
  sendResponse(res, {
    message: "Products retrieve successfully!",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getSingleProduct(req.params.id);
  sendResponse(res, {
    message: "Product profile retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req?.user;
  const result = await ProductService.updateProduct(
    req.body,
    req.params.id,
    req.files
  );
  sendResponse(res, {
    message: "Profile updated successfully!",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req?.user;
  const result = await ProductService.deleteProduct(req.body, req.params.id);
  sendResponse(res, {
    message: "Deleted successfully!",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
