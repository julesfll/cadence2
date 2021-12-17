<script lang="ts">
	import TrackList from './TrackList.svelte';
	import { searchForItem } from '$lib/api';

	let searchQuery = '';
	let searchResults: SpotifyApi.SearchResponse = {};

	async function handleSubmit() {
		const res = await searchForItem(searchQuery);
		searchResults = res;
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
<h2 class="text-xl">Tracks</h2>
{#if searchResults.tracks}
	<TrackList tracks={searchResults?.tracks?.items} />
{/if}
