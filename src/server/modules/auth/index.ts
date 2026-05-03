import { Hono } from "hono";
import type { AppEnv } from "@src/env";
import { createAuth } from "./service";

const auth = new Hono<AppEnv>({ strict: false }).on(
	["GET", "POST"],
	"/*",
	async (c) => {
		const authService = createAuth(c.env);

		return authService.handler(c.req.raw);
	},
);

export default auth;
