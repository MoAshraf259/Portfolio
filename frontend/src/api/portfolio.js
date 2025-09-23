import { z } from 'zod';
import { apiClient } from './client';
const endpoints = {
    profile: '/profile',
    experiences: '/experiences',
    education: '/education',
    projects: '/projects',
    skills: '/skills',
    certifications: '/certifications',
    courses: '/courses',
    contact: '/contact',
};
export const contactSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Please provide a valid email'),
    subject: z
        .string()
        .max(120, 'Subject must be under 120 characters')
        .optional()
        .or(z.literal('').transform(() => undefined)),
    message: z.string().min(10, 'Message should be at least 10 characters'),
});
export async function fetchPortfolio() {
    const [profile, experiences, education, projects, skills, certifications, courses] = await Promise.all([
        apiClient.get(endpoints.profile),
        apiClient.get(endpoints.experiences),
        apiClient.get(endpoints.education),
        apiClient.get(endpoints.projects),
        apiClient.get(endpoints.skills),
        apiClient.get(endpoints.certifications),
        apiClient.get(endpoints.courses),
    ]);
    return { profile, experiences, education, projects, skills, certifications, courses };
}
export async function submitContact(values) {
    const payload = contactSchema.parse(values);
    return apiClient.post(endpoints.contact, payload);
}
