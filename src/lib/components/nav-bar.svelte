<script lang="ts">
	import dayjs from 'dayjs';
	import de from 'dayjs/locale/de';
	import en from 'dayjs/locale/en';
	import { cn, DarkMode, Dropdown, DropdownItem, Navbar, NavBrand } from 'flowbite-svelte';
	import { ChevronDownOutline, ChevronRightOutline, LanguageOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	import { getLocale, setLocale } from '$lib/paraglide/runtime';

	let currentLocale = $state(getLocale());

	let isOpen = $state(false);

	onMount(() => {
		dayjs.locale(currentLocale === 'en' ? en : de);
	});

	function updateLocale(locale: 'en' | 'de-ch') {
		setLocale(locale);
		currentLocale = locale;
		isOpen = false;
		dayjs.locale(locale === 'en' ? en : de);
	}
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
		<DropdownItem onclick={() => updateLocale('en')}>
			<div class={cn('flex w-9 cursor-pointer')}>
				{#if currentLocale === 'en'}
					<ChevronRightOutline />
				{/if}
				<span class={cn('ml-auto')}>EN</span>
			</div>
		</DropdownItem>
		<DropdownItem onclick={() => updateLocale('de-ch')}>
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
