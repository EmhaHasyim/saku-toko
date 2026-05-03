import { and, eq, ne } from "drizzle-orm";
import { createDb } from "@server/db";
import { storeMembers, stores } from "@server/db/schema";
import type { DbBindings } from "@server/db";
import type { CreateStoreBody, UpdateStoreBody } from "./model";

export async function createStore(
	env: DbBindings,
	userId: string,
	input: CreateStoreBody,
) {
	const db = createDb(env);

	const existingStore = await db
		.select({ id: stores.id })
		.from(stores)
		.where(eq(stores.slug, input.slug))
		.limit(1);

	if (existingStore.length > 0) {
		return { error: "STORE_SLUG_EXISTS" as const };
	}

	const storeId = crypto.randomUUID();

	const newStore: typeof stores.$inferInsert = {
		id: storeId,
		name: input.name,
		slug: input.slug,
		type: input.type,
		address: input.address ?? null,
		phone: input.phone ?? null,
		currency: input.currency,
		timezone: input.timezone,
		isActive: true,
	};

	await db.insert(stores).values(newStore);

	await db.insert(storeMembers).values({
		id: crypto.randomUUID(),
		storeId,
		userId,
		role: "OWNER",
	});

	const createdStore = await getUserStore(env, userId, storeId);

	return { data: createdStore };
}

export async function listUserStores(env: DbBindings, userId: string) {
	const db = createDb(env);

	return db
		.select({
			id: stores.id,
			name: stores.name,
			slug: stores.slug,
			type: stores.type,
			address: stores.address,
			phone: stores.phone,
			currency: stores.currency,
			timezone: stores.timezone,
			isActive: stores.isActive,
			role: storeMembers.role,
			createdAt: stores.createdAt,
			updatedAt: stores.updatedAt,
		})
		.from(storeMembers)
		.innerJoin(stores, eq(storeMembers.storeId, stores.id))
		.where(and(eq(storeMembers.userId, userId), eq(stores.isActive, true)));
}

export async function getUserStore(
	env: DbBindings,
	userId: string,
	storeId: string,
) {
	const db = createDb(env);

	const rows = await db
		.select({
			id: stores.id,
			name: stores.name,
			slug: stores.slug,
			type: stores.type,
			address: stores.address,
			phone: stores.phone,
			currency: stores.currency,
			timezone: stores.timezone,
			isActive: stores.isActive,
			role: storeMembers.role,
			createdAt: stores.createdAt,
			updatedAt: stores.updatedAt,
		})
		.from(storeMembers)
		.innerJoin(stores, eq(storeMembers.storeId, stores.id))
		.where(and(eq(storeMembers.userId, userId), eq(stores.id, storeId)))
		.limit(1);

	return rows[0] ?? null;
}

export async function updateUserStore(
	env: DbBindings,
	userId: string,
	storeId: string,
	input: UpdateStoreBody,
) {
	const db = createDb(env);

	const membershipRows = await db
		.select({
			role: storeMembers.role,
		})
		.from(storeMembers)
		.where(
			and(eq(storeMembers.userId, userId), eq(storeMembers.storeId, storeId)),
		)
		.limit(1);

	const membership = membershipRows[0];

	if (!membership) {
		return { error: "STORE_NOT_FOUND" as const };
	}

	if (membership.role !== "OWNER" && membership.role !== "ADMIN") {
		return { error: "FORBIDDEN" as const };
	}

	if (input.slug) {
		const existingSlug = await db
			.select({ id: stores.id })
			.from(stores)
			.where(and(eq(stores.slug, input.slug), ne(stores.id, storeId)))
			.limit(1);

		if (existingSlug.length > 0) {
			return { error: "STORE_SLUG_EXISTS" as const };
		}
	}

	await db
		.update(stores)
		.set({
			...input,
			address: input.address ?? undefined,
			phone: input.phone ?? undefined,
		})
		.where(eq(stores.id, storeId));

	const updatedStore = await getUserStore(env, userId, storeId);

	return { data: updatedStore };
}
