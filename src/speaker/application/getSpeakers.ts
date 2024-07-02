import { Client } from '@libsql/client';
import { dbQuery } from '../../shared/dbQuery';
import { z } from 'zod';
import { sha256 } from 'hono/utils/crypto';

const speakerSchema = z.object({
	id: z.number(),
	email: z.string().email(),
	institution: z.string(),
	authors: z.string(),
	country: z.string(),
	hosts: z.string(),
	title: z.string(),
	lang: z.number().min(1).max(3).int(),
	keywords: z.string(),
	theme: z.string(),
	abstract: z.string(),
	bibliography: z.string(),
	presentation_id: z.string(),
});

export async function getSpeakers(db: Client, reqETag: string = '') {
	const cacheQuery = 'SELECT COUNT(*) FROM speaker;';
	const count = await dbQuery(cacheQuery, z.number(), db);

  // ETag generation
	const msgUint8 = new TextEncoder().encode(count.toString());
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const resETag = hashArray
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('');

	if (reqETag === resETag) {
		return {
			message: 'No hay cambios',
			success: true
		};
	}

	const query = 'SELECT * FROM speaker;';
	const speakers = await dbQuery(query, speakerSchema, db);
	if (!speakers.success) {
		return {
			success: false,
			error: speakers.error,
		};
	}
	return {
    ETag: resETag,
		message: 'Oyentes obtenidos correctamente',
		...speakers,
	};
}
