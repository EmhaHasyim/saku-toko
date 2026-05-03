import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import type { AppEnv } from "@src/env";

export function createOpenApiApp() {
	return new OpenAPIHono<AppEnv>().basePath("/api/v1");
}

export function registerOpenApiDocs(app: OpenAPIHono<AppEnv>) {
	app.doc("/openapi.json", {
		openapi: "3.0.0",
		info: {
			title: "Saku Toko API",
			version: "1.0.0",
			description: "Backend API for Saku Toko POS application",
		},
	});

	app.get(
		"/docs",
		Scalar({
			url: "/api/v1/openapi.json",
			theme: "default",
			pageTitle: "Saku Toko API Docs",
		}),
	);
}
