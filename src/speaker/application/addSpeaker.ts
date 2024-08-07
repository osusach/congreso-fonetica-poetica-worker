import { Client } from "@libsql/client";
import { z } from "zod";
import { savePDF } from "./savePdf";
import { speakerRequestSchema } from "./schemas";
import { sendConfirmationEmail, sendOrganizersEmail } from "./sendInterestedSpeakerEmail";

function base64Encode (buf: ArrayBuffer) {
  let string = '';
  (new Uint8Array(buf)).forEach(
      (byte) => { string += String.fromCharCode(byte) }
    )
  return btoa(string)
}



export async function addSpeaker(
  body: any,
  db: Client,
  env: Bindings
) {
  const bodyValidation = speakerRequestSchema.safeParse(body);
  if (!bodyValidation.success) {
    return {
      success: false,
      error: bodyValidation.error,
    };
  }

  const {
    email,
    name,
    institution,
    authors,
    country,
    hosts,
    title,
    lang,
    keywords,
    theme,
    abstract,
    bibliography,
    raw_file,
  } = bodyValidation.data;

  

  const pdfId = await savePDF(raw_file, authors, env);
  if (!pdfId.success) {
    return {
      success: false,
      error: "Error guardando el documento",
    };
  }

  const organizersEmail = sendOrganizersEmail(bodyValidation.data, env)
  const confirmationEmail = sendConfirmationEmail(bodyValidation.data, env)

  const organizersResponse = await organizersEmail
  if (!organizersResponse.success) {
    return {
      success: false,
      error: organizersResponse.error
    }
  }

  const confirmationResponse = await confirmationEmail
  if (!confirmationResponse.success) {
    return {
      success: false,
      error: confirmationResponse.error
    }
  }

  const query =
    "INSERT INTO speaker (email, name, institution, authors, country, hosts, title, lang, keywords, theme, abstract, bibliography, presentation_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  try {
    const req = await db.execute({
      sql: query,
      args: [
        email,
        name,
        institution,
        authors,
        country,
        hosts,
        title,
        lang,
        keywords,
        theme,
        abstract,
        bibliography,
        pdfId.key,
      ],
    });
    if (req.rowsAffected != 1) {
      return {
        success: false,
        message: "El ponente no fue agregado",
      };
    }
    return {
      success: true,
      message: "Ponente agregado exitosamente",
    };
  } catch (e) {
    console.log(e)
    return {
      success: false,
      message: e,
    };
  }
}
