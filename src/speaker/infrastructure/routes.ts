import { Hono } from 'hono';
import { authVerification } from '../../shared/authVerification';
import { dbClient } from '../../shared/dbClient';
import { getSpeakers } from '../application/getSpeakers';
import { addSpeaker } from '../application/addSpeaker';
import { getPdf } from '../application/getPdf';

const speaker = new Hono<{ Bindings: Bindings }>();

speaker.get('/', async (c) => {
	const auth = c.req.header('Authorization');
	if (!auth) {
		return c.json(
			{ success: false, error: 'Se debe enviar un token de autorización' },
			401
		);
	}
	const verification = authVerification(auth, c.env);
	if (!verification.success) {
		return c.json(verification, 401);
	}
	const etag = c.req.header('ETag');

	const db = dbClient(c.env);
	const response = await getSpeakers(db, etag);
	if (!response.success) {
		return c.json(response, 500);
	}

	if (response.success && response.message === 'No hay cambios') {
		return c.json(response, 304);
	}

	return c.json(response, 200);
});

speaker.post('/', async (c) => {
	const db = dbClient(c.env);
	const body = await c.req.parseBody();
	const response = await addSpeaker(body, db, c.env);
	if (!response.success) {
		return c.json(response, 400);
	}
	return c.json(response, 200);
});

speaker.get('/pdf/:id', async (c) => {
	const id = c.req.param('id');
	const response = await getPdf(id, c.env);
	if (!response.success) {
		return c.json({ error: response.error }, 404);
	}
	return c.body(response.body!, { headers: response.headers, status: 200 });
});

export default speaker;
