import handler, { createServerEntry } from "@tanstack/solid-start/server-entry";
import type { ExecutionContext } from "hono";
import { Hono } from "hono";
import app from "./server/index";

type CloudflareBindings = Record<string, unknown>;

type CloudflareRequestContext = {
	env: CloudflareBindings;
	ctx?: ExecutionContext | undefined;
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

const server = new Hono<{ Bindings: CloudflareBindings }>();

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
	env: CloudflareBindings = {},
	ctx?: ExecutionContext,
) {
	return server.fetch(request, env, ctx);
}

export default createServerEntry({
	fetch,
});
