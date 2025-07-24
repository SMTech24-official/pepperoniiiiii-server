import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { newsFilterableFields } from "./News.costant";
import { NewsService } from "./News.service";

const addNews = catchAsync(async (req, res) => {
  const result = await NewsService.addNews(req.body, req.file);
  sendResponse(res, {
    message: "News created successfully!",
    data: result,
  });
});

const allNews = catchAsync(async (req, res) => {
  const filters = pick(req.query, newsFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await NewsService.allNews(filters, options);
  sendResponse(res, {
    message: "News retrieve successfully!",
    data: result,
  });
});

const updateNews = catchAsync(async (req, res) => {
  const result = await NewsService.updateNews(
    req.body,
    req.params.id,
    req.file
  );
  sendResponse(res, {
    message: "News updated successfully!",
    data: result,
  });
});

const deleteNews = catchAsync(async (req, res) => {
  const result = await NewsService.deleteNews(req.params.id);
  sendResponse(res, {
    message: "Deleted successfully!",
    data: result,
  });
});

export const NewsController = {
  addNews,
  allNews,
  updateNews,
  deleteNews,
};
