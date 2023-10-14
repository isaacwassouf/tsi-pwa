// See https://kit.svelte.dev/docs/types#app

import type { VerifiedUser } from '$lib/types/authentication';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: VerifiedUser | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
