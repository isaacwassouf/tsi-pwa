<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let modalOpen: boolean;
	export let wordsPerMinute: number;
	export let duration: number;
	export let accuracy: number;

    const dispatch = createEventDispatcher();

    const handleNext = () => {
        dispatch('next');
    }

    const handleRepeat = () => {
        dispatch('repeat');
    }
</script>

<Modal title="Challenge details" bind:open={modalOpen} size={'md'} autoclose>
	<div class="flex justify-between gap-10">
		<kbd
			class="w-1/3 px-4 py-4 text-center text-3xl font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-500 dark:shadow-keyCapDark"
			>{wordsPerMinute}</kbd
		>

		<kbd
			class="w-1/3 px-4 py-4 text-center text-3xl font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-500 dark:shadow-keyCapDark"
			>{duration.toFixed(2)}{'s'}</kbd
		>

		<kbd
			class="w-1/3 px-4 py-4 text-center text-3xl font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500 dark:hover:bg-gray-500 dark:shadow-keyCapDark"
			>{accuracy.toFixed(2)}{'%'}</kbd
		>
	</div>

	<div class="flex justify-between gap-10">
		<div class="w-1/3 text-center text-3xl font-bold text-gray-800 dark:text-gray-400">WPM</div>

		<div class="w-1/3 text-center text-3xl font-bold dark:text-gray-400">Duration</div>

		<div class="w-1/3 text-center text-3xl font-bold dark:text-gray-400">Accuracy</div>
	</div>

	<div class="w-full flex justify-center">
		<div
			class="p-1.5 border w-fit border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-600"
			role="alert"
		>
			<div class="flex justify-center">
				<button
					type="button"
					class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-500"
                    on:click={handleNext}
				>
					<svg
						class="-ml-0.5 mr-1 h-3 w-3"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 14"
					>
						<path
							d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z"
						/>
					</svg>
					Next
				</button>

				<button
					type="button"
					class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-500"
                    on:click={handleRepeat}
				>
					<svg
						class="-ml-0.5 mr-2 h-3 w-3"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 14"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"
						/>
					</svg>
					Repeat
				</button>
			</div>
		</div>
	</div>
</Modal>
