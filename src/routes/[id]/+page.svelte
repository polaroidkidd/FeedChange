<script lang="ts">
	import { Accordion, AccordionItem, Avatar, Button, Card, cn, Heading, P } from 'flowbite-svelte';
	import { Confetti } from 'svelte-confetti';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { BabyFedModal, PastEvents } from '$lib/components';
	import { m } from '$lib/paraglide/messages';

	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	let isEventModalOpen = $state(false);
	let isDiaperLoading = $state(false);
	let showDiaperConfetti = $state(false);
	let selectedTimePeriod = $state<'24h' | '7d' | '30d'>('24h');

	// Calculate stats based on selected time period
	function calculateStats() {
		const now = new Date();
		let cutoffDate: Date;

		switch (selectedTimePeriod) {
			case '24h':
				cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
				break;
			case '7d':
				cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
				break;
			case '30d':
				cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
				break;
			default:
				cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
		}

		const filteredEvents = data.events.filter((event) => new Date(event.createdAt) >= cutoffDate);

		const feedingEvents = filteredEvents.filter(
			(event) => event.bottleSize !== null && event.bottleSize > 0
		);

		const diaperEvents = filteredEvents.filter((event) => event.diaperChanged === true);

		const totalConsumed = feedingEvents.reduce(
			(sum, event) => sum + (event.amountConsumed || 0),
			0
		);

		const averageBottleSize =
			feedingEvents.length > 0
				? feedingEvents.reduce((sum, event) => sum + (event.bottleSize || 0), 0) /
					feedingEvents.length
				: 0;

		const emptyBottles = feedingEvents.filter(
			(event) => (event.amountConsumed || 0) >= (event.bottleSize || 0)
		).length;

		const averageLeftover =
			feedingEvents.length > 0
				? feedingEvents.reduce(
						(sum, event) =>
							sum + Math.max(0, (event.bottleSize || 0) - (event.amountConsumed || 0)),
						0
					) / feedingEvents.length
				: 0;

		// Calculate feeding frequency per day
		const daysInPeriod = selectedTimePeriod === '24h' ? 1 : selectedTimePeriod === '7d' ? 7 : 30;
		const feedingFrequency = daysInPeriod > 0 ? feedingEvents.length / daysInPeriod : 0;

		// Calculate efficiency (percentage of bottles that were finished)
		const efficiency = feedingEvents.length > 0 ? (emptyBottles / feedingEvents.length) * 100 : 0;

		// Get last feeding and diaper change times
		const lastFeeding =
			feedingEvents.length > 0 ? feedingEvents[feedingEvents.length - 1].createdAt : null;
		const lastDiaper =
			diaperEvents.length > 0 ? diaperEvents[diaperEvents.length - 1].createdAt : null;

		// Calculate time since last events
		const timeSinceLastFeeding = lastFeeding
			? now.getTime() - new Date(lastFeeding).getTime()
			: null;
		const timeSinceLastDiaper = lastDiaper ? now.getTime() - new Date(lastDiaper).getTime() : null;

		return {
			totalConsumed,
			averageBottleSize: Math.round(averageBottleSize),
			emptyBottles,
			averageLeftover: Math.round(averageLeftover),
			diaperChanges: diaperEvents.length,
			feedingFrequency: Math.round(feedingFrequency * 10) / 10,
			efficiency: Math.round(efficiency),
			timeSinceLastFeeding,
			timeSinceLastDiaper,
			totalFeedings: feedingEvents.length
		};
	}

	let stats = $derived(calculateStats());

	async function handleDiapered() {
		isDiaperLoading = true;
		try {
			const response = await fetch(`/api/baby/${page.params.id}/event`, {
				method: 'POST',
				body: JSON.stringify({
					diaperChanged: true
				})
			});

			if (response.ok) {
				showDiaperConfetti = true;
				// Reset confetti after animation
				setTimeout(() => {
					showDiaperConfetti = false;
				}, 3000);
				invalidateAll();
			}
		} catch (error) {
			console.error('Error creating diaper event:', error);
		} finally {
			isDiaperLoading = false;
		}
	}
</script>

<Card horizontal class={cn('m-3 mx-auto p-3')}>
	<div class={cn('flex w-full flex-col gap-3')}>
		<Avatar src="/baby.svg" class={cn('mx-auto h-30 w-30')} />
		<Heading tag="h5" class={cn('mx-auto')}>
			{data.name}
		</Heading>

		<Accordion flush class="cursor-pointer px-1">
			<AccordionItem class="cursor-pointer">
				{#snippet header()}<span class={cn('mx-auto font-bold')}>
						{m['baby.stats.title']()}
					</span>{/snippet}
				<div class={cn('mt-4 space-y-2')}>
					<div class={cn('space-y-3 text-sm')}>
						<div class={cn('flex items-center justify-between')}>
							<div class={cn('flex items-center gap-2')}>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
									></path>
								</svg>
								<span>{m['baby.stats.totalConsumed']()}:</span>
							</div>
							<span class={cn('font-semibold')}>{stats.totalConsumed}ml</span>
						</div>
						<div class={cn('flex items-center justify-between')}>
							<div class={cn('flex items-center gap-2')}>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
									></path>
								</svg>
								<span>{m['baby.stats.averageBottleSize']()}:</span>
							</div>
							<span class={cn('font-semibold')}>{stats.averageBottleSize}ml</span>
						</div>
						<div class={cn('flex items-center justify-between')}>
							<div class={cn('flex items-center gap-2')}>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M20 12H4"
									></path>
								</svg>
								<span>{m['baby.stats.emptyBottles']()}:</span>
							</div>
							<span class={cn('font-semibold')}>{stats.emptyBottles}</span>
						</div>
						<div class={cn('flex items-center justify-between')}>
							<div class={cn('flex items-center gap-2')}>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								<span>{m['baby.stats.averageLeftover']()}:</span>
							</div>
							<span class={cn('font-semibold')}>{stats.averageLeftover}ml</span>
						</div>
						<div class={cn('flex items-center justify-between')}>
							<div class={cn('flex items-center gap-2')}>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									></path>
								</svg>
								<span>{m['baby.stats.diaperChanges']()}:</span>
							</div>
							<span class={cn('font-semibold')}>{stats.diaperChanges}</span>
						</div>
						<div class={cn('flex items-center justify-between')}>
							<div class={cn('flex items-center gap-2')}>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
									></path>
								</svg>
								<span>{m['baby.stats.feedingFrequency']()}:</span>
							</div>
							<span class={cn('font-semibold')}>
								{stats.feedingFrequency}
							</span>
						</div>

						<div class={cn('flex items-center justify-between')}>
							<div class={cn('flex items-center gap-2')}>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									></path>
								</svg>
								<span>{m['baby.stats.totalFeedings']()}:</span>
							</div>
							<span class={cn('font-semibold')}>{stats.totalFeedings}</span>
						</div>
					</div>
				</div>
				<!-- Time Period Selection -->
				<div class={cn('mt-4 flex justify-center gap-2')}>
					<Button
						size="xs"
						color={selectedTimePeriod === '24h' ? 'primary' : 'light'}
						onclick={() => (selectedTimePeriod = '24h')}
					>
						24h
					</Button>
					<Button
						size="xs"
						color={selectedTimePeriod === '7d' ? 'primary' : 'light'}
						onclick={() => (selectedTimePeriod = '7d')}
					>
						7 days
					</Button>
					<Button
						size="xs"
						color={selectedTimePeriod === '30d' ? 'primary' : 'light'}
						onclick={() => (selectedTimePeriod = '30d')}
					>
						30 days
					</Button>
				</div>
			</AccordionItem>
		</Accordion>
		<!-- Stats Section -->
	</div>
</Card>

<Card horizontal class={cn('m-3 mx-auto p-3')}>
	<div class={cn('flex flex-col gap-3')}>
		<div class={cn('flex justify-around gap-5')}>
			<Button
				class={cn('flex cursor-pointer flex-col items-center gap-4 text-white')}
				onclick={() => (isEventModalOpen = true)}
				size="lg"
			>
				<img src="bottle.svg" alt="bottle" />
				<P size="sm" class={cn('text-center text-white ')}>
					{m['baby.actions.fed.create']({ name: data.name })}
				</P>
			</Button>
			<Button
				class={cn('flex cursor-pointer flex-col items-center gap-4')}
				onclick={handleDiapered}
				disabled={isDiaperLoading}
				size="lg"
			>
				{#if isDiaperLoading}
					<div class="flex items-center gap-2">
						<div
							class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></div>
						<img src="diaper.svg" alt="diaper" />
					</div>
				{:else}
					<img src="diaper.svg" alt="diaper" />
				{/if}
				<P size="sm" class={cn('text-center text-white ')}>
					{m['baby.actions.diapered.create']({ name: data.name })}
				</P>
			</Button>
			{#if showDiaperConfetti}
				<div class="absolute">
					<Confetti cone x={[-1, -0.25]} colorRange={[100, 200]} />
					<Confetti cone x={[-0.35, 0.35]} delay={[500, 550]} colorRange={[200, 300]} />
					<Confetti cone x={[0.25, 1]} delay={[250, 300]} colorRange={[100, 200]} />
					<Confetti
						cone
						amount={20}
						x={[-1, 1]}
						y={[0, 1]}
						delay={[0, 550]}
						colorRange={[200, 300]}
					/>
				</div>
			{/if}
		</div>
	</div>
</Card>

<PastEvents events={data.events} babyName={data.name} />

<BabyFedModal
	bind:isOpen={isEventModalOpen}
	currentBottleSize={data.currentBottleSize}
	babyName={data.name}
/>
