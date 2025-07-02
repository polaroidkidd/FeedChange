<script lang="ts">
	import { Button, Label, Modal, Timepicker } from 'flowbite-svelte';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';

	import type { Event } from './past-events.svelte';

	type Props = {
		isOpen: boolean;
		event: Event | null;
	};

	let { isOpen = $bindable(false), event }: Props = $props();
	async function deleteEvent() {
		const response = await fetch(`${page.url.pathname}/event/${event?.id}`, {
			method: 'DELETE'
		});
		if (response.ok) {
			isOpen = false;
			invalidateAll();
		}
	}

	let selectedTime = $state(
		new Date(event?.createdAt ?? new Date()).toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		})
	);
	$inspect(selectedTime);
</script>

<Modal bind:open={isOpen} headerClass="*:mx-auto w-full">
	<Button onclick={deleteEvent}>Delete Event</Button>
	<h1>Edit Event</h1>
	<pre>{JSON.stringify(event, null, 2)}</pre>
	<Label>Select Time: {selectedTime}</Label>
	<Timepicker bind:value={selectedTime} />
</Modal>
