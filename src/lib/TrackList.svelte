<script lang="ts">
	import Track from '$lib/Track.svelte';
	export let tracks: SpotifyApi.TrackObjectFull[] = [];
</script>

	<ul class="space-y-2">
		{#each tracks as track}
			<li>
				<Track {track} />
			</li>
		{/each}
	</ul>

