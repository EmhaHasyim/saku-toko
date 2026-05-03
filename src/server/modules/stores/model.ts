import { z } from "@hono/zod-openapi";

export const storeTypeModel = z.enum([
	"retail",
	"food_beverage",
	"service",
	"other",
]);

export const storeRoleModel = z.enum(["OWNER", "ADMIN", "CASHIER"]);

export const createStoreBodyModel = z.object({
	name: z.string().min(2).max(100),
	slug: z
		.string()
		.min(2)
		.max(80)
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
			message:
				"Slug hanya boleh huruf kecil, angka, dan tanda hubung. Contoh: toko-bu-sari",
		}),
	type: storeTypeModel.default("retail"),
	address: z.string().max(255).optional(),
	phone: z.string().max(30).optional(),
	currency: z.string().length(3).default("IDR"),
	timezone: z.string().min(1).default("Asia/Jakarta"),
});

export const updateStoreBodyModel = createStoreBodyModel
	.partial()
	.refine((value) => Object.keys(value).length > 0, {
		message: "Minimal satu field harus diisi",
	});

export const storeParamsModel = z.object({
	storeId: z.string().min(1),
});

export const storeResponseModel = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	type: storeTypeModel,
	address: z.string().nullable(),
	phone: z.string().nullable(),
	currency: z.string(),
	timezone: z.string(),
	isActive: z.boolean(),
	role: storeRoleModel.optional(),
	createdAt: z.date().or(z.string()),
	updatedAt: z.date().or(z.string()),
});

export const errorResponseModel = z.object({
	success: z.literal(false),
	error: z.object({
		code: z.string(),
		message: z.string(),
		details: z.unknown().optional(),
	}),
});

export const storeSuccessResponseModel = z.object({
	success: z.literal(true),
	data: storeResponseModel,
});

export const storesSuccessResponseModel = z.object({
	success: z.literal(true),
	data: z.array(storeResponseModel),
});

export type CreateStoreBody = z.infer<typeof createStoreBodyModel>;
export type UpdateStoreBody = z.infer<typeof updateStoreBodyModel>;
