<script lang="ts">
	import { AccountAPI } from "$lib/services/api/account-api";
	import { ApiProblemKind } from "$lib/services/api/api-problem";
	import type { EmptyResult } from "$lib/services/api/api.types";
	import type { ChangePasswordFormData } from "$lib/types/account";
	import toast, { Toaster } from 'svelte-french-toast';


    // variables
    let editable: boolean = false;
    let changePassworData: ChangePasswordFormData = {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
    }
    let submitting: boolean = false;
    const accountAPI = new AccountAPI();

    //logic
	const toggleGeneralInfoEditable = () => {
        // if the form is closed reset the form
        if (editable){
            resetChangePasswordFormData();
        }
		editable = !editable;
	};


    const resetChangePasswordFormData = () => {
        changePassworData.currentPassword = '';
        changePassworData.newPassword = '';
        changePassworData.newPasswordConfirmation = '';
    }

    const handleSubmit = async () => {        
        submitting = true;
        try{
            const result: EmptyResult = await accountAPI.changePassword(changePassworData);
            if(result.kind === ApiProblemKind.ok){
                editable = false;
                resetChangePasswordFormData();

                toast.success("Password changed successfully", {
						className: "mb-2 mr-2",
						position: "bottom-right",
						duration: 4000
					});
            }
        }catch(e){
            console.log(e);
        }finally{
            submitting = false;
        }
    };
</script>

<div
class="w-2/3 p-2 h-fit bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
>
<div class="flex items-center mb-4">
    <h3 class="text-xl font-semibold dark:text-white">Password Information</h3>

    <button
        type="button"
        class="ml-auto text-blue-700 border border-gray-200 hover:bg-gray-100 hover:text-white focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-gray-700 dark:text-blue-500 dark:hover:text-white dark:hover:bg-gray-700"
        on:click={() => toggleGeneralInfoEditable()}
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
        d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"
    />
    <path
        d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"
    />
</svg>
<span class="sr-only">Edit account icon</span>
    {/if}
    </button>
</div>
	<label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Current password</label
	>
	<input
		type="password"
		id="password"
        bind:value={changePassworData.currentPassword}
		aria-label="password"
		class="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-700 focus:border-sky-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
		placeholder="********"
        class:dark:text-gray-400={!editable}
		class:cursor-not-allowed={!editable}
		disabled={!editable}
		readonly={!editable}
	/>

	<label for="new_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>New password</label
	>
	<input
		type="password"
		id="new_password"
        bind:value={changePassworData.newPassword}
		aria-label="new_password"
		class="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-700 focus:border-sky-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
		placeholder="***********"
        class:dark:text-gray-400={!editable}
		class:cursor-not-allowed={!editable}
		disabled={!editable}
		readonly={!editable}
	/>

	<label for="new_password_confirmation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
		>Confirm password</label
	>
	<input
		type="password"
		id="new_password_confirmation"
        bind:value={changePassworData.newPasswordConfirmation}
		aria-label="new_password_confirmation"
		class="mb-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-700 focus:border-sky-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
		placeholder="***********"
        class:dark:text-gray-400={!editable}
		class:cursor-not-allowed={!editable}
		disabled={!editable}
		readonly={!editable}
	/>

    {#if editable}
    <button
        type="button"
        class="text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-sky-700 dark:hover:bg-sky-800 focus:outline-none cursor-pointer"
        disabled={submitting}
        on:click={handleSubmit}
        >
        
        {#if submitting}
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
        {/if}
        
        Change
        
        </button
    >
{/if}
</div>

<Toaster />