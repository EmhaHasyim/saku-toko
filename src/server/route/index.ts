import { Hono } from "hono";
import authRoute from "./auth";

const route = new Hono().route("/auth", authRoute).get("/health", (c) =>
	c.json({
		ok: true,
		runtime: "cloudflare-workers",
	}),
);

export default route;
