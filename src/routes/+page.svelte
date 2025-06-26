<script lang="ts">
	import { Badge, Button, Card, cn, Heading, P } from 'flowbite-svelte';
	import {
		CheckCircleOutline,
		EyeSlashOutline,
		GithubSolid,
		ShieldCheckOutline,
		TrashBinOutline
	} from 'flowbite-svelte-icons';

	import { NewBabyModal } from '$lib/components';
	import Alert from '$lib/components/alert.svelte';
	import { m } from '$lib/paraglide/messages.js';

	let isOpen = $state(false);
	function onclick() {
		isOpen = true;
	}
	let hasError = $state(false);
</script>

<div class={cn('min-h-screen py-12')}>
	<!-- Hero Section -->
	<div class={cn('mb-16 text-center')}>
		<div class={cn('mb-6 flex justify-center')}>
			<img src="/baby.svg" class={cn('h-24 w-24')} alt="FeedChange Logo" />
		</div>
		<Heading
			tag="h1"
			class={cn(
				'from-primary-600 to-secondary-600 mb-6 h-20 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl'
			)}
		>
			{m['landingPage.hero.title']()}
		</Heading>
		<P
			class={cn(
				'mx-auto mb-8 max-w-3xl text-center text-xl text-gray-600 md:text-2xl dark:text-gray-300'
			)}
		>
			{m['landingPage.hero.subtitle']()}
		</P>
		<Button size="lg" class={cn('px-8 py-4 text-lg')} {onclick}>
			{m['landingPage.hero.ctaButton']()}
		</Button>
	</div>

	<!-- Privacy Features Section -->
	<div class={cn('mb-16')}>
		<Heading tag="h2" class={cn('mb-12 text-center text-3xl font-bold')}>
			{m['landingPage.privacy.title']()}
		</Heading>
		<div class={cn('mx-auto grid max-w-6xl justify-items-center gap-8 md:grid-cols-3')}>
			<Card class={cn('h-full p-4 text-center')}>
				<EyeSlashOutline class={cn('text-primary-600 mx-auto mb-4 h-12 w-12')} />

				<Heading tag="h3" class={cn('mb-4')}>{m['landingPage.privacy.noEmail.title']()}</Heading>
				<P class={cn('text-center text-gray-600 dark:text-gray-300')}>
					{m['landingPage.privacy.noEmail.description']()}
				</P>
			</Card>

			<Card class={cn('h-full p-4 text-center')}>
				<ShieldCheckOutline class={cn('text-primary-600 mx-auto mb-4 h-12 w-12')} />

				<Heading tag="h3" class={cn('mb-4')}>
					{m['landingPage.privacy.zeroTracking.title']()}
				</Heading>
				<P class={cn('text-center text-gray-600 dark:text-gray-300')}>
					{m['landingPage.privacy.zeroTracking.description']()}
				</P>
			</Card>

			<Card class={cn('h-full p-4 text-center')}>
				<TrashBinOutline class={cn('text-primary-600 mx-auto mb-4 h-12 w-12')} />

				<Heading tag="h3" class={cn('mb-4')}>
					{m['landingPage.privacy.autoCleanup.title']()}
				</Heading>
				<P class={cn('text-center text-gray-600 dark:text-gray-300')}>
					{m['landingPage.privacy.autoCleanup.description']()}
				</P>
			</Card>

			<Card class={cn('h-full p-4 text-center')}>
				<ShieldCheckOutline class={cn('text-primary-600 mx-auto mb-4 h-12 w-12')} />
				<Heading tag="h3" class={cn('mb-4')}>
					{m['landingPage.privacy.secureHosting.title']()}
				</Heading>
				<P class={cn('text-center text-gray-600 dark:text-gray-300')}>
					{m['landingPage.privacy.secureHosting.description']()}
				</P>
			</Card>

			<!-- Open Source Section -->
			<Card class={cn(' h-full p-4 text-center')}>
				<GithubSolid class={cn('text-primary-600 mx-auto mb-4 h-12 w-12')} />
				<div class={cn('text-center')}>
					<Heading tag="h2" class={cn('mb-4')}>
						{m['landingPage.openSource.title']()}
					</Heading>
					<P class={cn('mx-auto mb-6 max-w-2xl text-center')}>
						{m['landingPage.openSource.description']()}
					</P>
					<Button
						href="https://github.com/polaroidkidd/feedchange"
						target="_blank"
						rel="noopener noreferrer"
					>
						{m['landingPage.openSource.button']()}
					</Button>
				</div>
			</Card>
		</div>
	</div>

	<!-- Features Section -->
	<div class={cn('mb-16')}>
		<Heading tag="h2" class={cn('mb-12 text-center text-3xl font-bold')}>
			{m['landingPage.features.title']()}
		</Heading>
		<div class={cn('mx-auto grid max-w-6xl justify-items-center gap-8 md:grid-cols-2')}>
			<Card class={cn('h-full p-4')}>
				<div class={cn('flex items-center')}>
					<img src="/bottle.svg" class={cn('mr-3 h-8 w-8')} alt="Bottle" />
					<Heading tag="h3">{m['landingPage.features.feeding.title']()}</Heading>
				</div>

				<ul class={cn('mt-4 space-y-2 text-gray-600 dark:text-gray-300')}>
					<li class={cn('flex items-center ')}>
						<CheckCircleOutline class={cn(' mr-4 h-4 w-4 text-green-500')} />
						{m['landingPage.features.feeding.bottleSize']()}
					</li>
					<li class={cn('flex items-center ')}>
						<CheckCircleOutline class={cn(' mr-4 h-4 w-4 text-green-500')} />
						{m['landingPage.features.feeding.visualInterface']()}
					</li>
					<li class={cn('flex items-center ')}>
						<CheckCircleOutline class={cn(' mr-4 h-4 w-4 text-green-500')} />
						{m['landingPage.features.feeding.history']()}
					</li>
				</ul>
			</Card>

			<Card class={cn('h-full p-4')}>
				<div class={cn('flex items-center')}>
					<img src="/diaper.svg" class={cn('mr-3 h-8 w-8')} alt="Diaper" />
					<Heading tag="h3">{m['landingPage.features.diaper.title']()}</Heading>
				</div>
				<ul class={cn('mt-4 space-y-2 text-gray-600 dark:text-gray-300')}>
					<li class={cn('flex items-center')}>
						<CheckCircleOutline class={cn(' mr-4 h-4 w-4 text-green-500')} />
						{m['landingPage.features.diaper.quickLogging']()}
					</li>
					<li class={cn('flex items-center')}>
						<CheckCircleOutline class={cn(' mr-4 h-4 w-4 text-green-500')} />
						{m['landingPage.features.diaper.frequency']()}
					</li>
					<li class={cn('flex items-center')}>
						<CheckCircleOutline class={cn(' mr-4 h-4 w-4 text-green-500')} />
						{m['landingPage.features.diaper.timestamps']()}
					</li>
				</ul>
			</Card>
		</div>
	</div>

	<!-- How It Works Section -->
	<div class={cn('mb-16')}>
		<Heading tag="h2" class={cn('mb-12 text-center text-3xl font-bold')}>
			{m['landingPage.howItWorks.title']()}
		</Heading>
		<div class={cn('mx-auto grid max-w-6xl justify-items-center gap-8 md:grid-cols-3')}>
			<div class={cn('text-center')}>
				<div
					class={cn(
						'from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 ring-primary-100 dark:ring-primary-900/30 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-4'
					)}
				>
					<span class={cn('text-3xl font-bold text-white drop-shadow-sm')}>1</span>
				</div>
				<Heading tag="h3" class={cn('mb-2')}>{m['landingPage.howItWorks.step1.title']()}</Heading>
				<P class={cn('text-center text-gray-600 dark:text-gray-300')}>
					{m['landingPage.howItWorks.step1.description']()}
				</P>
			</div>

			<div class={cn('text-center')}>
				<div
					class={cn(
						'from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 ring-primary-100 dark:ring-primary-900/30 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-4'
					)}
				>
					<span class={cn('text-3xl font-bold text-white drop-shadow-sm')}>2</span>
				</div>
				<Heading tag="h3" class={cn('mb-2')}>{m['landingPage.howItWorks.step2.title']()}</Heading>
				<P class={cn('text-center text-gray-600 dark:text-gray-300')}>
					{m['landingPage.howItWorks.step2.description']()}
				</P>
			</div>

			<div class={cn('text-center')}>
				<div
					class={cn(
						'from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 ring-primary-100 dark:ring-primary-900/30 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-4'
					)}
				>
					<span class={cn('text-3xl font-bold text-white drop-shadow-sm')}>3</span>
				</div>
				<Heading tag="h3" class={cn('mb-2')}>{m['landingPage.howItWorks.step3.title']()}</Heading>
				<P class={cn('text-center text-gray-600 dark:text-gray-300')}>
					{m['landingPage.howItWorks.step3.description']()}
				</P>
			</div>
		</div>
	</div>

	<!-- Privacy Badge Section -->
	<div class={cn('mx-auto mb-16 max-w-6xl')}>
		<div
			class={cn(
				'mx-auto rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:border-green-800 dark:from-green-900/20 dark:to-blue-900/20'
			)}
		>
			<div class={cn('mb-4 flex justify-center')}>
				<ShieldCheckOutline class={cn('h-16 w-16 text-green-600')} />
			</div>
			<Heading tag="h2" class={cn('mb-4 text-center text-green-800 dark:text-green-200')}>
				{m['landingPage.privacyBadge.title']()}
			</Heading>
			<P class={cn('mx-auto mb-6 max-w-2xl  text-green-700 dark:text-green-300')}>
				{m['landingPage.privacyBadge.description']()}
			</P>
			<div class={cn('flex flex-wrap justify-center gap-2')}>
				<Badge color="green">{m['landingPage.privacyBadge.badges.noEmail']()}</Badge>
				<Badge color="green">{m['landingPage.privacyBadge.badges.noAnalytics']()}</Badge>
				<Badge color="green">{m['landingPage.privacyBadge.badges.noTracking']()}</Badge>
				<Badge color="green">{m['landingPage.privacyBadge.badges.autoCleanup']()}</Badge>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div class={cn('text-center')}>
		<Heading tag="h2" class={cn('mb-6 text-3xl font-bold')}>{m['landingPage.cta.title']()}</Heading>
		<P class={cn('mb-8 text-center text-xl text-gray-600 dark:text-gray-300')}>
			{m['landingPage.cta.subtitle']()}
		</P>
		<Button size="lg" class={cn('px-8 py-4 text-lg')} {onclick}>
			{m['landingPage.cta.button']()}
		</Button>
		<P class={cn('mt-4 text-center text-sm text-gray-500 dark:text-gray-400')}>
			{m['landingPage.cta.footer']()}
		</P>
	</div>
</div>

<NewBabyModal bind:isOpen bind:hasError />
<Alert bind:isOpen={hasError} />
