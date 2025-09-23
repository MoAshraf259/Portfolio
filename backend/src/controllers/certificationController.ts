import { asyncHandler } from '../utils/asyncHandler';
import { getCertifications } from '../services/certificationService';

export const listCertificationsHandler = asyncHandler(async (_req, res) => {
  const certifications = await getCertifications();
  res.json(certifications);
});
