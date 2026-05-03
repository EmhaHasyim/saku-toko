import { createRoute } from "@hono/zod-openapi";
import { healthResponseSchema } from "./model";

export const getHealthRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["Health"],
	summary: "Health check",
	description: "Check whether the API is running properly.",
	responses: {
		200: {
			description: "API is healthy",
			content: {
				"application/json": {
					schema: healthResponseSchema,
				},
			},
		},
	},
});
