import { drizzle } from "drizzle-orm/d1";
import type { AppBindings } from "@src/env";
import * as schema from "./schema";

export type DbBindings = Pick<AppBindings, "saku_toko_db">;

export function createDb(env: DbBindings) {
	return drizzle(env.saku_toko_db, { schema });
}
