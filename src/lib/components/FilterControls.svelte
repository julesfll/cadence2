<script lang="ts">
	import '../../app.css';
	import RangeSlider from 'svelte-range-slider-pips';
	import { createTempoFilter } from '$lib/utils';
	import { trackFilter } from '$lib/stores';
	import TempoTapper from './TempoTapper.svelte';

	const initialBpms = [170, 190];
	const tapperRange = 10;

	let tapperBpm = (initialBpms[0] + initialBpms[1]) / 2;
	let bpms = initialBpms;
	let allowHalftime = true;

	function resetSlider() {
		bpms = initialBpms;
		allowHalftime = true;
	}

	$: $trackFilter = createTempoFilter(bpms[0], bpms[1], allowHalftime);
	$: bpms = [tapperBpm - tapperRange, tapperBpm + tapperRange];
</script>

<div class="p-2">
	<RangeSlider
		min={100}
		max={200}
		float
		range
		pushy
		pips
		first="label"
		last="label"
		bind:values={bpms}
	/>
	<button class="p-2 text-sm" on:click={resetSlider}>R</button>
	<input type="number" class="text-sm p-1 w-12" bind:value={bpms[0]}>
	<input type="number" class="text-sm p-1 w-12" bind:value={bpms[1]}>
	<TempoTapper bind:bpm={tapperBpm} />
	<label class="text-sm">
		<input type="checkbox" bind:checked={allowHalftime} />
		Allow halftime
	</label>
	<div />
</div>
