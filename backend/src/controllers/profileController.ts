import { asyncHandler } from '../utils/asyncHandler';
import { getProfile } from '../services/profileService';

export const getProfileHandler = asyncHandler(async (_req, res) => {
  const profile = await getProfile();
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  res.json(profile);
});
