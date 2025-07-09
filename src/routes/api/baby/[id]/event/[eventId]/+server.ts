import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const { id } = event.params;

	const events = await event.locals.db.event.findFirst({
		where: {
			AND: [
				{
					id: id
				},
				{
					babyId: event.params.id
				}
			]
		}
	});
	return json(events);
};

export const DELETE: RequestHandler = async (event) => {
	const deleted = await event.locals.db.event.delete({
		where: {
			id: event.params.eventId,
			AND: [
				{
					baby: {
						id: event.params.id
					}
				}
			]
		}
	});

	return json(deleted);
};
