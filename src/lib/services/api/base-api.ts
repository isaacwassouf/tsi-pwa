import type ApiType from '$lib/services/api/api';
import Api from '$lib/services/api/api';

export class BaseAPI {
	protected api: ApiType;

	constructor() {
		const api = new Api();
		api.setup();
		this.api = api;

		this.api.apisauce.axiosInstance.interceptors.request.use(
			(config) => {
				// add the token to the header
				const token = localStorage.getItem('access_token');
				if (token) {
					config.headers['Authorization'] = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				// Do something with request error
				return Promise.reject(error);
			}
		);
	}
}
