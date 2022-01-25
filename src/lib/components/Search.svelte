<script lang="ts">
	import TrackList from './TrackList.svelte';
	import { searchForItem } from '$lib/api';
	import type { TrackWithTempo } from '$lib/types';
	import { filterTracks, getTracksWithTempos } from '$lib/utils';
	import { trackFilter } from '$lib/stores';
import Accordion from './Accordion.svelte';

	let searchQuery = '';
	let searchResults: SpotifyApi.SearchResponse = {};
	let tracksWithTempo: TrackWithTempo[] = [];

	let shownTracks = [];
	let hiddenTracks = [];

	$: [shownTracks, hiddenTracks] = filterTracks(tracksWithTempo, $trackFilter);

	async function handleSubmit() {
		searchResults = await searchForItem(searchQuery);
		tracksWithTempo = await getTracksWithTempos(searchResults.tracks.items);
	}
</script>

Search for anything
<form on:submit|preventDefault={handleSubmit}>
	<input
		bind:value={searchQuery}
		class="border-2 border-black p-2"
		type="text"
		placeholder="Type something"
	/>
	<button class="border-2 border-black p-2" type="submit">Search</button>
</form>
{#if tracksWithTempo.length > 0}
	<h2 class="text-xl">Tracks</h2>
	<TrackList tracks={shownTracks} />
	<hr class="my-4" />
	<Accordion title={`${hiddenTracks.length} hidden tracks`}>
		<TrackList tracks={hiddenTracks} />
	</Accordion>
{/if}
