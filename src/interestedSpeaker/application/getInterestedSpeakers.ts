import { Client } from "@libsql/client";
import { dbQuery } from "../../shared/dbQuery";
import { z } from "zod";

const interestedSpeakerSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  institution: z.string().email(),
  title: z.string(),
  theme: z.string(),
  lang: z.number().min(1).max(3).int(),
});




export async function getInterestedSpeakers(db: Client) {
  const query = "SELECT * FROM interested_speaker;"
  const speakers = await dbQuery(query, interestedSpeakerSchema, db)
  if (!speakers.success) {
    return {
      success: false,
      error: speakers.error
    }
  }
  return {
    message: "Oyentes obtenidos correctamente",
    ... speakers
  }
}