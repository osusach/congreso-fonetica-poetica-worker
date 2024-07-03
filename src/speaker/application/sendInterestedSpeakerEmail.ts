import { correoSpeaker } from "./speakerEmailTemplate";
import { speakerRequest } from "./schemas";
import { confirmationEmail } from "./confirmationEmail";

type fetchResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: unknown;
    };

export async function sendOrganizersEmail(
  speakerData: speakerRequest,
  env: Bindings
): Promise<fetchResponse> {
  const correo = correoSpeaker(speakerData);
  const documentName =
    "presentacion" + speakerData.email.split("@")[0] + ".pdf";
  const req = createSpeakerRequest(
    speakerData.title,
    correo,
    speakerData.encoded_file,
    documentName,
    env
  );
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

export async function sendConfirmationEmail(
  speakerData: speakerRequest,
  env: Bindings
): Promise<fetchResponse> {
  const correo = confirmationEmail(speakerData);
  const documentName =
    "presentacion" + speakerData.email.split("@")[0] + ".pdf";
  const req = createConfirmationRequest(
    speakerData.email,
    speakerData.name,
    correo,
    speakerData.encoded_file,
    documentName,
    env
  );
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

function createSpeakerRequest(
  title: string,
  mailContent: string,
  document: string,
  documentName: string,
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
        email: "fypcongreso@usach.cl",
        name: "Congreso Fonética y Poética",
      },
      to: [
        {
          email: "foneticaypoetica@usach.cl",
          name: "Organizadores Congreso",
        },
      ],
      cc: env.COMMITTEE,
      subject: "Nueva Propuesta: " + title,
      // text: mailContent,
      html: mailContent,
      attachments: [
        {
          filename: documentName,
          content: document,
        },
      ],
    }),
  });
  return send_request;
}

function createConfirmationRequest(
  recipientEmail: string,
  recipientName: string,
  mailContent: string,
  document: string,
  documentName: string,
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
        email: "fypcongreso@usach.cl",
        name: "Congreso Fonética y Poética",
      },
      to: [
        {
          email: recipientEmail,
          name: recipientName,
        },
      ],
      subject: "Propuesta de ponencia recibida",
      // text: mailContent,
      html: mailContent,
      attachments: [
        {
          filename: documentName,
          content: document,
        },
      ],
    }),
  });
  return send_request;
}
