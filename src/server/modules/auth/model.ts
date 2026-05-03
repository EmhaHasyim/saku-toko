import { z } from "@hono/zod-openapi";

export const authUserSchema = z.object({
	id: z.string(),
	name: z.string().nullable(),
	email: z.email(),
});

export const authSessionResponseSchema = z.object({
	success: z.literal(true),
	data: z.object({
		user: authUserSchema.nullable(),
	}),
});

export type AuthUser = z.infer<typeof authUserSchema>;
export type AuthSessionResponse = z.infer<typeof authSessionResponseSchema>;
