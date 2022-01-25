<script lang="ts">
	import '../../app.css';
	import { selectedTracks, user } from '$lib/stores';
	import TrackList from './TrackList.svelte';
	import { createPlaylist } from '$lib/api';
	import { goto } from '$app/navigation';

	let playlistName = '';
	async function handleCreatePlaylist() {
		if (playlistName) {
			const res = await createPlaylist($user.id, $selectedTracks, playlistName);
			goto(res.uri);
		}
	}
</script>

<div class="p-2">
	{#if $user}
		<a href="/profile">
			<h2 class="mb-2">
				Hello <span class="underline">{$user.display_name}</span>
			</h2>
		</a>
	{/if}
	<div />
	{$selectedTracks.length} tracks selected
	<TrackList tracks={$selectedTracks} />
	<input bind:value={playlistName} class="border-2 border-black p-1" type="text" placeholder="Name your playlist..." />
	<button class="border-2 border-black p-1" on:click={handleCreatePlaylist}
		>Export selected as playlist [/]</button
	>
</div>
