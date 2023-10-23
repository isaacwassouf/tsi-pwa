<script lang="ts">
	import { AccountAPI } from '$lib/services/api/account-api';
	import { ApiProblemKind } from '$lib/services/api/api-problem';
	import type { EmptyResult } from '$lib/services/api/api.types';
	import { AuthAPI } from '$lib/services/api/auth-api';
	import type { VerifiedUserResult } from '$lib/services/api/types/authentication';
	import { user as userStore } from '$lib/stores/user';
	import type { GeneralAccountInformation } from '$lib/types/account';
	import { onMount } from 'svelte';

	//variables
	let editable: boolean = false;
    let submitting: boolean = false;
    let generalInfoFormData: GeneralAccountInformation = {
        firstName: '',
        lastName: '',
        email: '',
    };
    const accountAPI = new AccountAPI();
    const authAPI = new AuthAPI();

	//logic
	const toggleGeneralInfoEditable = () => {
        // if the form is closed reset the form
        if (editable){
            resetGeneralFormData();
        }
		editable = !editable;
	};

	const handleSubmit = async () => {        
        submitting = true;
        try{
            const result: EmptyResult = await accountAPI.updateGeneralInformation(generalInfoFormData);
            if(result.kind === ApiProblemKind.ok){
                // set the user in the store
				const result: VerifiedUserResult = await authAPI.verify();
				if (result.kind === ApiProblemKind.ok) {
					// set the user in the store
					userStore.set(result.data.user);
					editable = false;
				} else {
					console.warn(result);
				}
            }
        }catch(e){
            console.log(e);
        }finally{
            submitting = false;
        }
    };

    // reset the form data to the user store one
    const resetGeneralFormData = () => {
        [generalInfoFormData.firstName, generalInfoFormData.lastName] = $userStore.name.split(' ');
        generalInfoFormData.email = $userStore.email;
    }

    onMount(() => {
        // setup the inital data
        resetGeneralFormData();
    });
</script>

<div
	class="w-1/3 p-2 h-fit bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
>
	<div class="flex items-center mb-4">
		<h3 class="text-xl font-semibold dark:text-white">General Information</h3>

		<button
			type="button"
			class="ml-auto border border-gray-200 hover:bg-gray-100 hover:text-white focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-gray-700 dark:text-blue-500 dark:hover:text-white dark:hover:bg-gray-700"
			on:click={toggleGeneralInfoEditable}
		>
			{#if editable}
				<svg
					class="w-4 h-4 text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
			{:else}
				<svg
					class="w-4 h-4 text-gray-800 dark:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 18"
				>
					<path
						d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-1.391 7.361.707-3.535a3 3 0 0 1 .82-1.533L7.929 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h4.259a2.975 2.975 0 0 1-.15-1.639ZM8.05 17.95a1 1 0 0 1-.981-1.2l.708-3.536a1 1 0 0 1 .274-.511l6.363-6.364a3.007 3.007 0 0 1 4.243 0 3.007 3.007 0 0 1 0 4.243l-6.365 6.363a1 1 0 0 1-.511.274l-3.536.708a1.07 1.07 0 0 1-.195.023Z"
					/>
				</svg>
			{/if}
		</button>
	</div>

	<label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>First name</label
	>
	<input
		type="text"
		id="firstName"
		bind:value={generalInfoFormData.firstName}
		aria-label="firstName"
		class="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-700 focus:border-sky-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
		class:dark:text-gray-400={!editable}
		class:cursor-not-allowed={!editable}
		disabled={!editable}
		readonly={!editable}
	/>

    <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >Last name</label
>
<input
    type="text"
    id="lastName"
    bind:value={generalInfoFormData.lastName}
    aria-label="lastName"
    class="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-700 focus:border-sky-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
    class:dark:text-gray-400={!editable}
    class:cursor-not-allowed={!editable}
    disabled={!editable}
    readonly={!editable}
/>

	<label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Email</label
	>
	<input
		type="email"
		id="email"
		bind:value={generalInfoFormData.email}
		aria-label="email"
		class="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-700 focus:border-sky-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
		class:dark:text-gray-400={!editable}
		class:cursor-not-allowed={!editable}
		disabled={!editable}
		readonly={!editable}
	/>

	{#if editable}
		<button
			type="button"
			class="text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-700 dark:hover:bg-sky-800 focus:outline-none cursor-pointer"
            on:click={() => handleSubmit()}
            disabled={submitting}
			>
            
            {#if submitting}
                <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
            {/if}
            
            Save
            
            </button
		>
	{/if}
</div>
