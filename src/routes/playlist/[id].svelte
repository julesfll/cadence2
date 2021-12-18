<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { TrackWithTempo } from '$lib/types';
	import { getPlaylistItems, getSavedTracks } from '$lib/api';
	import { getTracksWithTempos } from '$lib/utils';
	import TrackList from '$lib/components/TrackList.svelte';

	let tracks: TrackWithTempo[] = [];

	onMount(async () => {
		const { id } = $page.params;
		if (id === 'saved') {
      const trackRes = await getSavedTracks();
      tracks = await getTracksWithTempos(trackRes);
		} else {
			const trackRes = await getPlaylistItems(id);
			tracks = await getTracksWithTempos(trackRes);
		}
	});
</script>

<TrackList {tracks} />
