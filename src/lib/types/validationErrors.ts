export type ValidationError = {
	statusCode?: number;
	message?: string;
	errors?: any;
	data?: any;
} | null;
