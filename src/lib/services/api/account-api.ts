import type { ApiResponse } from 'apisauce';
import { ApiProblemKind, getGeneralApiProblem } from '$lib/services/api/api-problem';
import { BaseAPI } from '$lib/services/api/base-api';
import type { EmptyResult } from '$lib/services/api/api.types';
import { AuthAPI } from './auth-api';
import type { ChangePasswordFormData, GeneralAccountInformation } from '$lib/types/account';

export class AccountAPI extends BaseAPI {
	constructor() {
		super();
	}

	async updateGeneralInformation(data: GeneralAccountInformation): Promise<EmptyResult> {
		const authAPI = new AuthAPI();
		await authAPI.csrfCookie();
		try {
			const response: ApiResponse<any> = await this.api.apisauce.patch(`users/general`, {
				first_name: data.firstName,
				last_name: data.lastName,
				email: data.email
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

	async changePassword(data: ChangePasswordFormData): Promise<EmptyResult> {
		const authAPI = new AuthAPI();
		await authAPI.csrfCookie();
		try {
			const response: ApiResponse<any> = await this.api.apisauce.patch(`users/password`, {
				current_password: data.currentPassword,
				new_password: data.newPassword,
				new_password_confirmation: data.newPasswordConfirmation
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
