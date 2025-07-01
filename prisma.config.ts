// import your .env file
import 'dotenv/config';

import path from 'node:path';

import { PrismaD1HTTP } from '@prisma/adapter-d1';
import type { PrismaConfig } from 'prisma';

type Env = {
	CLOUDFLARE_D1_TOKEN: string;
	CLOUDFLARE_ACCOUNT_ID: string;
	CLOUDFLARE_DATABASE_ID: string;
};

const isDev = process.env.MODE === 'development';

export default {
	earlyAccess: true,

	schema: path.join('prisma', 'schema.prisma'),

	...(!isDev && {
		migrate: {
			async adapter(env) {
				return new PrismaD1HTTP({
					CLOUDFLARE_D1_TOKEN: env.CLOUDFLARE_D1_TOKEN,
					CLOUDFLARE_ACCOUNT_ID: env.CLOUDFLARE_ACCOUNT_ID,
					CLOUDFLARE_DATABASE_ID: env.CLOUDFLARE_DATABASE_ID
				});
			}
		}
	})
} satisfies PrismaConfig<Env>;
