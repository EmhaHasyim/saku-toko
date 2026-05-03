import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { AppBindings } from "@src/env";
import { createDb } from "@server/db";

export function createAuth(env: AppBindings) {
	const db = createDb(env);

	return betterAuth({
		appName: "Saku Toko",
		basePath: "/api/v1/auth",
		baseURL: env.BETTER_AUTH_URL,
		secret: env.BETTER_AUTH_SECRET,

		database: drizzleAdapter(db, {
			provider: "sqlite",
		}),

		emailAndPassword: {
			enabled: true,
			minPasswordLength: 8,
			maxPasswordLength: 128,
		},

		socialProviders: {
			google: {
				clientId: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
			},
		},
	});
}
