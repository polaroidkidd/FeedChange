<script lang="ts">
	import { Button, cn, Input, Label, Modal } from 'flowbite-svelte';
	import { ArrowsRepeatOutline } from 'flowbite-svelte-icons';
	import { names, uniqueNamesGenerator } from 'unique-names-generator';

	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages.js';
	type Props = {
		isOpen: boolean;
		hasError: boolean;
	};

	let { isOpen = $bindable(false), hasError = $bindable(false) }: Props = $props();

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
	function generateName() {
		return uniqueNamesGenerator({
			dictionaries: [names]
		});
	}

	let form = $state<{
		name: string | undefined;
		weight: number | undefined;
		currentBottleSize: number | undefined;
	}>({
		name: undefined,
		weight: undefined,
		currentBottleSize: undefined
	});
	let placeHolderName = $state(generateName());
	async function createBaby() {
		const response = await fetch('/api/baby', {
			method: 'POST',
			body: JSON.stringify({
				name: form.name ?? placeHolderName,
				weight: form.weight ?? 3000,
				currentBottleSize: form.currentBottleSize ?? 60
			})
		});
		isOpen = false;
		if (response.ok) {
			const data = await response.json();
			goto(`/${data.id}`);
		} else {
			hasError = true;
		}
	}
</script>

<Modal
	placement="top-center"
	bind:open={isOpen}
	onclose={() => {
		placeHolderName = generateName();
	}}
	size="xs"
	class="mt-10 w-19/20"
>
	<div class={cn('flex items-end  justify-center gap-4')}>
		<div class={cn('flex w-full flex-col gap-2')}>
			<Label class={cn('ml-2')} for="name">{m['baby.create.name']()}</Label>
			<Input
				placeholder={generateName()}
				bind:value={form.name}
				id="name"
				autocomplete={undefined}
			/>
		</div>

		<Button
			type="button"
			class={cn('cursor-pointer')}
			onclick={(e: Event) => {
				e.preventDefault();

				form.name = generateName();
			}}
		>
			<ArrowsRepeatOutline />
		</Button>
	</div>
	<div class={cn('flex w-full flex-col gap-2')}>
		<Label class={cn('ml-2')} for="weight">{m['baby.create.weight']()}</Label>
		<Input placeholder="2050" bind:value={form.weight} type="number" id="weight" />
	</div>

	<div class={cn('flex w-full flex-col gap-2')}>
		<Label class={cn('ml-2')} for="bottleSize">{m['baby.actions.fed.amount']()}</Label>
		<Input placeholder="200" type="number" bind:value={form.currentBottleSize} id="bottleSize" />
	</div>

	{#snippet footer()}
		<div class={cn('flex w-full justify-end gap-4')}>
			<Button class={cn('mr-auto cursor-pointer')} color="alternative">{m['app.cancel']()}</Button>
			<Button class={cn('cursor-pointer')} onclick={createBaby}>{m['app.save']()}</Button>
		</div>
	{/snippet}
</Modal>
