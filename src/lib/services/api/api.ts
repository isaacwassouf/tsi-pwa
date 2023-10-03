import type { ApisauceInstance } from 'apisauce';
import { create } from 'apisauce';
import { DEFAULT_API_CONFIG } from '$lib/services/api/api-config';
import type { ApiConfig } from '$lib/services/api/api-config';

/**
 * Manages all requests to the API.
 */
export default class Api {
	/**
	 * The underlying apisauce instance which performs the requests.
	 */
	apisauce!: ApisauceInstance;

	/**
	 * Configurable options.
	 */
	config: ApiConfig;

	/**
	 * Creates the api.
	 *
	 * @param config The configuration to use.
	 */
	constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
		this.config = config;
	}

	/**
	 * Sets up the API.  This will be called during the bootup
	 * sequence and will happen before the first React component
	 * is mounted.
	 *
	 * Be as quick as possible in here.
	 */
	setup() {
		// construct the apisauce instance
		this.apisauce = create({
			baseURL: this.config.url,
			timeout: this.config.timeout,
			withCredentials: true,
			headers: {
				Accept: 'application/json',
			}
		});
	}
}
