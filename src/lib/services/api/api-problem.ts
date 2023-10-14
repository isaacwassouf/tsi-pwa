import type { ApiResponse } from 'apisauce';
import type { ValidationError as Error } from '$lib/types/validationErrors';

export enum ApiProblemKind {
	ok = 'ok',
	timeout = 'timeout',
	cannotConnect = 'cannot-connect',
	server = 'server',
	badRequest = 'bad-request',
	unauthorized = 'unauthorized',
	forbidden = 'forbidden',
	gone = 'gone',
	tooManyRequests = 'tooManyRequests',
	conflict = 'conflict',
	notAllowed = 'notAllowed',
	notFound = 'not-found',
	rejected = 'rejected',
	unknown = 'unknown',
	badData = 'bad-data',
	unprocessableEntity = 'unprocessable-entity'
}

export type GeneralApiProblem =
	/**
	 * Times up.
	 */
	| { kind: ApiProblemKind.timeout; error: Error; temporary: true }
	/**
	 * Cannot connect to the server for some reason.
	 */
	| { kind: ApiProblemKind.cannotConnect; error: Error; temporary: true }
	/**
	 * The server experienced a problem. Any 5xx error.
	 */
	| { kind: ApiProblemKind.server; error: Error }
	/**
	 * The server experienced a problem. Any 5xx error.
	 */
	| { kind: ApiProblemKind.badRequest; error: Error }
	/**
	 * We're not allowed because we haven't provided proper request information. This is 400.
	 */
	| { kind: ApiProblemKind.gone; error: Error }
	/**
	 * We're not allowed because we haven't identified ourself. This is 401.
	 */
	| { kind: ApiProblemKind.unauthorized; error: Error }
	/**
	 * We don't have access to perform that request. This is 403.
	 */
	| { kind: ApiProblemKind.forbidden; error: Error }
	/**
	 * We are not allowed to perform this method. This is 405.
	 */
	| { kind: ApiProblemKind.notAllowed; error: Error }
	/**
	 * Unable to find that resource.  This is a 404.
	 */
	| { kind: ApiProblemKind.notFound; error: Error }
	/**
	 * Resource requested is no longer available and will not be available again. This is a 410.
	 */
	| { kind: ApiProblemKind.gone; error: Error }
	/**
	 * Resource requested is no longer available and will be available soon. This is a 429.
	 */
	| { kind: ApiProblemKind.tooManyRequests; error: Error }
	/**
	 * Resource requested is conflicting. This is a 409.
	 */
	| { kind: ApiProblemKind.conflict; error: Error }
	/**
	 * All other 4xx series errors.
	 */
	| { kind: ApiProblemKind.rejected; error: Error }
	/**
	 * Something truly unexpected happened. Most likely can try again. This is a catch all.
	 */
	| { kind: ApiProblemKind.unknown; error: Error; temporary: true }
	/**
	 * The data we received is not in the expected format.
	 */
	| { kind: ApiProblemKind.badData; error: Error }
	/**
	 * Unprocessable Entity. This is a 422.
	 */
	| { kind: ApiProblemKind.unprocessableEntity; error: Error };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
	const errorData = {
		statusCode: response.status,
		message: response.data?.message,
		errors: response.data?.errors,
		data: response.data
	};

	switch (response.problem) {
		case 'CONNECTION_ERROR':
			return { kind: ApiProblemKind.cannotConnect, error: errorData, temporary: true };
		case 'NETWORK_ERROR':
			return { kind: ApiProblemKind.cannotConnect, error: errorData, temporary: true };
		case 'TIMEOUT_ERROR':
			return { kind: ApiProblemKind.timeout, error: errorData, temporary: true };
		case 'SERVER_ERROR':
			return { kind: ApiProblemKind.server, error: errorData };
		case 'UNKNOWN_ERROR':
			return { kind: ApiProblemKind.unknown, error: errorData, temporary: true };
		case 'CLIENT_ERROR':
			switch (response.status) {
				case 400:
					return { kind: ApiProblemKind.badRequest, error: errorData };
				case 401:
					return { kind: ApiProblemKind.unauthorized, error: errorData };
				case 403:
					return { kind: ApiProblemKind.forbidden, error: errorData };
				case 404:
					return { kind: ApiProblemKind.notFound, error: errorData };
				case 405:
					return { kind: ApiProblemKind.notAllowed, error: errorData };
				case 409:
					return { kind: ApiProblemKind.conflict, error: errorData };
				case 410:
					return { kind: ApiProblemKind.gone, error: errorData };
				case 422:
					return { kind: ApiProblemKind.unprocessableEntity, error: errorData };
				case 429:
					return { kind: ApiProblemKind.tooManyRequests, error: errorData };
				default:
					return { kind: ApiProblemKind.rejected, error: errorData };
			}
		case 'CANCEL_ERROR':
			return;
	}
}
