const generateId = () => {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
};
// Se puede recibir el id del pdf para actualizarlo
// o se puede omitir para crear uno
export const savePDF = async (
	pdf: any,
	env: Bindings,
	id: string | null = null
) => {
	if (id) {
		const object = await env.PDF_BUCKET.get(id);

		if (!object) {
			return { success: false, error: 'Pdf not found' };
		}
	}

	id = generateId();

	if (pdf && pdf instanceof File) {
		const name = pdf.name.split('.');
		const ext = name[name.length - 1];

		if (ext !== 'pdf') {
			return { success: false, error: 'File is not a pdf' };
		}

		const res = await env.PDF_BUCKET.put(id, pdf);

		return {success: true, key: id} ;
	}

	return { success: false, error: 'No file submitted' };
};