import { Hono } from "hono";

const indexRoute = new Hono().get("/health", (c) =>
	c.json({
		ok: true,
		runtime: "cloudflare-workers",
	}),
);

export default indexRoute;
