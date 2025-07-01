<script lang="ts">
	import '../app.css';

	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { cn } from 'flowbite-svelte';

	import { NavBar } from '$lib/components';

	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>FeedChange - Simple Baby Feeding & Diaper Tracking</title>
	<meta
		name="description"
		content="Track your baby's feeding and diaper changes with complete privacy. No email required, no tracking, accounts auto-delete after 7 days."
	/>
</svelte:head>
<NavBar />
<div class={cn('container mx-auto p-3')}>
	<div class="bg-gradient"></div>
	<div class="bg-grid"></div>
	<QueryClientProvider client={data.queryClient}>
		{@render children()}
	</QueryClientProvider>
</div>
