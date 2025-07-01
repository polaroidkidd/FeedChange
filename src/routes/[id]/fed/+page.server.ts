import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const result = await locals.db.baby.findUniqueOrThrow({
		where: {
			id: params.id
		}
	});

	return result;
}) satisfies PageServerLoad;
