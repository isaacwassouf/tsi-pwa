<script lang="ts">
	import LineChart from '$lib/components/dashboard/LineChart.svelte';
	import { ApiProblemKind } from '$lib/services/api/api-problem';
	import { ChallengeAPI } from '$lib/services/api/challenge-api';
	import type {
		ChallengeAreaChart,
		ChallengeAreaChartDataResult,
		ChallengeIndex,
		ChallengeIndexResult
	} from '$lib/services/api/types/challenges';
	import {
		ChallengeType,
		type ChallengeSortings,
		type ChallengeSortingBy
	} from '$lib/types/challenges';
	import { onMount } from 'svelte';

	// variables
	const challengeAPI = new ChallengeAPI();
	let challenges: ChallengeIndex[] = [];
	let loadingChallenges = false;
	const challengeSorting: ChallengeSortings = {
		sortBy: 'created_at',
		sortDirection: 'desc'
	};

	// logic
	const loadChallenges = async () => {
		loadingChallenges = true;
		try {
			const result: ChallengeIndexResult = await challengeAPI.index(challengeSorting);
			if (result.kind === ApiProblemKind.ok) {
				challenges = result.data.challenges;
			}
		} catch (e) {
			console.log(e);
		} finally {
			loadingChallenges = false;
		}
	};

	const changeChallengeSorting = (sortBy: ChallengeSortingBy) => {
		changeSorting(sortBy);
		loadChallenges();
	};

	const changeSorting = (sortBy: ChallengeSortingBy) => {
		if (challengeSorting.sortBy === sortBy) {
			if (challengeSorting.sortDirection === 'asc') {
				challengeSorting.sortDirection = 'desc';
			} else {
				challengeSorting.sortDirection = 'asc';
			}
		} else {
			challengeSorting.sortBy = sortBy;
			challengeSorting.sortDirection = 'asc';
		}
	};

	onMount(() => {
		loadChallenges();
	});
</script>

<div class="flex gap-4">
	<div class="w-1/3">
		<LineChart />
	</div>

	<div class="w-2/3">
		{#if loadingChallenges}
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
			<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead
						class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
					>
						<tr>
							<th scope="col" class="px-6 py-3">
								<div class="flex items-center">
									Type
									<button on:click={() => changeChallengeSorting('challenge_type')}
										><svg
											class="w-3 h-3 ml-1.5"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
											/>
										</svg></button
									>
								</div>
							</th>
							<th scope="col" class="px-6 py-3">
								<div class="flex items-center">
									WPM (words/min)
									<button on:click={() => changeChallengeSorting('wpm')}
										><svg
											class="w-3 h-3 ml-1.5"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
											/>
										</svg></button
									>
								</div>
							</th>
							<th scope="col" class="px-6 py-3">
								<div class="flex items-center">
									Duration (s)
									<button on:click={() => changeChallengeSorting('time_taken')}
										><svg
											class="w-3 h-3 ml-1.5"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
											/>
										</svg></button
									>
								</div>
							</th>
							<th scope="col" class="px-6 py-3">
								<div class="flex items-center">
									Accuracy (%)
									<button on:click={() => changeChallengeSorting('accuracy')}
										><svg
											class="w-3 h-3 ml-1.5"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
											/>
										</svg></button
									>
								</div>
							</th>

							<th scope="col" class="px-6 py-3">
								<div class="flex items-center">
									Taken At
									<button on:click={() => changeChallengeSorting('created_at')}
										><svg
											class="w-3 h-3 ml-1.5"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
											/>
										</svg></button
									>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{#if challenges?.length > 0}
							{#each challenges as challenge}
								<tr
									class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
								>
									<th
										scope="row"
										class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{#if challenge.challenge_type === ChallengeType.STANDARD}
											<svg
												class="w-5 h-5 text-gray-800 dark:text-gray-300"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 16 20"
											>
												<path
													d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z"
												/>
											</svg>
										{/if}
										{#if challenge.challenge_type === ChallengeType.COUNTDOWN}
											<svg
												class="w-5 h-5 text-gray-800 dark:text-gray-300"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path
													d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"
												/>
											</svg>
										{/if}
									</th>
									<td class="px-6 py-4"> {challenge.wpm} </td>
									<td class="px-6 py-4"> {challenge.duration} </td>
									<td class="px-6 py-4"> {challenge.accuracy} </td>
									<td class="px-6 py-4"> {challenge.taken_at}</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
