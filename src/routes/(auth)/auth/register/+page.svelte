<script lang="ts">
	import type { RegisterationFormData } from '$lib/types/authentication';
	import { AuthAPI } from '$lib/services/api/auth-api';
	import { ApiProblemKind } from '$lib/services/api/api-problem';
	import { extractAPIErrorMessages } from '$lib/utils/extractErrorMessages';

	// variables
	let formData: RegisterationFormData = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirmation: ''
	};
	let authAPI = new AuthAPI();
	let submittingForm: boolean = false;
	let submitErrors: Map<string, string[]> = new Map<string, string[]>();

	// methods
	const submitForm = async () => {
		submitErrors = new Map<string, string[]>();
		submittingForm = true;

		try {
			const result = await authAPI.register(formData);
			if (result.kind === ApiProblemKind.ok) {
				window.location.href = '/auth/login';
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
	<h5 class="text-xl font-medium text-gray-900 dark:text-white">Register to our platform</h5>
	<div>
		<div class="flex justify-between">
			<div>
				<label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>First name</label
				>
				<input
					type="text"
					id="firstName"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="John"
					required
					bind:value={formData.firstName}
				/>
			</div>

			<div>
				<label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>Last name</label
				>
				<input
					type="text"
					id="lastName"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					placeholder="Doe"
					required
					bind:value={formData.lastName}
				/>
			</div>
		</div>

		{#if submitErrors?.get('first_name')?.length || submitErrors?.get('last_name')?.length}
			{#if submitErrors?.get('first_name')?.length}
				<p class="text-red-500 text-xs mt-2">
					{submitErrors.get('first_name')?.[0]}
				</p>
			{/if}

			{#if submitErrors?.get('last_name')?.length}
				<p class="text-red-500 text-xs mt-2">
					{submitErrors.get('last_name')?.[0]}
				</p>
			{/if}
		{/if}
	</div>

	<div>
		<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Your email</label
		>
		<input
			type="email"
			id="email"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
			required
			bind:value={formData.password}
		/>

		{#if submitErrors?.get('password')?.length}
			<p class="text-red-500 text-xs mt-2">
				{submitErrors.get('password')?.[0]}
			</p>
		{/if}
	</div>

	<div>
		<label
			for="passwordConfirmation"
			class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>Your password confirmation</label
		>
		<input
			type="password"
			id="passwordConfirmation"
			placeholder="••••••••"
			class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
			required
			bind:value={formData.passwordConfirmation}
		/>
	</div>

	<button
		type="submit"
		class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		class:disabled={submittingForm}
		class:cursor-not-allowed={submittingForm}
	>
		Create account
	</button>
	<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
		Have an account? <a href="/auth/login" class="text-blue-700 hover:underline dark:text-blue-500"
			>Login here</a
		>
	</div>
</form>
