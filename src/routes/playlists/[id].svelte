<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { TrackWithTempo } from '$lib/types';
	import { getPlaylist, getSavedTracks } from '$lib/api';
	import { getTracksWithTempos } from '$lib/utils';
	import TrackList from '$lib/components/TrackList.svelte';

	let tracks: TrackWithTempo[] = [];
	let playlistName = 'loading playlist...';

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
<TrackList {tracks} />
