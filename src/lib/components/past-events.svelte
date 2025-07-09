<script lang="ts">
	import { Card, cn, Heading, P, Toast } from 'flowbite-svelte';
	import { BadgeCheckSolid, TrashBinOutline } from 'flowbite-svelte-icons';

	import { page } from '$app/stores';
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
	let sortedEvents = $derived(
		events.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10)
	);
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

	async function deleteEvent(event: Event) {
		try {
			const response = await fetch(`/api/baby/${$page.params.id}/event/${event.id}`, {
				method: 'DELETE'
			});
			if (response.ok) {
				const data = await response.json();
				sortedEvents = events
					.filter((event) => event.id !== data.id)
					.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
				toastStatus = true;
			}
		} catch (error) {
			console.error('Error deleting event: ', error);
		}
	}

	let toastStatus = $state(false);
	$effect(() => {
		if (toastStatus) {
			setTimeout(() => {
				toastStatus = false;
			}, 3000);
		}
	});
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
								{formatEventTime(event)}
							</P>
						</div>
						{#key event.id}
							<TrashBinOutline
								class={cn('cursor-pointer dark:text-gray-500 dark:hover:text-gray-200')}
								onclick={() => deleteEvent(event)}
							/>
						{/key}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</Card>
<Toast
	color="green"
	align
	class={cn('fixed bottom-1 left-1/2 -translate-1/2 border-[1px] border-gray-700 ')}
	dismissable={true}
	params={{ amount: 10 }}
	bind:toastStatus
>
	{#snippet icon()}
		<BadgeCheckSolid class={cn('dark:text-gray-200')} size="lg" />
	{/snippet}
	<P class={cn('text-sm font-normal')}>Event deleted</P>
</Toast>
