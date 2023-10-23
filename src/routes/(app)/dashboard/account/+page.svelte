<script lang="ts">
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

		<button
			type="button"
			class="ml-auto text-blue-700 border border-gray-200 hover:bg-gray-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-gray-700 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-gray-700"
		>
			<svg
				class="w-4 h-4 text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 18"
			>
				<path
					d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"
				/>
				<path
					d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"
				/>
			</svg>
			<span class="sr-only">Edit account icon</span>
		</button>
	</div>

	<div class="flex gap-4">
		<ViewEditGeneralInfo />
		<div
			class="w-2/3 p-2 h-fit bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="flex items-center mb-4">
				<h3 class="text-xl font-semibold dark:text-white">Password Information</h3>

				<button
					type="button"
					class="ml-auto text-blue-700 border border-gray-200 hover:bg-gray-100 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-gray-700 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-gray-700"
				>
					<svg
						class="w-4 h-4 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 18"
					>
						<path
							d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"
						/>
						<path
							d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"
						/>
					</svg>
					<span class="sr-only">Edit account icon</span>
				</button>
			</div>
			<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Current password</label
			>
			<input
				type="password"
				id="current_password"
				aria-label="current_password"
				class="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
				disabled
				readonly
			/>

			<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>New password</label
			>
			<input
				type="password"
				id="new_pasword"
				aria-label="new_pasword"
				class="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
				disabled
				readonly
			/>

			<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Confirm password</label
			>
			<input
				type="password"
				id="new_pasword_confirmation"
				aria-label="new_pasword_confirmation"
				class="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
				disabled
				readonly
			/>
		</div>
	</div>
</div>
