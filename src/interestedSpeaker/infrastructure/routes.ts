import { Hono } from "hono";
import { authVerification } from "../../shared/authVerification";
import { dbClient } from "../../shared/dbClient";
import { getInterestedSpeakers } from "../application/getInterestedSpeakers";
import { addInterestedSpeaker } from "../application/addInterestedSpeaker";

const interested = new Hono<{ Bindings: Bindings }>();

interested.get("/", async (c) => {
  const auth = c.req.header("Authorization");
  if (!auth) {
    return c.json(
      { success: false, error: "Se debe enviar un token de autorización" },
      401
    );
  }
  const verification = authVerification(auth, c.env);
  if (!verification.success) {
    return c.json(verification, 401);
  }
  const db = dbClient(c.env);
  const response = await getInterestedSpeakers(db);
  if (!response.success) {
    return c.json(response, 500);
  }
  return c.json(response, 200);
});

interested.post("/", async (c) => {
  const db = dbClient(c.env);
  const body = await c.req.json();
  const response = await addInterestedSpeaker(body, db);
  if (!response.success) {
    return c.json(response, 400);
  }
  return c.json(response, 200);
});

export default interested;
