<script lang="ts">
	import '../../app.css';
	import { selectedTracks, user } from '$lib/stores';
	import TrackList from './TrackList.svelte';
	import RangeSlider from 'svelte-range-slider-pips';
	import type { TrackWithTempo } from '$lib/types';
	import { partition } from '$lib/utils';
	import Accordion from './Accordion.svelte';
	import { createPlaylist } from '$lib/api';
	import { goto } from '$app/navigation';

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

	async function handleCreatPlaylist() {
		const name = prompt('Name your playlist: ');
		if (name) {
			const res = await createPlaylist($user.id, filteredTracks, name);
			goto(res.uri);
		}
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
	<button class="border-2 border-black p-1" on:click={handleCreatPlaylist}
		>Export selected as playlist [/]</button
	>
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
	<hr class="my-4" />
	<Accordion title={`${hiddenTracks.length} hidden tracks`}>
		<TrackList tracks={hiddenTracks} />
	</Accordion>
</div>
