import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { AiDiagnosisFilterableFields } from "./AiDiagnosis.costant";
import { AiDiagnosisService } from "./AiDiagnosis.service";

const addAiDiagnosis = catchAsync(async (req, res) => {
  const result = await AiDiagnosisService.addAiDiagnosis(
    req.body,
    req.file,
    req.user.id
  );
  sendResponse(res, {
    message: "AiDiagnosis created successfully!",
    data: result,
  });
});

const allAiDiagnosis = catchAsync(async (req, res) => {
  const filters = pick(req.query, AiDiagnosisFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AiDiagnosisService.allAiDiagnosis(filters, options);
  sendResponse(res, {
    message: "AiDiagnosis retrieve successfully!",
    data: result,
  });
});

const userAiDiagnosis = catchAsync(async (req, res) => {
  const filters = pick(req.query, AiDiagnosisFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AiDiagnosisService.userAiDiagnosis(
    filters,
    options,
    req.params.id
  );
  sendResponse(res, {
    message: "AiDiagnosis retrieve successfully!",
    data: result,
  });
});

const deleteAiDiagnosis = catchAsync(async (req, res) => {
  const result = await AiDiagnosisService.deleteAiDiagnosis(req.params.id);
  sendResponse(res, {
    message: "Deleted successfully!",
    data: result,
  });
});

export const AiDiagnosisController = {
  addAiDiagnosis,
  allAiDiagnosis,
  userAiDiagnosis,
  deleteAiDiagnosis,
};
