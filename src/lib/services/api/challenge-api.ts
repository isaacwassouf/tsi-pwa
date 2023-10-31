import type { ApiResponse } from 'apisauce';
import { ApiProblemKind, getGeneralApiProblem } from '$lib/services/api/api-problem';
import { BaseAPI } from '$lib/services/api/base-api';
import type { EmptyResult } from '$lib/services/api/api.types';
import type { ChallengeSortings, StandardChallengeData } from '$lib/types/challenges';
import type { ChallengeIndexResult, ChallengeIndexWraper } from './types/challenges';

export class ChallengeAPI extends BaseAPI {
	constructor() {
		super();
	}

	async index(sorting: ChallengeSortings): Promise<ChallengeIndexResult> {
		try {
			const response: ApiResponse<any> = await this.api.apisauce.get(`challenges?sort_by=${sorting.sortBy}&sort_direction=${sorting.sortDirection}`);

			if (!response.ok) {
				const problem = getGeneralApiProblem(response);
				if (problem) return problem;
			}

			const data = response.data as ChallengeIndexWraper;

			return { kind: ApiProblemKind.ok, data };
		} catch (e) {
			return { kind: ApiProblemKind.badData, error: null };
		}
	}


	async store(challenge: StandardChallengeData): Promise<EmptyResult> {
		try {
			const response: ApiResponse<any> = await this.api.apisauce.post(`challenges`, {
				...challenge
			});

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