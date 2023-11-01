<script lang="ts">
	import { Avatar, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { user as userStore } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { variables } from '$lib/config';
	import { AuthAPI } from '$lib/services/api/auth-api';
	import type { EmptyResult } from '$lib/services/api/api.types';
	import { ApiProblemKind } from '$lib/services/api/api-problem';
	import { goto } from '$app/navigation';

	// variables
	let avatarURL: string;
	const authAPI = new AuthAPI();

	// logic
	const loadAvatar = async () => {
		// create the url for dicebear
		const url = new URL(variables.DICEBEAR_URL);
		url.searchParams.append('seed', $userStore.email);

		// send the request to the third party service to generate an avatar
		const response = await fetch(url);

		if (response.ok) {
			// parse the avatar to a blob
			const avatarBlob = await response.blob();
			// create Url to assign from the blob in order to assign it to the image src attribute
			avatarURL = URL.createObjectURL(avatarBlob);
		}
	};

	const logoutUser = async () => {
		try {
			const result: EmptyResult = await authAPI.logout();

			if (result.kind === ApiProblemKind.ok) {
				goto('/auth/login');
			} else {
				console.log(result.error);
			}
		} catch (e) {
			console.error(e);
		}
	};

	onMount(() => {
		loadAvatar();
	});
</script>

<nav
	class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
>
	<div class="px-3 py-3 lg:px-5 lg:pl-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center justify-start">
				<button
					data-drawer-target="logo-sidebar"
					data-drawer-toggle="logo-sidebar"
					aria-controls="logo-sidebar"
					type="button"
					class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				>
					<span class="sr-only">Open sidebar</span>
					<svg
						class="w-6 h-6"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clip-rule="evenodd"
							fill-rule="evenodd"
							d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
						/>
					</svg>
				</button>
				<a href="https://flowbite.com" class="flex ml-2 md:mr-24">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						class="h-8 mr-3"
						alt="FlowBite Logo"
					/>
					<span
						class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
						>Flowbite</span
					>
				</a>
			</div>
			<div class="flex items-center">
				<div class="flex items-center ml-3">
					<Avatar class="acs" src={avatarURL} dot={{ color: 'green' }} />
					<Dropdown triggeredBy=".acs">
						<div slot="header" class="px-4 py-2">
							<span class="block text-sm text-gray-900 dark:text-white">{$userStore.name}</span>
							<span class="block truncate text-sm font-medium">{$userStore.email}</span>
						</div>
						<DropdownItem href="/dashboard">Dashboard</DropdownItem>
						<DropdownItem href="/dashboard/account">Account</DropdownItem>
						<DropdownItem slot="footer" on:click={() => logoutUser()}>Sign out</DropdownItem>
					</Dropdown>
				</div>
			</div>
		</div>
	</div>
</nav>

<aside
	id="logo-sidebar"
	class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
	aria-label="Sidebar"
>
	<div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
		<ul class="space-y-2 font-medium">
			<li>
				<a
					href="/dashboard"
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
					<svg
						class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 22 21"
					>
						<path
							d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
						/>
						<path
							d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
						/>
					</svg>
					<span class="ml-3">Dashboard</span>
				</a>
			</li>
			<li>
				<a
					href="/dashboard/challenges"
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
					<svg
						class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 17 20"
					>
						<path
							d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"
						/>
					</svg>
					<span class="flex-1 ml-3 whitespace-nowrap">Challenges</span>
				</a>
			</li>
		</ul>
	</div>
</aside>

<div class="p-4 sm:ml-64 h-screen dark:bg-gray-900">
	<div
		class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
		style="height: -webkit-fill-available;"
	>
		<slot />
	</div>
</div>
