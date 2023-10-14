import type { ValidationError } from '$lib/types/validationErrors';

export const extractAPIErrorMessages = (errorResponse: ValidationError): Map<string, string[]> => {
	return new Map(Object.entries(errorResponse?.errors ?? {}));
};
