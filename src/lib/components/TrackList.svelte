<script lang="ts">
	import Track from './Track.svelte';
	import type { TrackWithTempo } from '$lib/types';

	export let tracks: TrackWithTempo[] = [];
</script>

<ul class="space-y-2">
	{#each tracks as track}
		<li>
			<Track {track} />
		</li>
	{/each}
</ul>
