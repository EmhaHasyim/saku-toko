import { z } from "@hono/zod-openapi";

export const healthResponseSchema = z.object({
	success: z.literal(true),
	data: z.object({
		ok: z.boolean(),
		runtime: z.string(),
	}),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
