<script lang="ts">
	import { Button, Card, cn, Heading, P } from 'flowbite-svelte';

	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';

	interface Event {
		id: string;
		createdAt: Date;
		diaperChanged: boolean | null;
		bottleSize: number | null;
		amountConsumed: number | null;
	}

	interface Props {
		events: Event[];
		babyName: string;
	}

	let { events = $bindable<Event[]>([]), babyName }: Props = $props();
	let loading = $state(false);
	let hasMore = $state(true);
	// Sort events from most recent to oldest
	const sortedEvents = $derived(
		[...events].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
	);

	function getTimeAgo(date: Date): { hours: number; minutes: number } {
		const now = new Date();
		const eventDate = new Date(date);
		const diffTime = Math.abs(now.getTime() - eventDate.getTime());
		const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
		const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
		return { hours: diffHours, minutes: diffMinutes };
	}

	function formatEventTitle(event: Event): string {
		if (event.diaperChanged) {
			return m['baby.actions.diapered.hasBeen']({ name: babyName });
		} else if (event.amountConsumed && event.amountConsumed > 0) {
			return `${m['baby.actions.fed.hasBeen']({ name: babyName })}`;
		}
		return 'Event';
	}

	function getEventIcon(event: Event): string {
		if (event.diaperChanged) {
			return 'diaper.svg';
		} else if (event.amountConsumed && event.amountConsumed > 0) {
			return 'bottle.svg';
		}
		return 'baby.svg';
	}

	function formatEventDescription(event: Event) {
		return `${m['baby.actions.fed.drank']({ amount: event.amountConsumed, bottleSize: event.bottleSize })}`;
	}

	async function fetchAllEvents() {
		loading = true;
		const response = await fetch(`/api/baby/${page.params.id}/event`);
		const data = await response.json();
		events = data;
		loading = false;
		hasMore = false;
	}
</script>

<Card horizontal class={cn('m-3 mx-auto p-3')}>
	<div class={cn('flex w-full flex-col gap-3')}>
		<Heading tag="h5" class={cn('mx-auto')}>
			{m['time.past.entries']()}
		</Heading>

		{#if sortedEvents.length === 0}
			<Heading tag="h6" class={cn('mx-auto text-gray-500')}>
				{m['time.noEntries']()}
			</Heading>
		{:else}
			<div class={cn('flex flex-col gap-2')}>
				{#each sortedEvents as event (event.id)}
					<hr class="w-full border-gray-200" />
					<div class={cn('flex items-center gap-3 p-2')}>
						<img src={getEventIcon(event)} alt="event icon" class={cn('h-6 w-6')} />
						<div class={cn('flex flex-1 flex-col gap-2')}>
							<P class={cn('font-medium')}>
								{formatEventTitle(event)}
							</P>
							{#if event.amountConsumed && event.amountConsumed > 0}
								<P>
									{formatEventDescription(event)}
								</P>
							{/if}
							<P class={cn('text-sm text-gray-500')}>
								{m['time.past.hoursAndMinutes']({
									hours: getTimeAgo(event.createdAt).hours,
									minutes: getTimeAgo(event.createdAt).minutes
								})}
							</P>
						</div>
					</div>
				{/each}
				{#if hasMore}
					<Button onclick={fetchAllEvents} disabled={loading} class={cn('mx-auto')}>
						{m['time.past.loadMore']()}
					</Button>
				{:else}
					<P class={cn('text-center text-gray-500')}>
						{m['time.past.noMoreEntries']()}
					</P>
				{/if}
			</div>
		{/if}
	</div>
</Card>
