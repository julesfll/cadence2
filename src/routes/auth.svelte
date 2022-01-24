<script lang="ts">
	import { checkState, requestAccessToken } from '$lib/login';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		checkState(urlParams.get('state'));
		requestAccessToken(urlParams.get('code'));

		goto('/');
	});
</script>

test
