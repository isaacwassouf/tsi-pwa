// import { user as userStore } from '$lib/stores/user';
// import type { VerifiedUser } from '$lib/types/authentication';
import type { Handle } from '@sveltejs/kit';
// import {fetchUserInfo} from '$lib/utils/authentication';

export const handle: Handle = async ({ event, resolve }) => {
	// const requestCookies = event.request.headers.get('cookie') ?? '';
	// const verfiedUser: VerifiedUser | null = await fetchUserInfo(requestCookies);

	// if (verfiedUser) {
	// 	// set the loacals.user to the user object
	// 	event.locals.user = verfiedUser;
	// 	// set the user store to the user object
	// 	userStore.update((value) => {
	// 		console.log("user store changed from hook", value);
	// 		return verfiedUser;
	// 	});
	// }else{
	// 	event.locals.user = null;
	// }

	// // If the user is not logged in, redirect to the login page.
	// if (!event.url.pathname.startsWith('/auth')) {
	// 	if (!event.locals.user) {
	// 		throw redirect(303, '/auth/login');
	// 	}
	// }else{
	// 	// If the user is logged in, redirect to the home page.
	// 	if (event.locals.user) {
	// 		throw redirect(303, '/');
	// 	}
	// }

	const response = await resolve(event);
	return response;
};