<script lang="ts">
	import { selectedTracks } from './stores';

	export let track: SpotifyApi.TrackObjectFull;

	function addTrack() {
		$selectedTracks = [...$selectedTracks, track];
	}
</script>

<div class="flex items-center">
	<div class="flex grow">
		<img
			src={track.album.images[track.album.images.length - 1].url}
			alt="{track.album.name} cover"
		/>
		<div class="p-2">
			<h3>
				{track.name}
			</h3>
			<p class="text-sm text-gray-500">
				{#if track.explicit}
					<span class="text-black bg-gray-300 text-xs py-1 px-2">E</span>
				{/if}
					{track.artists.map((artist) => artist.name).join(', ')}
			</p>
		</div>
	</div>
	<button on:click={addTrack} class="border-2 border-black py-0 px-2"> + </button>
</div>
