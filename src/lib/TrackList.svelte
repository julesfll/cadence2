<script lang="ts">
	import Track from '$lib/Track.svelte';
	import type { TrackWithTempo } from './types';
	export let tracks: TrackWithTempo[] = [];
</script>

<ul class="space-y-2">
	{#each tracks as track}
		<li>
			<Track {track} />
		</li>
	{/each}
</ul>
