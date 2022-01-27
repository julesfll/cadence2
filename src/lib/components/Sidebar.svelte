<script lang="ts">
	import '../../app.css';
	import { selectedTracks, user } from '$lib/stores';
	import TrackList from './TrackList.svelte';
	import { addTracksToPlaylist, createPlaylist, getUserPlaylists } from '$lib/api';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let userEditablePlaylists: SpotifyApi.PlaylistObjectSimplified[] = [];
	let selectedAddPlaylistId = '';
	let removeDuplicates = true;

	async function handleCreatePlaylist() {
		if (selectedAddPlaylistId === 'new') {
			createNewPlaylist();
		} else if (selectedAddPlaylistId !== '') {
			addTracksToPlaylist(selectedAddPlaylistId, $selectedTracks, removeDuplicates);
			goto('spotify:playlist:' + selectedAddPlaylistId);
		}
		selectedAddPlaylistId = '';
	}

	async function createNewPlaylist() {
		const playlistName = prompt('Name your playlist: ');

		if (playlistName) {
			const res = await createPlaylist($user.id, $selectedTracks, playlistName);
			console.log(res);
			goto(res.uri);
		}
	}

	function clearAll() {
		// TODO: add confirmation modal
		$selectedTracks = [];
	}

	onMount(async () => {
		const playlists = await getUserPlaylists();
		userEditablePlaylists = playlists.filter(
			(playlist) => playlist.owner.id === $user.id || playlist.collaborative
		);
	});
</script>

<div class="p-2">
	<nav class="space-y-2 flex flex-col">
		<a href="/search" class="bg-gray-200 hover:bg-gray-400 p-2">Search</a>
		<a href="/" class="bg-gray-200 hover:bg-gray-400 p-2">Library</a>
	</nav>
	<select class="p-2 mt-4" name="playlistSelection" bind:value={selectedAddPlaylistId}>
		<option value="" disabled selected>Select a playlist</option>
		<option value="new">New playlist...</option>
		{#each userEditablePlaylists as playlist}
			<option value={playlist.id}>{playlist.name}</option>
		{/each}
	</select>
	<button class="bg-gray-400 p-2" on:click={handleCreatePlaylist} disabled={!selectedAddPlaylistId}
		>+</button
	>
	<div>
		<label class="text-sm"
			>Remove duplicates
			<input type="checkbox" checked bind:value={removeDuplicates} />
		</label>
	</div>
	<div class="flex justify-between">
		<p>{$selectedTracks.length} tracks selected</p>
		<button on:click={clearAll}>T</button>
	</div>
	<TrackList tracks={$selectedTracks} />
</div>
