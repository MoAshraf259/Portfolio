import { asyncHandler } from '../utils/asyncHandler';
import { getExperiences } from '../services/experienceService';

export const listExperiencesHandler = asyncHandler(async (_req, res) => {
  const experiences = await getExperiences();
  res.json(experiences);
});
