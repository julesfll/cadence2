<script lang="ts">
	export let playlist: SpotifyApi.PlaylistObjectSimplified;
</script>

<a href={'/playlists/' + playlist.id}>
	<div class="flex">
		<img
			class="h-16"
			src={playlist.images[playlist.images.length - 1].url}
			alt={playlist.name + ' cover'}
		/>
		<div class="p-2">
			<h3>
				{playlist.name}
			</h3>
			<p>
				{playlist.owner.display_name}
			</p>
		</div>
	</div>
</a>
