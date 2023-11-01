import type { GeneralApiProblem } from '../api-problem';

export interface Quote {
	_id: string;
	content: string;
	author: string;
	tags: string[];
	authorSlug: string;
	length: number;
	dateAdded: string;
	dateModified: string;
}

export interface ChallengeIndex {
	id: number;
	challenge_type: string;
	wpm: number;
	accuracy: number;
	duration: number;
	taken_at: string;
}

export interface ChallengeIndexWraper {
	challenges: ChallengeIndex[];
}

export type ChallengeIndexResult = { kind: 'ok'; data: ChallengeIndexWraper } | GeneralApiProblem;
