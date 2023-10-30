<script lang="ts">
	import { Card, Modal } from 'flowbite-svelte';
	import type { PageServerData } from './$types';
	import type { Quote } from '$lib/services/api/types/challenges';
	import Word from '$lib/components/challenge/Word.svelte';
	import { onMount } from 'svelte';

	// props
	export let data: PageServerData;

	// variables
	let quote: Quote = data.quote;
	let words = quote.content.split(' ');
	let activeWordIndex: number = 0;
	let inputValue: string = '';
	let inputField: HTMLInputElement;
	let mistakes: Map<string, string[]> = new Map<string, string[]>();
	let modelOpen: boolean = false;
	let firstInteractionWithInput: boolean = true;
	let start: number;
	let end: number;
	let duration: number;
	let accuracy: number;
	let wordsPerMinute: number;

	const registerMistake = (correct: string, mistake: string) => {
		// if a mistake for this word exist push the new mistake
		if (mistakes.has(correct)) {
			mistakes.get(correct).push(mistake);
			return;
		}
		// create an entry for the correct word and push the first mistake
		mistakes.set(correct, [mistake]);
	};

	const startTimerOnFirstInteraction = () => {
		// if this is the first interaction for the user with the input field start the timer
		if (firstInteractionWithInput) {
			console.log('started the timer.');

			start = Date.now();
			firstInteractionWithInput = false;
		}
	};

	const handleInput = (input: string) => {
		// if the last character in the input is a space and the input equales the active word
		if (input[input.length - 1] === ' ' && input.trim() === words[activeWordIndex]) {
			// increare the active word index by one
			activeWordIndex += 1;
			// clear the input field
			clearInputField();

			// if this is the last correct word, ...
			if (activeWordIndex === words.length) {
				end = Date.now();

				// calculate the metrics at the end of the challenge
				calculateMetrics();

				// open the model
				modelOpen = true;
			}
			return;
		}

		// if the last character in the input is a space and the input doesn't equales the active word
		if (input[input.length - 1] === ' ' && input.trim() !== words[activeWordIndex]) {
			registerMistake(words[activeWordIndex], input.trim());
		}
	};

	const calculateMetrics = () => {
		// calculate the duration
		duration = (end - start) / 1000;

		// calculate the accuracy
		accuracy = (1 - mistakes.size / words.length) * 100;

		// calculate how many words per minute
		wordsPerMinute = Math.ceil((words.length * 60) / duration);
	};

	const clearInputField = () => {
		inputValue = '';
	};

	// run the handler whenever the inputValue changes
	$: handleInput(inputValue);

	onMount(() => {
		inputField.focus();
	});
</script>

<Modal title="Challenge details" bind:open={modelOpen} size={'md'} autoclose>
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
</Modal>

<div class="flex justify-around items-center flex-col h-full dark:bg-gray-800">
	<div>
		<Card class="text-center mx-8" size="xl" padding="xl">
			<div
				class="mb-2 flex flex-wrap justify-center items-center gap-1.5 text-2xl font-bold text-gray-900 dark:text-gray-400"
			>
				{#each words as word, ind}
					{#if activeWordIndex === ind}
						<Word {word} active={true} />
					{:else}
						<Word {word} active={false} />
					{/if}
				{/each}
			</div>

			<div class="flex justify-end text-sm italic text-gray-900 dark:text-gray-400">
				{quote.author}
			</div>
		</Card>
	</div>

	<input
		type="text"
		id="input-word"
		bind:this={inputField}
		bind:value={inputValue}
		on:keydown={startTimerOnFirstInteraction}
		class="w-40 h-16 border text-center text-lg font-bold text-gray-900 rounded-lg block p-2.5
			bg-gray-50 border-gray-300 focus:ring-sky-700 focus:border-sky-700
			dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
	/>
</div>
