import { asyncHandler } from '../utils/asyncHandler';
import { getEducation } from '../services/educationService';

export const listEducationHandler = asyncHandler(async (_req, res) => {
  const education = await getEducation();
  res.json(education);
});
