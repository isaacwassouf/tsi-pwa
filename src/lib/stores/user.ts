import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const user = writable((browser && JSON.parse(sessionStorage.getItem('user'))) || null);

// save the store value to session storage
user.subscribe((value) => browser && sessionStorage.setItem('user', JSON.stringify(value)));
