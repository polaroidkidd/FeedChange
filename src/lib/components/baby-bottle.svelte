<script lang="ts">
	import { cn } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	type Props = {
		maxAmount: number;
		remainingAmount: number;
		class?: string;
	};

	let { maxAmount = 1, remainingAmount, class: className = '' }: Props = $props(); // maxAmount in ml, remainingAmount in ml

	// Calculate milk level as a ratio (0 to 1)
	let milkLevel = $derived(Math.max(0, Math.min(1, remainingAmount / maxAmount)));

	let waveOffset = $state(0);
	let animationFrame = $state<number>();

	// Animation loop for the wave
	function animate() {
		waveOffset += 0.05;
		animationFrame = requestAnimationFrame(animate);
	}

	onMount(() => {
		animationFrame = requestAnimationFrame(animate);
		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});

	// Generate a wavy path for the milk surface
	function getWavePath(level: number, offset: number) {
		const width = 80;
		const startX = 110;

		const topY = 60; // top of bottle
		const bottomY = 220; // bottom of bottle
		const waveHeight = 8;
		const waveLength = 40;
		// Scale the level to reduce maximum height (0.8 means 80% of bottle capacity)
		const scaledLevel = level * 0.8;
		// y goes from bottomY (level=0) to topY (level=1)
		const y = bottomY - (bottomY - topY) * scaledLevel;
		let path = `M${startX},${y}`;
		for (let x = 0; x <= width; x += 10) {
			const waveY = y + Math.sin((x / waveLength + offset) * Math.PI * 2) * waveHeight;
			path += ` L${startX + x},${waveY}`;
		}
		path += ` L${startX + width},${bottomY} L${startX},${bottomY} Z`;
		return path;
	}
</script>

<svg
	width="300"
	height="260"
	viewBox="0 0 300 260"
	fill="none"
	class={cn(className)}
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<clipPath id="bottle-clip">
			<rect x="110" y="60" width="80" height="160" rx="30"></rect>
		</clipPath>
	</defs>

	<!-- Bottle body -->
	<rect
		x="110"
		y="60"
		width="80"
		height="160"
		rx="30"
		fill="#c6e7f3"
		stroke="#8fd0e6"
		stroke-width="3"
	></rect>

	<!-- Bottle cap -->
	<rect x="120" y="40" width="60" height="30" rx="15" fill="#4bb3c7"></rect>
	<rect x="125" y="35" width="50" height="15" rx="7" fill="#6ec6d9"></rect>

	<!-- Nipple -->
	<ellipse cx="150" cy="25" rx="18" ry="15" fill="#ffe082"></ellipse>
	<ellipse cx="150" cy="18" rx="10" ry="10" fill="#ffd54f"></ellipse>
	<ellipse cx="150" cy="12" rx="6" ry="7" fill="#ffecb3"></ellipse>

	<!-- Milk (animated, clipped to bottle) -->
	<g clip-path="url(#bottle-clip)">
		<path d={getWavePath(milkLevel, waveOffset)} fill="#e3f6fd" style="transition: d 0.2s;"></path>
		<!-- Milk highlight -->
		<ellipse
			cx="150"
			cy={220 - 160 * milkLevel * 0.8}
			rx="30"
			ry="6"
			fill="#b3e0ef"
			opacity="0.2"
		></ellipse>
	</g>

	<!-- Bottle label -->
	<rect x="130" y="110" width="40" height="60" rx="15" fill="#fff" opacity="0.7"></rect>
	<rect x="140" y="120" width="20" height="6" rx="3" fill="#8fd0e6" opacity="0.5"></rect>
	<rect x="140" y="135" width="20" height="6" rx="3" fill="#8fd0e6" opacity="0.5"></rect>
	<rect x="140" y="150" width="20" height="6" rx="3" fill="#8fd0e6" opacity="0.5"></rect>

	<!-- Milk level indicator line -->
	<line
		x1="195"
		y1={220 - 160 * milkLevel * 0.8}
		x2="210"
		y2={220 - 160 * milkLevel * 0.8}
		stroke="#ff4444"
		stroke-width="2"
	></line>

	<!-- Remaining amount text -->
	<text
		x="215"
		y={217 - 160 * milkLevel * 0.8 + 4}
		font-family="Arial, sans-serif"
		font-size="24"
		class="fill-black dark:fill-gray-50"
		text-anchor="start"
		dominant-baseline="middle"
	>
		{remainingAmount}ml
	</text>
</svg>

<style>
	svg {
		display: block;
		margin: auto;
		border-radius: 16px;
	}
</style>
