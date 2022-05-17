<script lang="ts">
	import Library from '$lib/components/Library.svelte';

	import { initiateSpotifyLogin } from '$lib/login';
	import { user } from '$lib/stores';

	function handleClick() {
		initiateSpotifyLogin();
	}
</script>

{#if !$user}
	<h2>Your perfect running playlist is here.</h2>
	<button class="border-2 border-black p-2" on:click={handleClick}>Login with Spotify</button>
{:else}
	<Library />
{/if}
