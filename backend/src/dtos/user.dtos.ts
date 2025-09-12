import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(["ANALYST", "ADMIN"]).optional(),
});
export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.email().optional(),
  role: z.enum(["ANALYST", "ADMIN"]).optional(),
});
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
