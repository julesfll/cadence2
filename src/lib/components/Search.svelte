<script lang="ts">
	import TrackList from './TrackList.svelte';
	import { getAudioFeatures, searchForItem } from '$lib/api';
	import type { TrackWithTempo } from '$lib/types';

	let searchQuery = '';
	let searchResults: SpotifyApi.SearchResponse = {};
	let tracksWithTempo: TrackWithTempo[] = [];

	async function handleSubmit() {
		searchResults = await searchForItem(searchQuery);
		const audioFeaturesResponse = await getAudioFeatures(
			searchResults.tracks.items.map((track) => track.id)
		);
		const tempos = audioFeaturesResponse.audio_features.map((features) => features.tempo || null);
		tracksWithTempo = searchResults.tracks.items.map((track, i) => {
			return { ...track, tempo: tempos[i] };
		});
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
	<TrackList tracks={tracksWithTempo} />
{/if}
