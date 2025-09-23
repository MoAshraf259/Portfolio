import { asyncHandler } from '../utils/asyncHandler';
import { contactSchema, createContactMessage } from '../services/contactService';

export const createContactHandler = asyncHandler(async (req, res) => {
  const payload = contactSchema.parse(req.body);
  const message = await createContactMessage(payload);
  res.status(201).json({
    message: 'Thank you for reaching out! I will get back to you soon.',
    data: { id: message.id, createdAt: message.createdAt },
  });
});
