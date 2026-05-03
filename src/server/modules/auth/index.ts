import { Hono } from "hono";
import { createAuth, type AuthEnv } from "./service";

const auth = new Hono<{ Bindings: AuthEnv }>({ strict: false }).on(
	["GET", "POST"],
	"/*",
	async (c) => {
		const authService = createAuth(c.env);

		return authService.handler(c.req.raw);
	},
);

export default auth;
