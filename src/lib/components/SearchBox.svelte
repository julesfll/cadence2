<script lang="ts">
	import { goto } from '$app/navigation';

	let query = '';
	async function handleSubmit() {
		goto(`/search?q=${encodeURIComponent(query)}`);
	}
</script>

Search for anything
<form on:submit|preventDefault={handleSubmit}>
	<input
		bind:value={query}
		class="border-2 border-black p-2"
		type="text"
		placeholder="Type something"
	/>
	<button class="border-2 border-black p-2" type="submit">Search</button>
</form>
