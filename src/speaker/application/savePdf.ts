type response =
  | {
      success: true;
      key: string;
    }
  | {
      success: false;
      error: string;
    };

const generateId = (authors: string) => {
  const name = authors.replaceAll(" ", "").replaceAll(",", "").split(";").join("");
  return (
    name +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};



// Se puede recibir el id del pdf para actualizarlo
// o se puede omitir para crear uno
export async function savePDF(
  pdf: any,
  authors: string,
  env: Bindings
): Promise<response> {
  const id = generateId(authors);

  if (pdf && pdf instanceof File) {
    const name = pdf.name.split(".");
		const buf = await pdf.arrayBuffer()

    const ext = name[name.length - 1];

    if (ext !== "pdf") {
      return { success: false, error: "File is not a pdf" };
    }

    const res = await env.PDF_BUCKET.put(id, pdf);

    return { success: true, key: id };
  }

  return { success: false, error: "No file submitted" };
}
