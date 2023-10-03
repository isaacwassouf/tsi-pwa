export type ValidationError = {
	statusCode: number | undefined;
	message: string | undefined;
	errors: any | undefined;
	data?: any;
};
