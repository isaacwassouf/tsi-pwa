<script lang="ts">
	export let word: string;
	export let active: boolean = false;
</script>

<div class="flex" class:text-black={active} class:underline={active} class:dark:text-white={active}>
	{#each word as letter}
		<span>
			{letter}
		</span>
	{/each}
</div>
