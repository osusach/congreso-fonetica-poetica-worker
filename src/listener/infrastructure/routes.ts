import { Hono } from "hono";
import { authVerification } from "../../shared/authVerification";
import { getListeners } from "../application/getListeners";
import { dbClient } from "../../shared/dbClient";
import { addListener } from "../application/addListener";

const listener = new Hono<{ Bindings: Bindings }>();

listener.get("/", async (c) => {
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
  const response = await getListeners(db);
  if (!response.success) {
    return c.json(response, 500);
  }
  return c.json(response, 200);
});

listener.post("/", async (c) => {
  const db = dbClient(c.env);
  const body = await c.req.json();
  const response = await addListener(body, db);
  if (!response.success) {
    return c.json(response, 400);
  }
  return c.json(response, 200);
});

export default listener;
