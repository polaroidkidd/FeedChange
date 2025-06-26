<script lang="ts">
	import { Alert, cn, Heading, P } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { fly } from 'svelte/transition';

	import { m } from '$lib/paraglide/messages.js';
	type Props = {
		isOpen: boolean;
	};

	let { isOpen = $bindable(false) }: Props = $props();
</script>

{#if isOpen}
	<Alert dismissable transition={fly} class={cn('fixed bottom-10 left-1/2 -translate-x-1/2')}>
		{#snippet icon()}<InfoCircleSolid class="h-5 w-5" />{/snippet}
		<Heading tag="h6">{m['app.error.title']()}</Heading>
		<P>
			{m['app.error.body']()}
		</P>
	</Alert>
{/if}
