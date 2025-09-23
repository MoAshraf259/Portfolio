import { asyncHandler } from '../utils/asyncHandler';
import { getProjects } from '../services/projectService';

export const listProjectsHandler = asyncHandler(async (_req, res) => {
  const projects = await getProjects();
  res.json(projects);
});
