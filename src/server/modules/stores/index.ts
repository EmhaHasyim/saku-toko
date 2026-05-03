import { OpenAPIHono } from "@hono/zod-openapi";
import type { Context } from "hono";
import type { AppEnv } from "@src/env";
import { createAuth } from "@server/modules/auth/service";
import { fail, ok } from "@server/shared/response";
import {
	createStore,
	getUserStore,
	listUserStores,
	updateUserStore,
} from "./service";
import {
	createStoreRoute,
	getStoreRoute,
	listStoresRoute,
	updateStoreRoute,
} from "./route";

type AuthInstance = ReturnType<typeof createAuth>;
type AuthSession = AuthInstance["$Infer"]["Session"];
type AuthUser = AuthSession["user"];

const storesRoute = new OpenAPIHono<AppEnv>();

async function getAuthSession(c: Context<AppEnv>): Promise<AuthSession | null> {
	const auth = createAuth(c.env);

	const session = await auth.api.getSession({
		headers: c.req.raw.headers,
	});

	return session;
}

function getAuthUser(session: AuthSession | null): AuthUser | null {
	return session?.user ?? null;
}

storesRoute.openapi(createStoreRoute, async (c) => {
	const session = await getAuthSession(c);
	const user = getAuthUser(session);

	if (!user) {
		return c.json(fail("UNAUTHORIZED", "Authentication required"), 401);
	}

	const body = c.req.valid("json");
	const result = await createStore(c.env, user.id, body);

	if ("error" in result) {
		if (result.error === "STORE_SLUG_EXISTS") {
			return c.json(
				fail("STORE_SLUG_EXISTS", "Store slug already exists"),
				409,
			);
		}
	}

	return c.json(ok(result.data), 201);
});

storesRoute.openapi(listStoresRoute, async (c) => {
	const session = await getAuthSession(c);
	const user = getAuthUser(session);

	if (!user) {
		return c.json(fail("UNAUTHORIZED", "Authentication required"), 401);
	}

	const stores = await listUserStores(c.env, user.id);

	return c.json(ok(stores), 200);
});

storesRoute.openapi(getStoreRoute, async (c) => {
	const session = await getAuthSession(c);
	const user = getAuthUser(session);

	if (!user) {
		return c.json(fail("UNAUTHORIZED", "Authentication required"), 401);
	}

	const { storeId } = c.req.valid("param");
	const store = await getUserStore(c.env, user.id, storeId);

	if (!store) {
		return c.json(fail("STORE_NOT_FOUND", "Store not found"), 404);
	}

	return c.json(ok(store), 200);
});

storesRoute.openapi(updateStoreRoute, async (c) => {
	const session = await getAuthSession(c);
	const user = getAuthUser(session);

	if (!user) {
		return c.json(fail("UNAUTHORIZED", "Authentication required"), 401);
	}

	const { storeId } = c.req.valid("param");
	const body = c.req.valid("json");

	const result = await updateUserStore(c.env, user.id, storeId, body);

	if ("error" in result) {
		if (result.error === "STORE_NOT_FOUND") {
			return c.json(fail("STORE_NOT_FOUND", "Store not found"), 404);
		}

		if (result.error === "FORBIDDEN") {
			return c.json(fail("FORBIDDEN", "You cannot update this store"), 403);
		}

		if (result.error === "STORE_SLUG_EXISTS") {
			return c.json(
				fail("STORE_SLUG_EXISTS", "Store slug already exists"),
				409,
			);
		}
	}

	return c.json(ok(result.data), 200);
});

export default storesRoute;
