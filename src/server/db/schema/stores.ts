import { sql } from "drizzle-orm";
import {
	index,
	integer,
	sqliteTable,
	text,
	uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const STORE_TYPES = [
	"retail",
	"food_beverage",
	"service",
	"other",
] as const;
export const STORE_MEMBER_ROLES = ["OWNER", "ADMIN", "CASHIER"] as const;

export const stores = sqliteTable(
	"stores",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),

		name: text("name").notNull(),

		slug: text("slug").notNull(),

		type: text("type", { enum: STORE_TYPES }).notNull().default("retail"),

		address: text("address"),

		phone: text("phone"),

		currency: text("currency").notNull().default("IDR"),

		timezone: text("timezone").notNull().default("Asia/Jakarta"),

		isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),

		createdAt: integer("created_at", { mode: "timestamp" })
			.notNull()
			.default(sql`(unixepoch())`),

		updatedAt: integer("updated_at", { mode: "timestamp" })
			.notNull()
			.default(sql`(unixepoch())`)
			.$onUpdate(() => new Date()),
	},
	(table) => [
		uniqueIndex("stores_slug_unique").on(table.slug),
		index("stores_is_active_idx").on(table.isActive),
	],
);

export const storeMembers = sqliteTable(
	"store_members",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),

		storeId: text("store_id")
			.notNull()
			.references(() => stores.id, { onDelete: "cascade" }),

		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		role: text("role", { enum: STORE_MEMBER_ROLES }).notNull().default("OWNER"),

		createdAt: integer("created_at", { mode: "timestamp" })
			.notNull()
			.default(sql`(unixepoch())`),

		updatedAt: integer("updated_at", { mode: "timestamp" })
			.notNull()
			.default(sql`(unixepoch())`)
			.$onUpdate(() => new Date()),
	},
	(table) => [
		uniqueIndex("store_members_store_user_unique").on(
			table.storeId,
			table.userId,
		),
		index("store_members_store_id_idx").on(table.storeId),
		index("store_members_user_id_idx").on(table.userId),
		index("store_members_role_idx").on(table.role),
	],
);

export type Store = typeof stores.$inferSelect;
export type NewStore = typeof stores.$inferInsert;

export type StoreMember = typeof storeMembers.$inferSelect;
export type NewStoreMember = typeof storeMembers.$inferInsert;
