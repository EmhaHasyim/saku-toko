import { z } from "zod"
import { describe, expect, it } from "vitest"
import app from "@server/index"

const API_PREFIX = "/api/v1"

const healthResponseSchema = z.object({
	success: z.literal(true),
	data: z.object({
		ok: z.literal(true),
		runtime: z.string(),
	}),
})

const openApiResponseSchema = z.object({
	openapi: z.string(),
	info: z.object({
		title: z.string(),
		version: z.string(),
		description: z.string().optional(),
	}),
	paths: z.record(z.string(), z.unknown()),
})

const errorResponseSchema = z.object({
	success: z.literal(false),
	error: z.object({
		code: z.string(),
		message: z.string(),
		details: z.unknown().optional(),
	}),
})

describe("API foundation", () => {
	it("returns health check response", async () => {
		const res = await app.request(`${API_PREFIX}/health`)

		expect(res.status).toBe(200)

		const body = healthResponseSchema.parse(await res.json())

		expect(body).toEqual({
			success: true,
			data: {
				ok: true,
				runtime: "cloudflare-workers",
			},
		})
	})

	it("returns OpenAPI document", async () => {
		const res = await app.request(`${API_PREFIX}/openapi.json`)

		expect(res.status).toBe(200)

		const body = openApiResponseSchema.parse(await res.json())

		expect(body.openapi).toBe("3.0.0")
		expect(body.info.title).toBe("Saku Toko API")
		expect(body.paths).toHaveProperty(`${API_PREFIX}/health`)
	})

	it("serves API docs", async () => {
		const res = await app.request(`${API_PREFIX}/docs`)

		expect(res.status).toBe(200)
		expect(res.headers.get("content-type")).toContain("text/html")
	})

	it("returns JSON error for unknown API route", async () => {
		const res = await app.request(`${API_PREFIX}/not-exist`)

		expect(res.status).toBe(404)

		const body = errorResponseSchema.parse(await res.json())

		expect(body).toEqual({
			success: false,
			error: {
				code: "NOT_FOUND",
				message: "Route not found",
			},
		})
	})
})
