import { Client } from "@libsql/client";
import { dbQuery } from "../../shared/dbQuery";
import { z } from "zod";

const speakerSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  institution: z.string(),
  authors: z.string(),
  country: z.string(),
  affiliation: z.string(),
  hosts: z.string(),
  title: z.string(),
  lang: z.number().min(1).max(3).int(),
  keywords: z.string(),
  theme: z.string(),
  abstract: z.string(),
  bibliography: z.string(),
  presentation_id: z.string(),
});




export async function getSpeakers(db: Client) {
  const query = "SELECT * FROM speaker;"
  const speakers = await dbQuery(query, speakerSchema, db)
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