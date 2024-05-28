import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string(),
  description: z.string(),
});

export type TodoType = z.infer<typeof TodoSchema>;
