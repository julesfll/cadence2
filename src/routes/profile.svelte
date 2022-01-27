<script lang="ts">
	import { getUserTopItems } from '$lib/api';

	import TrackList from '$lib/components/TrackList.svelte';
	import { user } from '$lib/stores';
	import type { TrackWithTempo } from '$lib/types';
	import { getTracksWithTempos, createTempoFilter } from '$lib/utils';
	import { onMount } from 'svelte';

	let filteredTopTracks: TrackWithTempo[] = [];

	onMount(async () => {
		const topTracks = await getUserTopItems(50);
		console.log(topTracks);
		filteredTopTracks = (await getTracksWithTempos(topTracks.items)).filter(
			createTempoFilter(170, 190, true)
		);
	});
</script>

<p>Hi {$user.display_name}</p>
<button class="border-2 border-black p-1">Logout (TODO)</button>
{#if filteredTopTracks.length > 0}
	<h1>Check it out!</h1>
	<p>Out of your top 50 songs, these would work well for your next run:</p>
	<TrackList tracks={filteredTopTracks} />
{/if}
