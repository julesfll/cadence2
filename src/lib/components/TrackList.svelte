<script lang="ts">
	import type { TrackWithTempo } from '$lib/types';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import TrackItem from './TrackItem.svelte';

	export let tracks: TrackWithTempo[] = [];
</script>

<ul>
	<!-- TOOD: make height of viewport -->
	<VirtualList height="450px" items={tracks} let:item>
		<li>
			<TrackItem track={item} />
		</li>
	</VirtualList>
</ul>
