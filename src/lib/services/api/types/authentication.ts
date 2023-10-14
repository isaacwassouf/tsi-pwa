import type { VerifiedUser } from '$lib/types/authentication';
import type { GeneralApiProblem } from '../api-problem';

export interface VerifiedUserWrapper {
	user: VerifiedUser;
}

export type VerifiedUserResult = { kind: 'ok'; data: VerifiedUserWrapper } | GeneralApiProblem;
