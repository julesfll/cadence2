<script lang="ts">
	import { getUserPlaylists } from '$lib/api';

	import { onMount } from 'svelte';
	let playlists: SpotifyApi.PlaylistObjectFull[] = [];

	onMount(async () => {
		playlists = await getUserPlaylists();
	});
</script>

<h2 class="text-xl">Library</h2>
<ul>
	<li>
		<a href="/playlist/saved">Saved</a>
	</li>
	{#each playlists as playlist}
		<li>
			<a href={'/playlist/' + playlist.id}> {playlist.name} </a>
		</li>
	{/each}
</ul>
