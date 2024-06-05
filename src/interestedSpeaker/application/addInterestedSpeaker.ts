import { Client } from "@libsql/client";
import { z } from "zod";

const interestedSpeakerSchema = z.object({
  email: z.string().email(),
  institution: z.string().email(),
  title: z.string(),
  theme: z.string(),
  lang: z.number().min(1).max(3).int(),
});

export async function addInterestedSpeaker(body: any, db: Client) {
  const bodyValidation = interestedSpeakerSchema.safeParse(body);
  if (!bodyValidation.success) {
    return {
      success: false,
      error: bodyValidation.error,
    };
  }
  const { email, institution, title, theme, lang } = bodyValidation.data;
  const query =
    "INSERT INTO interested_speaker (email, institution, title, theme, lang) VALUES (?, ?, ?, ?, ?);";
  try {
    const req = await db.execute({
      sql: query,
      args: [email, institution, title, theme, lang],
    });
    if (req.rowsAffected != 1) {
      return {
        success: false,
        message: "El ponente interesado no fue agregado",
      };
    }
    return {
      success: true,
      message: "Ponente interesado agregado exitosamente",
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
}
