import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb, type Bindings } from "../../db";

export type AuthEnv = Bindings & {
	BETTER_AUTH_SECRET: string;
	BETTER_AUTH_URL: string;
	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;
};

export function createAuth(env: AuthEnv) {
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
