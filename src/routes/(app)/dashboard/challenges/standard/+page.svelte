<script lang="ts">
    import {Card, Kbd} from 'flowbite-svelte';
    import type {PageServerData} from "./$types";
    import type {Quote} from "$lib/services/api/types/challenges";

    // props
    export let data: PageServerData;

    // variables
    let quote: Quote = data.quote;

</script>

<div class="flex justify-around items-center flex-col h-full  dark:bg-gray-800">
    <Card class="text-center" size="lg" padding="xl">
        <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Work fast from anywhere</h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{quote.content}</p>
    </Card>
</div>