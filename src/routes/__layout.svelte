<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { getUserProfile } from '$lib/api';
	import { selectedTracks, user } from '$lib/stores';
	import TrackList from '$lib/TrackList.svelte';

	onMount(async () => {
		if (!$user) {
			const res = await getUserProfile();
			$user = res;
		}
	});
</script>

<div class="flex h-screen justify-center flex-wrap">
	<main class="p-2 basis-0 grow-[999] min-w-[50%]">
		<slot />
	</main>
	<!-- https://every-layout.dev/layouts/sidebar/ -->
	<aside class="border-black border-4 grow basis-[18rem] p-2">
		{#if $user}
			<h2 class="mb-2">
				Hello {$user.display_name}
			</h2>
		{/if}
		<TrackList tracks={$selectedTracks} />
	</aside>
</div>
