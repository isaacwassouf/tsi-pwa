<script lang="ts">
	import { user } from '$lib/stores/user';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if $user}
	<p>Logged in as {$user.email}</p>
{:else}
	<p>Not logged in</p>
{/if}
