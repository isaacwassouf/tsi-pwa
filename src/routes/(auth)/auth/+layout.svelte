<script lang="ts">
	import { Card } from 'flowbite-svelte';
</script>

<div class="flex items-center justify-center h-full">
	<Card class="w-full max-w-md">
		<slot />
	</Card>
</div>
