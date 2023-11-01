<script lang="ts">
	import type { LoginFormData } from '$lib/types/authentication';
	import { AuthAPI } from '$lib/services/api/auth-api';
	import { ApiProblemKind } from '$lib/services/api/api-problem';
	import { extractAPIErrorMessages } from '$lib/utils/extractErrorMessages';
	import { goto } from '$app/navigation';
	import type { EmptyResult } from '$lib/services/api/api.types';
	import type { VerifiedUserResult } from '$lib/services/api/types/authentication';
	import { user } from '$lib/stores/user';

	// variables
	let formData: LoginFormData = {
		email: '',
		password: ''
	};
	let authAPI = new AuthAPI();
	let submittingForm: boolean = false;
	let submitErrors: Map<string, string[]> = new Map<string, string[]>();

	// methods
	const submitForm = async () => {
		submitErrors = new Map<string, string[]>();
		submittingForm = true;

		try {
			const result: EmptyResult = await authAPI.login(formData);
			if (result.kind === ApiProblemKind.ok) {
				// set the user in the store
				const result: VerifiedUserResult = await authAPI.verify();
				if (result.kind === ApiProblemKind.ok) {
					// set the user in the store
					user.set(result.data.user);
				} else {
					console.warn(result);
				}

				// redirect to the home page
				goto('/dashboard');
			} else {
				submitErrors = extractAPIErrorMessages(result.error);
				console.warn(result);
			}
		} catch (e) {
			console.warn(e);
		} finally {
			submittingForm = false;
		}
	};
</script>

<form class="space-y-6" on:submit|preventDefault={submitForm}>
	<h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>

	<div>
		<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Your email</label
		>
		<input
			type="email"
			id="email"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-700 focus:border-sky-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
			placeholder="name@company.com"
			required
			bind:value={formData.email}
		/>

		{#if submitErrors?.get('email')?.length}
			<p class="text-red-500 text-xs mt-2">
				{submitErrors.get('email')?.[0]}
			</p>
		{/if}
	</div>

	<div>
		<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Your password</label
		>
		<input
			type="password"
			id="password"
			placeholder="••••••••"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-700 focus:border-sky-700 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
			required
			bind:value={formData.password}
		/>

		{#if submitErrors?.get('password')?.length}
			<p class="text-red-500 text-xs mt-2">
				{submitErrors.get('password')?.[0]}
			</p>
		{/if}
	</div>

	<div class="flex items-start">
		<div class="flex items-start">
			<div class="flex items-center h-5">
				<input
					id="remember"
					type="checkbox"
					value=""
					class="w-4 h-4 border border-gray-300 rounded bg-gray-50 text-sky-700 focus:ring-3 focus:ring-sky-700 dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:text-sky-700 dark:focus:ring-sky-700 dark:focus:border-sky-700"
				/>
			</div>
			<label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>Remember me</label
			>
		</div>
	</div>
	<button
		type="submit"
		class="w-full text-white bg-sky-700 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-700 dark:hover:bg-sky-600"
		class:disabled={submittingForm}
		class:cursor-not-allowed={submittingForm}
	>
		Log in
	</button>
	<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
		Not registered? <a href="/auth/register" class="text-sky-700 hover:underline dark:text-sky-500"
			>Create account</a
		>
	</div>
</form>
