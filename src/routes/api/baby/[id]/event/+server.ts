import { json } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

import type { RequestHandler } from './$types';

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

	const time = body.time;
	const date = dayjs().set('hour', time.hours).set('minute', time.minutes).toDate();

	const created = await event.locals.db.event.create({
		data: {
			id: uuid(),
			amountConsumed: body.amountConsumed,
			bottleSize: body.bottleSize,
			diaperChanged: body.diaperChanged,
			createdAt: date,
			baby: {
				connect: {
					id: event.params.id!
				}
			}
		}
	});

	return json(created);
};
