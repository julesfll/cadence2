<!-- https://svelte.dev/repl/74ff0da7cb074d4788b996e2d91258d3?version=3.23.0 -->
<script lang="ts">
	import { slide } from 'svelte/transition';
	export let title: string;

	let isOpen = false;
	function toggle() {
		isOpen = !isOpen;
	}
</script>

<button on:click={toggle} aria-expanded={isOpen}>> {title}</button>
{#if isOpen}
	<div transition:slide={{ duration: 300 }}>
		<slot />
	</div>
{/if}
