import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export type Bindings = {
	saku_toko_db: D1Database;
};

export function createDb(env: Bindings) {
	return drizzle(env.saku_toko_db, { schema });
}
