import { z } from 'zod';

export const createAndUpdateUserEvents = z.object({
    name: z.string().min(1),
    dateTime: z.string(),
    location: z.string(),
    description: z.string(),
    organizer: z.string()
})

export const createAndUpdateUserParticipants = z.object({
    name: z.string().min(1),
    email: z.string(),
    eventId: z.string()
})