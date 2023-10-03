import type ApiType from '$lib/services/api/api';
import Api from '$lib/services/api/api';

export class BaseAPI {
	protected api: ApiType;

	constructor() {
		const api = new Api();
		api.setup();
		this.api = api;
	}
}
