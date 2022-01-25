<script lang="ts">
	import PlaylistList from './PlaylistList.svelte';
	import { getUserPlaylists } from '$lib/api';
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';

	let playlists: SpotifyApi.PlaylistObjectSimplified[] = [];

	onMount(async () => {
		playlists = await getUserPlaylists();
	});
</script>

<h2 class="text-xl">Library</h2>
<ul class="space-y-3">
	<li class="hover:bg-gray-200">
		<a href="/playlists/saved">
			<div class="flex">
				<img class="h-16" src="" alt="Saved tracks" />
				<div class="p-2">
					<h3>Liked Songs</h3>
					<p>
						{$user.display_name}
					</p>
				</div>
			</div>
		</a>
	</li>
	<PlaylistList {playlists} />
</ul>
