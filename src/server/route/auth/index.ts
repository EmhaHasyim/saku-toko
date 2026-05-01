import { Hono } from "hono";
import { type AuthEnv, createAuth } from "../../auth";

const authRoute = new Hono<{ Bindings: AuthEnv }>();

authRoute.on(["GET", "POST"], "/*", async (c) => {
	const auth = createAuth(c.env);
	return auth.handler(c.req.raw);
});

export default authRoute;
