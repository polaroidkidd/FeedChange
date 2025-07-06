import { json } from '@sveltejs/kit';
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
	const date = new Date();
	const hasTime = body.time !== undefined;
	if (hasTime) {
		date.setHours(body.time.split(':')[0], body.time.split(':')[1], 0, 0);
	}

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
