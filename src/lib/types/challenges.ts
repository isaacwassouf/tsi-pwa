export enum ChallengeType {
	STANDARD = 'standard',
	COUNTDOWN = 'countdown'
}

export interface StandardChallengeData {
	quote_id: string;
	wpm: number;
	accuracy: number;
	time_taken: number;
	challenge_type: string;
}

export type ChallengeSortingBy = 'challenge_type' | 'wpm' | 'accuracy' | 'time_taken' | 'created_at';

export type SortingDirection = 'asc' | 'desc';

export interface ChallengeSortings {
	sortBy: ChallengeSortingBy;
	sortDirection: SortingDirection;
}