<script lang="ts">
	import { cn, DarkMode, Dropdown, DropdownItem, Navbar, NavBrand } from 'flowbite-svelte';
	import { ChevronDownOutline, ChevronRightOutline, LanguageOutline } from 'flowbite-svelte-icons';

	import { getLocale, setLocale } from '$lib/paraglide/runtime';

	let currentLocale = $state(getLocale());

	let isOpen = $state(false);
</script>

<Navbar>
	<NavBrand href="/">
		<img src="/baby.svg" class="me-3 h-6 sm:h-9" alt="FeedChange Logo" />

		<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
			FeedChange
		</span>
	</NavBrand>

	<button class={cn('relative  ml-auto cursor-pointer')} onclick={() => (isOpen = !isOpen)}>
		<LanguageOutline class={cn('h-10 w-10 dark:text-white ')} />
		<ChevronDownOutline class="absolute -bottom-2 left-0 dark:text-white" />
	</button>
	<Dropdown simple bind:isOpen>
		<DropdownItem onclick={() => setLocale('en')}>
			<div class={cn('flex w-9 cursor-pointer')}>
				{#if currentLocale === 'en'}
					<ChevronRightOutline />
				{/if}
				<span class={cn('ml-auto')}>EN</span>
			</div>
		</DropdownItem>
		<DropdownItem onclick={() => setLocale('de-ch')}>
			<div class={cn('flex w-9 cursor-pointer')}>
				{#if currentLocale === 'de-ch'}
					<ChevronRightOutline />
				{/if}
				<span class={cn('ml-auto')}>DE</span>
			</div>
		</DropdownItem>
	</Dropdown>
	<DarkMode class="cursor-pointer" />
</Navbar>
