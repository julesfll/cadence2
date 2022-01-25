<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { searchForItem } from '$lib/api';
	import TrackList from '$lib/components/TrackList.svelte';
	import { trackFilter } from '$lib/stores';
	import type { TrackWithTempo } from '$lib/types';
	import { filterTracks, getTracksWithTempos } from '$lib/utils';
	import { onMount } from 'svelte';
	import Accordion from '$lib/components/Accordion.svelte';

	let searchInput;
	let query = '';
	let searchResults: SpotifyApi.SearchResponse = {};
	let tracksWithTempo: TrackWithTempo[] = [];

	let shownTracks = [];
	let hiddenTracks = [];

	$: [shownTracks, hiddenTracks] = filterTracks(tracksWithTempo, $trackFilter);

	async function handleSubmit() {
		goto(`/search?q=${encodeURIComponent(query)}`);

		if (query) {
			searchResults = await searchForItem(query);
			tracksWithTempo = await getTracksWithTempos(searchResults.tracks.items);
		}
	}

	onMount(async () => {
		query = $page.query.get('q');
		searchInput.focus();

		if (query) {
			searchResults = await searchForItem(query);
			tracksWithTempo = await getTracksWithTempos(searchResults.tracks.items);
		}
	});
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input
		bind:value={query}
		bind:this={searchInput}
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
