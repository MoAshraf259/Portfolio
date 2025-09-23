import { asyncHandler } from '../utils/asyncHandler';
import { getSkillCategories } from '../services/skillService';

export const listSkillsHandler = asyncHandler(async (_req, res) => {
  const skills = await getSkillCategories();
  res.json(skills);
});
