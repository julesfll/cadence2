<script>
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import FilterControls from '$lib/components/FilterControls.svelte';
	import { onMount } from 'svelte';
	import { getUserProfile } from '$lib/api';
	import { user } from '$lib/stores';

	onMount(async () => {
		if (!$user) {
			const res = await getUserProfile();
			$user = res;
		}
	});
</script>

<div class="flex h-screen">
	<aside class="w-1/3 max-w-sm bg-gray-300">
		<Sidebar />
	</aside>
	<div class="flex flex-1 flex-col">
		<main class="flex-grow overflow-y-auto p-4">
			<!-- TODO: make sticky when scrolling down -->
			<div>
				<a href="/"><span class="text-xl bg-gray-400 p-1">C</span></a>
				{#if $user}
					<a href="/profile" class="float-right"
						><span class="text-xl p-1 bg-gray-300">P</span>
						<span class="underline">{$user.display_name}</span></a
					>
				{:else}
					Login (TODO)
				{/if}
			</div>
			<slot />
		</main>
		<footer class="bg-gray-200 shrink-0">
			<FilterControls />
		</footer>
	</div>
</div>
