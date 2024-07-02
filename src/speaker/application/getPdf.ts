export const getPdf = async (id: string, env: Bindings) => {
	const object = await env.PDF_BUCKET.get(id);

	if (object === null) {
		return { success: false, error: 'Pdf not found' };
	}

	const headers = new Headers();
	headers.set('Content-Type', 'application/pdf');
	headers.set('Cache-Control', 'public, max-age=86400'); // 1 day

	return { body: object.body, headers};
};
