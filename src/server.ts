import handler, { createServerEntry } from "@tanstack/solid-start/server-entry";
import type { ExecutionContext } from "hono";
import { Hono } from "hono";
import type { AuthEnv } from "./server/auth";
import app from "./server/index";

type CloudflareRequestContext = {
	env: AuthEnv;
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

const server = new Hono<{ Bindings: AuthEnv }>();

server.route("/", app);

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
	envOrOptions: AuthEnv | ServerEntryOptions = {} as AuthEnv,
	ctx?: ExecutionContext,
) {
	const cloudflare =
		"context" in envOrOptions ? envOrOptions.context?.cloudflare : undefined;
	const env = cloudflare?.env ?? (envOrOptions as AuthEnv);

	return server.fetch(request, env, cloudflare?.ctx ?? ctx);
}

export default createServerEntry({
	fetch,
});
