import { correoInterested } from "./interestedSpeakerEmailTemplate";

type fetchResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: unknown;
    };

export async function sendEmailFunction(email: string, name: string, env: Bindings):Promise<fetchResponse> {
  const req = createRequest(email, name, env)
  try {
    const mailResponse = await fetch(req);
    if (mailResponse.ok) {
      return {
        success: true,
        message: "Correo enviado correctamente",
      };
    }
    return {
      success: false,
      error: mailResponse.statusText,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}

function createRequest(
  email: string,
  name: string,
  env: Bindings
) {
  const send_request = new Request("https://api.mailersend.com/v1/email", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${env.MAILERSEND_TOKEN}`,
    },
    body: JSON.stringify({
      from: {
        email: "email@osusach.com",
        name: "Ligmacio",
      },
      to: [
        {
          email: email,
        },
      ],
      subject: "Congreso de Fonética y Poética",
      text: "Registro de interés",
      html: correoInterested(name),
    }),
  });
  return send_request;
}
