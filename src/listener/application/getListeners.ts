import { Client } from "@libsql/client";
import { dbQuery } from "../../shared/dbQuery";
import { z } from "zod";

const listenerSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  lang: z.number()
})




export async function getListeners(db: Client) {
  const query = "SELECT * FROM listener;"
  const listeners = await dbQuery(query, listenerSchema, db)
  if (!listeners.success) {
    return {
      success: false,
      error: listeners.error
    }
  }
  return {
    message: "Oyentes obtenidos correctamente",
    ... listeners
  }
}