<script lang="ts">
	import { Chart, Card, A, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronRightSolid, ChevronDownSolid } from 'flowbite-svelte-icons';
	import type { ApexOptions } from 'apexcharts';
	import type {
		ChallengeAreaChart,
		ChallengeAreaChartDataResult
	} from '$lib/services/api/types/challenges';
	import { ChallengeAPI } from '$lib/services/api/challenge-api';
	import { ApiProblemKind } from '$lib/services/api/api-problem';
	import { onMount } from 'svelte';
	import type { TimeWindow } from '$lib/types/challenges';

	// variables
	let loadingAreaChartData = false;
	let challengesAreaChartData: ChallengeAreaChart[] = [];
	let timeWindow: TimeWindow = 'week';
	let timeWindowFormatted = 'Last 7 days';
	let dropdownOpen: boolean = false;
	let xData: string[] = [];
	let yData: number[] = [];
	const challengeAPI = new ChallengeAPI();

	let options: ApexOptions = {
		chart: {
			height: '400px',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#1C64F2',
				gradientToColors: ['#1C64F2']
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 6
		},
		grid: {
			show: false,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0
			}
		},
		series: [
			{
				name: 'New users',
				data: [30, 45, 42, 55, 52, 50],
				color: '#1A56DB'
			}
		],
		xaxis: {
			categories: [
				'2023-11-01 16:23:45',
				'2023-11-01 16:23:45',
				'2023-11-01 16:23:45',
				'2023-11-01 16:23:45',
				'2023-11-01 16:23:45',
				'2023-11-01 16:23:45',
				'2023-11-01 16:23:45'
			],
			labels: {
				show: false
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			show: false
		}
	};

	// logic
	const updateAxisData = (data: ChallengeAreaChart[]) => {
		xData = data.map((item) => item.taken_at);
		yData = data.map((item) => item.wpm);
	};

	const loadAreaChartData = async () => {
		loadingAreaChartData = true;
		try {
			const result: ChallengeAreaChartDataResult = await challengeAPI.fetchAreaChartData(
				timeWindow
			);
			if (result.kind === ApiProblemKind.ok) {
				challengesAreaChartData = result.data.challenges;

				switch (timeWindow) {
					case 'today':
						timeWindowFormatted = 'Today';
						break;
					case 'week':
						timeWindowFormatted = 'Last 7 days';
						break;
					case 'month':
						timeWindowFormatted = 'Last 30 days';
						break;
				}
			}
		} catch (e) {
			console.log(e);
		} finally {
			loadingAreaChartData = false;
		}
	};

	const changeTimeWindow = (window: TimeWindow) => {
		timeWindow = window;

		loadAreaChartData();
	};

	const handleTimeWidnowChange = (window: TimeWindow) => {
		changeTimeWindow(window);
		closeDropdown();
	};

	const closeDropdown = () => {
		dropdownOpen = false;
	};

	$: changeTimeWindow(timeWindow);

	$: updateAxisData(challengesAreaChartData);

	$: options = {
		...options,
		series: [
			{
				name: 'WPM',
				data: yData,
				color: '#1A56DB'
			}
		],
		xaxis: {
			...options.xaxis,
			categories: xData
		}
	};

	onMount(() => {
		loadAreaChartData();
	});
</script>

<Card size="lg">
	<div class="flex justify-between">
		<div>
			<h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
				{challengesAreaChartData.length}
			</h5>
			<p class="text-base font-normal text-gray-500 dark:text-gray-400">Challenges this week</p>
		</div>
	</div>
	<Chart {options} />
	<div
		class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
	>
		<div class="flex justify-between items-center pt-5">
			<Button
				class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0"
				>{timeWindowFormatted}<ChevronDownSolid class="w-2.5 m-2.5 ml-1.5" /></Button
			>
			<Dropdown class="w-40" offset={-6} bind:open={dropdownOpen}>
				<DropdownItem on:click={() => handleTimeWidnowChange('today')}>Today</DropdownItem>
				<DropdownItem on:click={() => handleTimeWidnowChange('week')}>Last 7 days</DropdownItem>
				<DropdownItem on:click={() => handleTimeWidnowChange('month')}>Last 30 days</DropdownItem>
			</Dropdown>
		</div>
	</div>
</Card>
