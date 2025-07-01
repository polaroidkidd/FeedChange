import { json, type RequestHandler } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { v4 as uuid } from 'uuid';

const limiter = new RateLimiter({
	// A rate is defined as [number, unit]
	IP: [10, 'h'], // IP address limiter
	IPUA: [5, 'm'], // IP + User Agent limiter
	cookie: {
		// Cookie limiter
		name: 'limiterid', // Unique cookie name for this limiter
		secret: 'SECRETKEY-SERVER-ONLY', // Use $env/static/private
		rate: [2, 'm'],
		preflight: true // Require preflight call (see load function)
	}
});

export const POST: RequestHandler = async (event) => {
	await limiter.cookieLimiter?.preflight(event);

	const created = await event.locals.db.event.create({
		data: {
			id: uuid(),
			diaperChanged: true,
			baby: {
				connect: {
					id: event.params.id!
				}
			}
		}
	});

	return json(created);
};
