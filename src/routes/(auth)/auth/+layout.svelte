<script lang="ts">
	import { Kbd } from 'flowbite-svelte';
</script>

<div class="flex h-screen">
	<div class="w-1/2 flex flex-col justify-center items-center gap-16 dark:bg-gray-900">
		<div class="w-1/2 flex justify-center items-center dark:text-white">
			<h1 class="font-bold text-6xl">Typing Speed Improvement</h1>
		</div>

		<div class="flex flex-col justify-center items-center gap-4 select-none">
			<div class="flex gap-3">
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">Q</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">W</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">E</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">R</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">T</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">Y</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">U</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">I</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">O</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">P</Kbd>
			</div>

			<div class="flex gap-3">
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">Caps Lock</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">A</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">S</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">D</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">F</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">G</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">H</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">J</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">K</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">L</Kbd>
			</div>

			<div class="flex gap-3">
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">Shift</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">Z</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">X</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">C</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">V</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">B</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">N</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">M</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">,</Kbd>
				<Kbd class="px-4 py-3.5 shadow-keyCap dark:shadow-keyCapDark">.</Kbd>
			</div>

			<div class="flex">
				<Kbd class="px-10 py-3.5 shadow-keyCap dark:shadow-keyCapDark">Space bar</Kbd>
			</div>
		</div>
	</div>

	<div class="w-1/2 flex items-center justify-center h-full dark:bg-gray-900">
		<div
			class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
		>
			<slot />
		</div>
	</div>
</div>
