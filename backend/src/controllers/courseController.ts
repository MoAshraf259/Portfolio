import { asyncHandler } from '../utils/asyncHandler';
import { getCourses } from '../services/courseService';

export const listCoursesHandler = asyncHandler(async (_req, res) => {
  const courses = await getCourses();
  res.json(courses);
});
