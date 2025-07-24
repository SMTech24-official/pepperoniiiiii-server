import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { forumFilterableFields } from "./Forum.costant";
import { ForumService } from "./Forum.service";

const addForum = catchAsync(async (req, res) => {
  const result = await ForumService.addForum(req.body, req.file, req.user.id);
  sendResponse(res, {
    message: "Forum created successfully!",
    data: result,
  });
});

const allForum = catchAsync(async (req, res) => {
  const filters = pick(req.query, forumFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ForumService.allForum(filters, options, req.user.id);
  sendResponse(res, {
    message: "Forum retrieve successfully!",
    data: result,
  });
});

const updateForum = catchAsync(async (req, res) => {
  const result = await ForumService.updateForum(
    req.body,
    req.params.id,
    req.file
  );
  sendResponse(res, {
    message: "Forum updated successfully!",
    data: result,
  });
});

const deleteForum = catchAsync(async (req, res) => {
  const result = await ForumService.deleteForum(req.params.id);
  sendResponse(res, {
    message: "Deleted successfully!",
    data: result,
  });
});

const likeToForum = catchAsync(async (req, res) => {
  const result = await ForumService.likeToForum(req.params.id, req.user.id);
  sendResponse(res, {
    message: "Forum action successfully!",
    data: result,
  });
});

const myForum = catchAsync(async (req, res) => {
  const filters = pick(req.query, forumFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ForumService.myForum(filters, options, req.user.id);
  sendResponse(res, {
    message: "Forum retrieve successfully!",
    data: result,
  });
});

export const ForumController = {
  addForum,
  allForum,
  updateForum,
  deleteForum,
  likeToForum,
  myForum,
};
