<script lang="ts">
	import PlaylistItem from './PlaylistItem.svelte';

	export let playlists: SpotifyApi.PlaylistObjectSimplified[] = [];
</script>

<ul class="space-y-3">
	{#each playlists as playlist}
		<li class="hover:bg-gray-200">
			<PlaylistItem {playlist} />
		</li>
	{/each}
</ul>
