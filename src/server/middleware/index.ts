import type { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import type { AppEnv } from "@src/env";

export function registerMiddleware<TApp extends OpenAPIHono<AppEnv>>(
	app: TApp,
): TApp {
	app.use("*", logger()).use("*", secureHeaders());

	return app;
}
