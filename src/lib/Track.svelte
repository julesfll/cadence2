<script lang="ts">
	import { selectedTracks } from './stores';
	import type { TrackWithTempo } from './types';

	export let track: TrackWithTempo;

	function addTrack() {
		$selectedTracks = [...$selectedTracks, track];
	}

	function removeTrack() {
		$selectedTracks = $selectedTracks.filter((trackInList) => trackInList !== track);
	}
</script>

<div class="flex items-center">
	<div class="flex grow">
		<img
			src={track.album.images[track.album.images.length - 1].url}
			alt="{track.album.name} cover"
		/>
		<div class="p-2">
			<!-- TODO: truncate with ellipsis to ensure album cover is square -->
			<h3>
				{track.name}
			</h3>
			<p class="text-sm text-gray-500">
				{#if track.explicit}
					<span class="text-black bg-gray-300 text-xs py-1 px-2">E</span>
				{/if}
				{track.artists.map((artist) => artist.name).join(', ')}
				{track.tempo}
			</p>
		</div>
	</div>
	{#if $selectedTracks.includes(track)}
		<button on:click={removeTrack} class="bg-red-500 border-2 border-black py-0 px-2">-</button>
	{:else}
		<button on:click={addTrack} class="border-2 border-black py-0 px-2"> + </button>
	{/if}
</div>
