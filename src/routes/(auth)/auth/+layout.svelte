<script lang="ts">
	import { Kbd } from 'flowbite-svelte';
</script>

<div class="flex h-screen">
	<div class="w-1/2 flex flex-col justify-center items-center gap-16 dark:bg-gray-800">
		<div class="w-1/2 flex justify-center items-center dark:text-white">
			<h1 class="font-bold text-6xl">Typing Speed Enhancement</h1>
		</div>

		<div class="flex flex-col justify-center items-center gap-4 select-none">
			<div class="flex gap-3">
				<Kbd class="px-4 py-3.5 shadow-keyCap">Q</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">W</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">E</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">R</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">T</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">Y</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">U</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">I</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">O</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">P</Kbd>
			</div>

			<div class="flex gap-3">
				<Kbd class="px-4 py-3.5 shadow-keyCap">Caps Lock</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">A</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">S</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">D</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">F</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">G</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">H</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">J</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">K</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">L</Kbd>
			</div>

			<div class="flex gap-3">
				<Kbd class="px-4 py-3.5 shadow-keyCap">Shift</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">Z</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">X</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">C</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">V</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">B</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">N</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">M</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">,</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap">.</Kbd>
			</div>

			<div class="flex">
				<Kbd class="px-10 py-3.5 shadow-keyCap">Space bar</Kbd>
			</div>
		</div>
	</div>

	<div class="w-1/2 flex items-center justify-center h-full dark:bg-gray-800">
		<div
			class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
		>
			<slot />
		</div>
	</div>
</div>
