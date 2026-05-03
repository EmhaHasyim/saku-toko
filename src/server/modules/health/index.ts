import { OpenAPIHono } from "@hono/zod-openapi";
import { ok } from "../../shared/response";
import { getHealthRoute } from "./route";

const health = new OpenAPIHono().openapi(getHealthRoute, (c) => {
	return c.json(
		ok({
			ok: true,
			runtime: "cloudflare-workers",
		}),
		200,
	);
});

export default health;
