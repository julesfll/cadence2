<script lang="ts">
	import Search from '$lib/Search.svelte';

	import { initiateSpotifyLogin } from '$lib/login';
	import { user } from '$lib/stores';

	function handleClick() {
		initiateSpotifyLogin();
	}
</script>

<h1 class="text-3xl mbr-2">Cadence</h1>
{#if !$user}
	<button class="border-2 border-black p-2" on:click={handleClick}>Login with Spotify</button>
{:else}
	<Search />
{/if}
