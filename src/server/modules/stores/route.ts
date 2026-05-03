import { createRoute } from "@hono/zod-openapi";
import {
	createStoreBodyModel,
	errorResponseModel,
	storeParamsModel,
	storeSuccessResponseModel,
	storesSuccessResponseModel,
	updateStoreBodyModel,
} from "./model";

export const createStoreRoute = createRoute({
	method: "post",
	path: "/",
	tags: ["Stores"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: createStoreBodyModel,
				},
			},
		},
	},
	responses: {
		201: {
			description: "Store created",
			content: {
				"application/json": {
					schema: storeSuccessResponseModel,
				},
			},
		},
		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: errorResponseModel,
				},
			},
		},
		409: {
			description: "Store slug already exists",
			content: {
				"application/json": {
					schema: errorResponseModel,
				},
			},
		},
	},
});

export const listStoresRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["Stores"],
	responses: {
		200: {
			description: "User stores",
			content: {
				"application/json": {
					schema: storesSuccessResponseModel,
				},
			},
		},
		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: errorResponseModel,
				},
			},
		},
	},
});

export const getStoreRoute = createRoute({
	method: "get",
	path: "/{storeId}",
	tags: ["Stores"],
	request: {
		params: storeParamsModel,
	},
	responses: {
		200: {
			description: "Store detail",
			content: {
				"application/json": {
					schema: storeSuccessResponseModel,
				},
			},
		},
		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: errorResponseModel,
				},
			},
		},
		404: {
			description: "Store not found",
			content: {
				"application/json": {
					schema: errorResponseModel,
				},
			},
		},
	},
});

export const updateStoreRoute = createRoute({
	method: "patch",
	path: "/{storeId}",
	tags: ["Stores"],
	request: {
		params: storeParamsModel,
		body: {
			content: {
				"application/json": {
					schema: updateStoreBodyModel,
				},
			},
		},
	},
	responses: {
		200: {
			description: "Store updated",
			content: {
				"application/json": {
					schema: storeSuccessResponseModel,
				},
			},
		},
		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: errorResponseModel,
				},
			},
		},
		403: {
			description: "Forbidden",
			content: {
				"application/json": {
					schema: errorResponseModel,
				},
			},
		},
		404: {
			description: "Store not found",
			content: {
				"application/json": {
					schema: errorResponseModel,
				},
			},
		},
		409: {
			description: "Store slug already exists",
			content: {
				"application/json": {
					schema: errorResponseModel,
				},
			},
		},
	},
});
