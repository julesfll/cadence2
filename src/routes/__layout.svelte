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

<div class="flex h-screen justify-center flex-wrap">
	<main class="basis-0 grow-[999] min-w-[50%]">
		<div class="p-2">
			<slot />
		</div>
		<footer class="border-black border-4">
			<FilterControls />
		</footer>
	</main>
	<!-- https://every-layout.dev/layouts/sidebar/ -->
	<aside class="border-black border-4 grow basis-[18rem]">
		<Sidebar />
	</aside>
</div>
