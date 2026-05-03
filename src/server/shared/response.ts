export type ApiSuccessResponse<TData> = {
	success: true;
	data: TData;
};

export type ApiErrorResponse<TCode extends string = string> = {
	success: false;
	error: {
		code: TCode;
		message: string;
		details?: unknown;
	};
};

export function ok<TData>(data: TData): ApiSuccessResponse<TData> {
	return {
		success: true,
		data,
	};
}

export function fail<TCode extends string>(
	code: TCode,
	message: string,
	details?: unknown,
): ApiErrorResponse<TCode> {
	return {
		success: false,
		error: {
			code,
			message,
			...(details === undefined ? {} : { details }),
		},
	};
}
