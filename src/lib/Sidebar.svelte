<script lang="ts">
	import '../app.css';
	import { selectedTracks, user } from '$lib/stores';
	import TrackList from '$lib/TrackList.svelte';
	import RangeSlider from 'svelte-range-slider-pips';
	import type { TrackWithTempo } from './types';
	import { partition } from './utils';

	function filterBpm(
		tracks: TrackWithTempo[],
		minBpm: number,
		maxBpm: number,
		halftime: boolean = false
	) {
		const filter = ({ tempo }: TrackWithTempo) =>
			(tempo >= minBpm && tempo <= maxBpm) ||
			(halftime && tempo >= minBpm / 2 && tempo <= maxBpm / 2);
		return partition(tracks, filter);
	}

	let bpms = [170, 190];
	let allowHalftime = true;

	$: [filteredTracks, hiddenTracks] = filterBpm($selectedTracks, bpms[0], bpms[1], allowHalftime);
</script>

<div class="p-2">
	{#if $user}
		<h2 class="mb-2">
			Hello {$user.display_name}
		</h2>
	{/if}
	<RangeSlider
		min={150}
		max={200}
		float
		range
		pushy
		pips
		first="label"
		last="label"
		bind:values={bpms}
	/>
	<label>
		<input type="checkbox" bind:checked={allowHalftime} />
		Allow halftime
	</label>
	<div />
	<TrackList tracks={filteredTracks} />
	{hiddenTracks.length} hidden tracks
</div>
