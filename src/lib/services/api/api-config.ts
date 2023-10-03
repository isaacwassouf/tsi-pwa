import { variables } from '$lib/config';

export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
	/**
	 * The URL of the api.
	 */
	url: string;

	/**
	 * Milliseconds before we timeout the request.
	 */
	timeout: number;

	/**
	 * The type of the response.
	 */
	responseType: ResponseType;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
	url: variables.API_URL,
	timeout: 10000,
	responseType: 'json'
};
