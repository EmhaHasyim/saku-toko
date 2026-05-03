import type { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

export function registerMiddleware(app: OpenAPIHono) {
	app.use("*", logger());
	app.use("*", secureHeaders());
}
