import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@prisma/client';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { dev } from '$app/environment';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const handlePrisma: Handle = async ({ event, resolve }) => {
	if (dev) {
		const prisma = new PrismaClient();
		event.locals.db = prisma;
	} else {
		const adapter = new PrismaD1(event.platform?.env?.DB);
		const prisma = new PrismaClient({ adapter });
		event.locals.db = prisma;
	}
	// delete last seven days of inactive babies
	await event.locals.db.baby.deleteMany({
		where: {
			updatedAt: {
				lt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
			}
		}
	});
	return resolve(event);
};
export const handle: Handle = sequence(handleParaglide, handlePrisma);
