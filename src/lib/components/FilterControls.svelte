<script lang="ts">
	import '../../app.css';
	import RangeSlider from 'svelte-range-slider-pips';
	import { createTempoFilter } from '$lib/utils';
	import { trackFilter } from '$lib/stores';

	// TODO: store tempoFilter(bpm[0], bpm[1], allowHafltime) in sveltestore
	//      track display items can use this filter with fitlerBpm to show and hide tracks
	let bpms = [170, 190];
	let allowHalftime = true;

	$: $trackFilter = createTempoFilter(bpms[0], bpms[1], allowHalftime);
</script>

<div class="p-2">
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
</div>
