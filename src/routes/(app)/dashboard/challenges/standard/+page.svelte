<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import type { PageServerData } from './$types';
	import type { Quote } from '$lib/services/api/types/challenges';
	import Word from '$lib/components/challenge/Word.svelte';
	import { onMount } from 'svelte';
	import ResultModal from '$lib/components/challenge/ResultModal.svelte';
	import { ChallengeAPI } from '$lib/services/api/challenge-api';
	import { ChallengeType, type StandardChallengeData } from '$lib/types/challenges';
	import { ApiProblemKind } from '$lib/services/api/api-problem';

	// props
	export let data: PageServerData;

	// variables
	const challengeAPI = new ChallengeAPI();
	let quote: Quote = data.quote;
	let words = quote.content.split(' ');
	let activeWordIndex: number = 0;
	let inputValue: string = '';
	let inputField: HTMLInputElement;
	let mistakes: Map<string, string[]> = new Map<string, string[]>();
	let modalOpen: boolean = false;
	let firstInteractionWithInput: boolean = true;
	let start: number;
	let end: number;
	let duration: number = 0;
	let accuracy: number = 0;
	let wordsPerMinute: number = 0;
	let loading: boolean = false;

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
				modalOpen = true;

				storeChallenge({
					quote_id: quote._id,
					wpm: wordsPerMinute,
					time_taken: duration,
					accuracy: accuracy,
					challenge_type: ChallengeType.STANDARD
				});
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

	const handleNext = async () => {
		modalOpen = false;
		loading = true;

		// fetch an new quote
		const response: Response = await fetch('https://api.quotable.io/random');

		if (response.ok) {
			// parse the json data
			quote = await response.json();

			// reset the variables
			words = quote.content.split(' ');
			activeWordIndex = 0;
			inputValue = '';
			mistakes = new Map<string, string[]>();
			firstInteractionWithInput = true;
			start = 0;
			end = 0;
			duration = 0;
			accuracy = 0;
			wordsPerMinute = 0;

			inputField.focus();
		} else {
			console.log('error fetching new quote', response);
		}

		loading = false;
	};

	const handleRepeat = () => {
		modalOpen = false;

		// reset the variables
		activeWordIndex = 0;
		inputValue = '';
		mistakes = new Map<string, string[]>();
		firstInteractionWithInput = true;
		start = 0;
		end = 0;
		duration = 0;
		accuracy = 0;
		wordsPerMinute = 0;

		inputField.focus();
	};

	const storeChallenge = async (challenge: StandardChallengeData) => {
		try {
			const response = await challengeAPI.store(challenge);

			if (response.kind !== ApiProblemKind.ok) {
				console.log('challenge stored');
			}
		} catch (err) {
			console.log('error storing challenge', err);
		}
	};

	// run the handler whenever the inputValue changes
	$: handleInput(inputValue);

	onMount(() => {
		inputField.focus();
	});
</script>

<ResultModal
	bind:modalOpen
	{wordsPerMinute}
	{duration}
	{accuracy}
	on:next={handleNext}
	on:repeat={handleRepeat}
/>

{#if loading}
	<div class="h-full flex justify-center items-center">
		<div role="status">
			<svg
				aria-hidden="true"
				class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-sky-700"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<span class="sr-only">Loading...</span>
		</div>
	</div>
{:else}
	<div class="flex justify-evenly items-center flex-col h-full dark:bg-gray-800">
		<div>
			<Card class="text-center mx-8" size="xl" padding="xl">
				<div
					class="mb-2 flex flex-wrap justify-center items-center gap-1.5 text-2xl font-bold text-gray-500 dark:text-gray-400"
				>
					{#each words as word, ind}
						<Word {word} active={activeWordIndex === ind} />
					{/each}
				</div>

				<div class="flex justify-end text-sm italic text-gray-900 dark:text-gray-400">
					{quote.author}{'.'}
				</div>
			</Card>
		</div>

		<div class="flex flex-col items-center gap-4">
			<input
				type="text"
				id="input-word"
				bind:this={inputField}
				bind:value={inputValue}
				on:keydown={startTimerOnFirstInteraction}
				class="w-40 h-16 border-b-4 text-center text-lg font-bold text-gray-900 rounded-lg block p-2.5
					bg-gray-50 border-gray-300 focus:ring-sky-700 focus:border-sky-700
					dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-sky-700 dark:focus:border-sky-700"
			/>

			<div class="w-full flex justify-center">
				<div
					class="p-1.5 border w-fit border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-600"
					role="alert"
				>
					<div class="flex justify-center">
						<button
							type="button"
							class="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-500"
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
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
