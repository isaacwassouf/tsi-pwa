<script lang="ts">
	import { Button, Label, Input } from 'flowbite-svelte';
	import type { RegisterationFormData } from '$lib/types/registeration';
	import { AuthAPI } from '$lib/services/api/auth-api';
	import { ApiProblemKind } from '$lib/services/api/api-problem';

	// variables
	let formData: RegisterationFormData = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirmation: ''
	};
	let authAPI = new AuthAPI();
	let submitting: boolean = false;

	// methods
	const submitForm = async () => {
		submitting = true;
		try {
			const result = await authAPI.register(formData);
			if (result.kind === ApiProblemKind.ok) {
				window.location.href = '/auth/login';
			} else {
				console.warn(result);
			}
		} catch (e) {
			console.warn(e);
		} finally {
			submitting = false;
		}
	};
</script>

<form class="flex flex-col space-y-6" on:submit|preventDefault={submitForm}>
	<h3 class="text-xl font-medium text-gray-900 dark:text-white">Register to our platform</h3>

	<div class="flex justify-between">
		<Label class="space-y-2">
			<span>First name</span>
			<Input type="text" placeholder="John" required bind:value={formData.firstName} />
		</Label>

		<Label class="space-y-2">
			<span>Last name</span>
			<Input type="text" placeholder="Doe " required bind:value={formData.lastName} />
		</Label>
	</div>

	<Label class="space-y-2">
		<span>Email</span>
		<Input type="email" placeholder="name@company.com" required bind:value={formData.email} />
	</Label>

	<Label class="space-y-2">
		<span>Your password</span>
		<Input type="password" placeholder="•••••" required bind:value={formData.password} />
	</Label>

	<Label class="space-y-2">
		<span>Your password confirmation</span>
		<Input
			type="password"
			placeholder="•••••"
			required
			bind:value={formData.passwordConfirmation}
		/>
	</Label>

	<Button type="submit" class="w-full">Create account</Button>
	<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
		Have an account? <a
			href="/auth/login"
			class="text-primary-700 hover:underline dark:text-primary-500"
		>
			Login here
		</a>
	</div>
</form>
