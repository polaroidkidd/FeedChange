<script lang="ts">
	import { Button, cn, Modal, P, Range } from 'flowbite-svelte';
	import { Confetti } from 'svelte-confetti';

	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { BabyBottle } from '$lib/components';
	import { m } from '$lib/paraglide/messages.js';

	type Props = {
		isOpen: boolean;
		currentBottleSize: number;
		babyName: string;
	};

	let {
		isOpen = $bindable(false),
		currentBottleSize = $bindable(0),
		babyName = $bindable('')
	}: Props = $props();

	let form = $state({
		amountConsumed: 0,
		todayBottleSize: currentBottleSize
	});

	let showConfetti = $state(false);
	let isLoading = $state(false);

	async function createEvent() {
		isLoading = true;
		try {
			const response = await fetch(page.url.pathname, {
				method: 'POST',
				body: JSON.stringify({
					amountConsumed: form.amountConsumed,
					bottleSize: form.todayBottleSize
				})
			});

			if (response.ok) {
				isOpen = false;
				// Reset form
				form.amountConsumed = 0;
				form.todayBottleSize = currentBottleSize;
				invalidateAll();
			}
		} catch (error) {
			console.error('Error creating event:', error);
		} finally {
			isLoading = false;
		}
	}

	function handleClose() {
		if (isLoading) return; // Prevent closing while loading

		// Reset form when closing
		form.amountConsumed = 0;
		form.todayBottleSize = currentBottleSize;
	}

	function adjustBottleSize(amount: number) {
		if (isLoading) return; // Prevent adjustments while loading
		form.todayBottleSize = Math.max(0, form.todayBottleSize + amount);
	}

	// Watch for when the slider reaches zero and trigger confetti
	$effect(() => {
		if (form.amountConsumed === form.todayBottleSize && form.todayBottleSize > 0) {
			showConfetti = true;
			// Reset confetti after animation
			setTimeout(() => {
				showConfetti = false;
			}, 3000);
		}
	});

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<Modal
	headerClass="*:mx-auto w-full"
	title={m['baby.actions.fed.feeding']({ name: babyName })}
	bind:open={isOpen}
	onclose={handleClose}
	size="sm"
	class="mt-10  w-19/20"
	placement="top-center"
>
	<div class={cn('flex  justify-center')}>
		<div class={cn('grid auto-cols-min grid-cols-1 items-center justify-items-center gap-4')}>
			<P class="text-center">
				<span class="font-bold-500">
					{m['baby.create.currentBottleSize']()}:
				</span>
				<span>
					{form.todayBottleSize}
				</span>
			</P>

			<div class="mb-4 flex gap-2">
				<Button
					size="sm"
					outline
					pill
					color="emerald"
					onclick={() => adjustBottleSize(-10)}
					disabled={isLoading}
				>
					-10 ml
				</Button>
				<Button
					size="sm"
					outline
					pill
					color="emerald"
					onclick={() => adjustBottleSize(-5)}
					disabled={isLoading}
				>
					-5 ml
				</Button>
				<Button
					size="sm"
					outline
					pill
					color="emerald"
					onclick={() => adjustBottleSize(5)}
					disabled={isLoading}
				>
					+5 ml
				</Button>
				<Button
					size="sm"
					outline
					pill
					color="emerald"
					onclick={() => adjustBottleSize(10)}
					disabled={isLoading}
				>
					+10 ml
				</Button>
			</div>
			<hr class="w-full border-gray-400" />
			<div class=" relative h-44 w-16">
				<BabyBottle
					maxAmount={form.todayBottleSize}
					remainingAmount={form.todayBottleSize - form.amountConsumed}
					class="absolute top-0 left-1/2 h-48 -translate-x-1/2  "
				/>

				<input
					type="range"
					bind:value={form.amountConsumed}
					class={cn(
						'hide-range',
						'absolute top-16 left-1/2 -translate-x-1/2',
						'h-6/10 w-full',
						'cursor-pointer',
						'touch-none'
					)}
					min={0}
					max={form.todayBottleSize}
					step={1}
					disabled={isLoading}
				/>

				{#if showConfetti}
					<Confetti amount={100} />
				{/if}
			</div>
			<Range
				min={0}
				max={form.todayBottleSize}
				step={1}
				bind:value={form.amountConsumed}
				disabled={isLoading}
			/>
			<P class="text-center">
				<span class="font-bold-500">
					{m['baby.actions.fed.amount']()}:
				</span>
				<span class="font-black text-emerald-500">
					{form.amountConsumed} / {form.todayBottleSize} ml
				</span>
			</P>
		</div>
	</div>
	{#snippet footer()}
		<div class={cn('flex w-full justify-end gap-4')}>
			<Button
				class={cn('mr-auto cursor-pointer')}
				color="alternative"
				onclick={handleClose}
				disabled={isLoading}
			>
				{m['app.cancel']()}
			</Button>
			<Button
				class={cn('cursor-pointer disabled:cursor-not-allowed')}
				onclick={createEvent}
				disabled={isLoading || form.amountConsumed === 0}
			>
				{#if isLoading}
					<div class="flex items-center gap-2">
						<div
							class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></div>
						{m['app.save']()}
					</div>
				{:else}
					{m['app.save']()}
				{/if}
			</Button>
		</div>
	{/snippet}
</Modal>

<style lang="scss">
	.hide-range {
		writing-mode: vertical-rl;
		opacity: 0;
		pointer-events: auto;

		// Hide the track completely
		&::-webkit-slider-track {
			background: transparent !important;
			border: none !important;
			height: 0 !important;
		}

		&::-moz-range-track {
			background: transparent !important;
			border: none !important;
			height: 0 !important;
		}

		&::-ms-track {
			background: transparent !important;
			border: none !important;
			height: 0 !important;
		}

		// Hide the thumb completely
		&::-webkit-slider-thumb {
			appearance: none !important;
			-webkit-appearance: none !important;
			background: transparent !important;
			border: none !important;
			width: 0 !important;
			height: 0 !important;
			opacity: 0 !important;
		}

		&::-moz-range-thumb {
			background: transparent !important;
			border: none !important;
			width: 0 !important;
			height: 0 !important;
			opacity: 0 !important;
		}

		&::-ms-thumb {
			background: transparent !important;
			border: none !important;
			width: 0 !important;
			height: 0 !important;
			opacity: 0 !important;
		}

		// Additional Chrome-specific hiding
		&::-webkit-slider-runnable-track {
			background: transparent !important;
			border: none !important;
			height: 0 !important;
		}
	}
</style>
