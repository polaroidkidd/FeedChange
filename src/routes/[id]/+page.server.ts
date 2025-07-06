import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const result = await locals.db.baby.findUniqueOrThrow({
		where: {
			id: params.id
		},
		include: {
			events: {
				orderBy: {
					createdAt: 'desc'
				}
			}
		}
	});

	return result;
}) satisfies PageServerLoad;
