import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		SERVER_URL: z.url().optional(),

		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.url(),

		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),

		CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
		CLOUDFLARE_DATABASE_ID: z.string().min(1),
		CLOUDFLARE_D1_TOKEN: z.string().min(1),
	},

	clientPrefix: "VITE_",

	client: {
		VITE_APP_TITLE: z.string().min(1).optional(),
	},

	runtimeEnv: import.meta.env,

	emptyStringAsUndefined: true,
});

export type AppBindings = {
	saku_toko_db: D1Database;

	BETTER_AUTH_SECRET: string;
	BETTER_AUTH_URL: string;

	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;
};

export type AppEnv = {
	Bindings: AppBindings;
};
