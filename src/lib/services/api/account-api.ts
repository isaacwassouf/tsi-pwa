import type { ApiResponse } from 'apisauce';
import { ApiProblemKind, getGeneralApiProblem } from '$lib/services/api/api-problem';
import { BaseAPI } from '$lib/services/api/base-api';
import type { EmptyResult } from '$lib/services/api/api.types';

export class AccountAPI extends BaseAPI {
	constructor() {
		super();
	}

	async updateGeneralInformation(userId: number): Promise<EmptyResult> {
		try {
			const response: ApiResponse<any> = await this.api.apisauce.patch(`users/${userId}/general`);

			if (!response.ok) {
				const problem = getGeneralApiProblem(response);
				if (problem) return problem;
			}

			return { kind: ApiProblemKind.ok };
		} catch (e) {
			return { kind: ApiProblemKind.badData, error: null };
		}
	}
}
