<script lang="ts">
	import '../../app.css';
	import { selectedTracks, user } from '$lib/stores';
	import TrackList from './TrackList.svelte';
	import { createPlaylist } from '$lib/api';
	import { goto } from '$app/navigation';

	async function handleCreatePlaylist() {
		const name = prompt('Name your playlist: ');
		if (name) {
			const res = await createPlaylist($user.id, $selectedTracks, name);
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
	<button class="border-2 border-black p-1" on:click={handleCreatePlaylist}
		>Export selected as playlist [/]</button
	>
	<div />
	<TrackList tracks={$selectedTracks} />
</div>
