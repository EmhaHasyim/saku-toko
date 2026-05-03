import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { fail } from "../shared/response";

export function handleError(err: Error, c: Context) {
	if (err instanceof HTTPException) {
		return c.json(fail("HTTP_EXCEPTION", err.message), err.status);
	}

	console.error(err);

	return c.json(fail("INTERNAL_SERVER_ERROR", "Internal server error"), 500);
}

export function handleNotFound(c: Context) {
	return c.json(fail("NOT_FOUND", "Route not found"), 404);
}
