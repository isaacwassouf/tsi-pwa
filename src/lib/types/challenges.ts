export enum ChallengeType {
	STANDARD = 'standard',
	CUSTOM = 'countdown'
}

export interface StandardChallengeData {
	quote_id: string;
	wpm: number;
	accuracy: number;
	time_taken: number;
	challenge_type: string;
}
