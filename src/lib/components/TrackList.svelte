<script lang="ts">
	import Track from './Track.svelte';
	import type { TrackWithTempo } from '$lib/types';
	import VirtualList from '@sveltejs/svelte-virtual-list';

	export let tracks: TrackWithTempo[] = [];
</script>

<ul class="space-y-2">
	<!-- TOOD: make height of viewport -->
	<VirtualList height="450px" items={tracks} let:item>
		<li>
			<Track track={item} />
		</li>
	</VirtualList>
</ul>
