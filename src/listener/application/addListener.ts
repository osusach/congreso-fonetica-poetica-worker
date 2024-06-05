import { Client } from "@libsql/client";
import { z } from "zod";

const listenerSchema = z.object({
  email: z.string().email(),
});

export async function addListener(body: any, db: Client) {
  const bodyValidation = listenerSchema.safeParse(body);
  if (!bodyValidation.success) {
    return {
      success: false,
      error: bodyValidation.error,
    };
  }
  const { email } = bodyValidation.data;
  const query = "INSERT INTO listener (email) VALUES (?);";
  try {
    const req = await db.execute({ sql: query, args: [email] });
    if (req.rowsAffected != 1) {
      return {
        success: false,
        message: "El oyente no fue agregado",
      };
    }
    return {
      success: true,
      message: "Oyente agregado exitosamente",
    };
  } catch (e) {
    return {
      success: false,
      message: e,
    };
  }
}
