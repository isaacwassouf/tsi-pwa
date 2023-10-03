import type { GeneralApiProblem } from '$lib/services/api/api-problem';

export type EmptyResult = { kind: 'ok' } | GeneralApiProblem;

export interface Errors {
	name: string[];
}

export type BlobResult = { kind: 'ok'; data: BlobPart } | GeneralApiProblem;
