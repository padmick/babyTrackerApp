import { z } from 'zod';

export const growthSchema = z.object({
  id: z.string(),
  childId: z.string(),
  date: z.string(),
  weight: z.number().min(0),
  height: z.number().min(0),
  headCircumference: z.number().optional(),
  notes: z.string().optional(),
  createdBy: z.string(),
});

export type GrowthEntry = z.infer<typeof growthSchema>;

export const milestoneSchema = z.object({
  id: z.string(),
  childId: z.string(),
  date: z.string(),
  category: z.enum(['motor', 'cognitive', 'social', 'language']),
  title: z.string().min(1),
  description: z.string().optional(),
  createdBy: z.string(),
});

export type Milestone = z.infer<typeof milestoneSchema>;