<script lang="ts">
	export let word: string;
	export let active: boolean = false;
</script>

<div class="flex" class:text-white={active} class:underline={active}>
	{#each word as letter}
		<span>
			{letter}
		</span>
	{/each}
</div>
