import type { ApiResponse } from 'apisauce';
import { ApiProblemKind, getGeneralApiProblem } from '$lib/services/api/api-problem';
import { BaseAPI } from '$lib/services/api/base-api';
import type { EmptyResult } from '$lib/services/api/api.types';
import type { LoginFormData, RegisterationFormData } from '$lib/types/authentication';
import type { VerifiedUserResult } from './types/authentication';

export class AuthAPI extends BaseAPI {
	constructor() {
		super();
	}

	async csrfCookie(): Promise<EmptyResult> {
		try {
			const response: ApiResponse<any> = await this.api.apisauce.get(`sanctum/csrf-cookie`);

			if (!response.ok) {
				const problem = getGeneralApiProblem(response);
				if (problem) return problem;
			}

			return { kind: ApiProblemKind.ok };
		} catch (e) {
			return { kind: ApiProblemKind.badData, error: null };
		}
	}

	async register(registerFormData: RegisterationFormData): Promise<EmptyResult> {
		try {
			// send a GET request to /sanctum/csrf-cookie to get a CSRF token
			await this.csrfCookie();

			// send a POST request to /auth/login to login
			const response: ApiResponse<any> = await this.api.apisauce.post(`auth/register`, {
				first_name: registerFormData.firstName,
				last_name: registerFormData.lastName,
				email: registerFormData.email,
				password: registerFormData.password,
				password_confirmation: registerFormData.passwordConfirmation
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

	async login(loginFormData: LoginFormData): Promise<EmptyResult> {
		try {
			// send a GET request to /sanctum/csrf-cookie to get a CSRF token
			await this.csrfCookie();

			// send a POST request to /auth/login to login
			const response: ApiResponse<any> = await this.api.apisauce.post(`auth/login`, {
				email: loginFormData.email,
				password: loginFormData.password
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

	async logout(): Promise<EmptyResult> {
		try {
			const response: ApiResponse<any> = await this.api.apisauce.post(`auth/logout`);

			if (!response.ok) {
				const problem = getGeneralApiProblem(response);
				if (problem) return problem;
			}

			return { kind: ApiProblemKind.ok };
		} catch (e) {
			return { kind: ApiProblemKind.badData, error: null };
		}
	}

	async verify(): Promise<VerifiedUserResult> {
		try {
			// send a POST request to /auth/login to login
			const response: ApiResponse<any> = await this.api.apisauce.get(`auth/verify`);

			if (!response.ok) {
				const problem = getGeneralApiProblem(response);
				if (problem) return problem;
			}

			const data = response.data;

			return { kind: ApiProblemKind.ok, data: data };
		} catch (e) {
			return { kind: ApiProblemKind.badData, error: null };
		}
	}
}
