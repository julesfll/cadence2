<script lang="ts">
	import '../../app.css';
	import RangeSlider from 'svelte-range-slider-pips';
	import { createTempoFilter } from '$lib/utils';
	import { trackFilter } from '$lib/stores';

	const initialBpms = [170, 190];

	let bpms = initialBpms;
	let allowHalftime = true;

	function resetSlider() {
		bpms = initialBpms;
		allowHalftime = true;
	}

	$: $trackFilter = createTempoFilter(bpms[0], bpms[1], allowHalftime);
</script>

<div class="p-2">
	<button on:click={resetSlider}>R</button>
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
