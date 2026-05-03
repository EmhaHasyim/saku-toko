import handler, { createServerEntry } from "@tanstack/solid-start/server-entry";
import type { ExecutionContext } from "hono";
import { Hono } from "hono";
import type { AppBindings, AppEnv } from "@src/env";
import app from "@server/index";
import { handleNotFound } from "@server/middleware/error";

type CloudflareRequestContext = {
	env: AppBindings;
	ctx?: ExecutionContext | undefined;
};

type ServerEntryOptions = {
	context?: {
		cloudflare?: CloudflareRequestContext;
	};
};

declare module "@tanstack/solid-router" {
	interface Register {
		server: {
			requestContext: {
				cloudflare: CloudflareRequestContext;
			};
		};
	}
}

const server = new Hono<AppEnv>();

server.route("/", app);

server.all("/api/*", handleNotFound);

server.all("*", (c) =>
	handler.fetch(c.req.raw, {
		context: {
			cloudflare: {
				env: c.env,
				ctx: c.executionCtx,
			},
		},
	}),
);

function fetch(
	request: Request,
	envOrOptions: AppBindings | ServerEntryOptions = {} as AppBindings,
	ctx?: ExecutionContext,
) {
	const cloudflare =
		"context" in envOrOptions ? envOrOptions.context?.cloudflare : undefined;

	const env = cloudflare?.env ?? (envOrOptions as AppBindings);

	return server.fetch(request, env, cloudflare?.ctx ?? ctx);
}

export default createServerEntry({ fetch });
