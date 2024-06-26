export const getFile = async (id: string, env: Bindings) => {
	const object = await env.PDF_BUCKET.get(id);

	if (object === null) {
		return { success: false, error: 'Pdf not found' };
	}

	return { body: object.body };
};
