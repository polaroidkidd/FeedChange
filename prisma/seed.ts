import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { v4 as uuidv4 } from 'uuid';
// Configure dayjs like in temporal.svelte.ts
dayjs.extend(utc);

const prisma = new PrismaClient();

async function main() {
	console.log('Deleting all babies and events');
	await prisma.baby.deleteMany();
	await prisma.event.deleteMany();
	// Create a baby with the specified properties
	const baby = await prisma.baby.upsert({
		where: { id: 'dev' },
		update: {},
		create: {
			id: 'dev',
			name: 'Baby Dev',
			currentBottleSize: 90,
			weight: 2500
		}
	});

	console.log('Created baby:', baby);

	// Generate 100 events over the past 7 days, but none in the last 5 hours
	const now = dayjs().utc();
	const fiveHoursAgo = now.subtract(5, 'hour');
	const sevenDaysAgo = now.subtract(7, 'day');

	const events: Array<{
		id: string;
		createdAt: Date;
		diaperChanged: boolean;
		bottleSize: number;
		amountConsumed: number;
		babyId: string;
	}> = [];

	// Create 70 diaper change events
	for (let i = 0; i < 70; i++) {
		const totalMinutes = fiveHoursAgo.diff(sevenDaysAgo, 'minute');
		const randomMinutes = Math.floor(Math.random() * totalMinutes); // Random minutes in allowed range
		const randomTime = sevenDaysAgo.add(randomMinutes, 'minute').toDate();

		events.push({
			id: uuidv4(),
			createdAt: randomTime,
			diaperChanged: true,
			bottleSize: 0,
			amountConsumed: 0,
			babyId: baby.id
		});
	}

	// Create 30 feeding events
	for (let i = 0; i < 30; i++) {
		const totalMinutes = fiveHoursAgo.diff(sevenDaysAgo, 'minute');
		const randomMinutes = Math.floor(Math.random() * totalMinutes); // Random minutes in allowed range
		const randomTime = sevenDaysAgo.add(randomMinutes, 'minute').toDate();

		// Random bottle size between 30 and 150ml
		const bottleSize = Math.floor(Math.random() * 121) + 30;
		// Random amount consumed (usually 70-100% of bottle size)
		const amountConsumed = Math.floor(bottleSize * (0.7 + Math.random() * 0.3));

		events.push({
			id: uuidv4(),
			createdAt: randomTime,
			diaperChanged: false,
			bottleSize: bottleSize,
			amountConsumed: amountConsumed,
			babyId: baby.id
		});
	}

	// Sort events by creation time
	events.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

	// Insert all events
	for (const event of events) {
		await prisma.event.upsert({
			where: { id: event.id },
			update: {},
			create: event
		});
	}

	console.log(
		`Created ${events.length} events (${events.filter((e) => e.diaperChanged).length} diaper changes, ${events.filter((e) => !e.diaperChanged).length} feedings)`
	);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
