<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { TrackWithTempo } from '$lib/types';
	import { getPlaylist, getSavedTracks } from '$lib/api';
	import { filterTracks, getTracksWithTempos } from '$lib/utils';
	import TrackList from '$lib/components/TrackList.svelte';
	import { trackFilter } from '$lib/stores';
import Accordion from '$lib/components/Accordion.svelte';

	let tracks: TrackWithTempo[] = [];
	let playlistName = 'loading playlist...';

	let shownTracks = [];
	let hiddenTracks = [];

	$: [shownTracks, hiddenTracks] = filterTracks(tracks, $trackFilter);

	onMount(async () => {
		const { id } = $page.params;
		if (id === 'saved') {
			playlistName = 'Liked Songs';
			const trackRes = await getSavedTracks();
			tracks = await getTracksWithTempos(trackRes);
		} else {
			const playlistRes = await getPlaylist(id);
			playlistName = playlistRes.name;
			tracks = await getTracksWithTempos(playlistRes.tracks.items.map((item) => item.track));
		}
	});
</script>

<svelte:head>
	<title>{playlistName} - Cadence</title>
</svelte:head>

<h1 class="text-3xl mb-2">{playlistName}</h1>
<TrackList tracks={shownTracks} />
<hr class="my-4" />
<Accordion title={`${hiddenTracks.length} hidden tracks`}>
	<TrackList tracks={hiddenTracks} />
</Accordion>
