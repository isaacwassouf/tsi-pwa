<script lang="ts">
	import EditPassword from '$lib/components/account/EditPassword.svelte';
	import ViewEditGeneralInfo from '$lib/components/account/ViewEditGeneralInfo.svelte';
	import { variables } from '$lib/config';
	import { user as userStore } from '$lib/stores/user';
	import { Avatar } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	// variables
	let avatarURL: string;

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

	onMount(() => {
		loadAvatar();
	});
</script>

<div class="p-2">
	<nav class="flex mb-4" aria-label="Breadcrumb">
		<ol class="inline-flex items-center space-x-1 md:space-x-3">
			<li class="inline-flex items-center">
				<a
					href="/dashboard"
					class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
				>
					<svg
						class="w-3 h-3 mr-2.5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
						/>
					</svg>
					Dashboard
				</a>
			</li>
			<li aria-current="page">
				<div class="flex items-center">
					<svg
						class="w-3 h-3 text-gray-400 mx-1"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 6 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 9 4-4-4-4"
						/>
					</svg>
					<span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
						>Account</span
					>
				</div>
			</li>
		</ol>
	</nav>

	<h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Account</h1>
	<hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

	<div class="flex items-center mb-6">
		<Avatar class="acs" src={avatarURL} size={'lg'} />
		<div class="flex flex-col gap-1">
			<p class="pl-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
				{$userStore?.name}
			</p>
			<p class="pl-4 text-xs tracking-tight text-gray-900 dark:text-white italic">
				Joined at {new Date().toDateString()}
			</p>
		</div>
	</div>

	<div class="flex gap-4">
		<ViewEditGeneralInfo />
		<EditPassword />
	</div>
</div>
