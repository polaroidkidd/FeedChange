<script lang="ts">
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { Card, cn, Heading, P } from 'flowbite-svelte';

	import { m } from '$lib/paraglide/messages';
	import { getTemporalState } from '$lib/stores';

	dayjs.extend(relativeTime);
	const temporalState = getTemporalState();
	console.info('temporalState: ', temporalState);

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

	function getTimeAgoDayjs(date: Date): { hours: number; minutes: number } {
		const now = dayjs();
		const eventDate = dayjs(date);
		console.info('now: ', now);
		console.info('eventDate: ', eventDate);
		console.info('date: ', date);
		console.info('eventDate.fromNow(): ', eventDate.fromNow());
	}

	function getTimeAgo(date: Date): { hours: number; minutes: number } {
		getTimeAgoDayjs(date);
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
				{#each events as event (event.id)}
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
			</div>
		{/if}
	</div>
</Card>
