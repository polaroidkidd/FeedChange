<script lang="ts">
	import { Card, cn, Heading, P } from 'flowbite-svelte';

	import { m } from '$lib/paraglide/messages';
	import { getTemporalState } from '$lib/stores';

	const temporalState = getTemporalState();

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
	// Sort events from most recent to oldest

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
	function formatEventTime(event: Event) {
		const { days, hours, minutes } = temporalState.timeAgo(event.createdAt);

		return m['time.past.ago']({
			days: days,
			hours,
			minutes
		});
	}

	function formatEventDescription(event: Event) {
		return `${m['baby.actions.fed.drank']({ amount: event.amountConsumed!, bottleSize: event.bottleSize! })}`;
	}
</script>

<Card horizontal class={cn('m-3 mx-auto p-3')}>
	<div class={cn('flex w-full flex-col gap-3')}>
		<Heading tag="h5" class={cn('mx-auto')}>
			{m['time.past.entries']()}
		</Heading>

		{#if events.length === 0}
			<Heading tag="h6" class={cn('mx-auto text-gray-500')}>
				{m['time.noEntries']()}
			</Heading>
		{:else}
			<div class={cn('flex flex-col gap-2')}>
				{#each events.slice(0, 10) as event (event.id)}
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
								{formatEventTime(event)}
							</P>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</Card>
