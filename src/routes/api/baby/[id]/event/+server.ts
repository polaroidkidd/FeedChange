import { json } from '@sveltejs/kit';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { v4 as uuid } from 'uuid';

import type { RequestHandler } from './$types';

dayjs.extend(utc);

export const GET: RequestHandler = async (event) => {
	const { id } = event.params;

	const events = await event.locals.db.event.findMany({
		where: {
			babyId: id
		}
	});
	return json(events);
};

export const POST: RequestHandler = async (event) => {
	const body = await event.request.json();

	const time = body.timeStamp;

	const created = await event.locals.db.event.create({
		data: {
			id: uuid(),
			amountConsumed: body.amountConsumed,
			bottleSize: body.bottleSize,
			diaperChanged: body.diaperChanged,
			createdAt: time,
			baby: {
				connect: {
					id: event.params.id!
				}
			}
		}
	});

	await event.locals.db.baby.update({
		where: {
			id: event.params.id!
		},
		data: {
			updatedAt: new Date()
		}
	});

	return json(created);
};
