<script lang="ts">
	export let bpm = 0;
	let times: number[] = [];
	const rollingWindowSize = 8;

	function updateTempo() {
		times = [...times, Date.now()];
		if (times.length > rollingWindowSize) times.shift();
		// https://stackoverflow.com/questions/30399123/finding-difference-between-consecutive-numbers-in-an-array-in-javascript/30399727
		const deltas = times.slice(1).map((n, i) => n - times[i]);
		// https://stackoverflow.com/questions/29544371/finding-the-average-of-an-array-using-js
		const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;
		const averageDelta = average(deltas);
		bpm = Math.round(60000 / averageDelta);
	}
</script>

<button on:click={updateTempo} class="border-2 border-black py-1 px-3 text-sm active:bg-gray-300">Tap a beat</button>
