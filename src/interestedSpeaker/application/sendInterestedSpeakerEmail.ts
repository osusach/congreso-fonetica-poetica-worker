import { correoInterested } from "./interestedSpeakerEmailTemplate";
import { speakerRequest } from "./schemas";

type fetchResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      error: unknown;
    };

export async function sendSpeakerEmail(speakerData: speakerRequest, env: Bindings):Promise<fetchResponse> {
  const correo = correoInterested(speakerData)
  const documentName = "presentacion" + speakerData.email.split('@')[0] + ".pdf"
  const req = createRequest(speakerData.title, correo, speakerData.encoded_file, documentName, env)
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
          name: "Organizadores Congreso"
        },
      ],
      // cc: [
      //   {
      //     email: "valentinacolonna@go.ugr.es",
      //     name: "Valentina Colonna"
      //   },
      //   {
      //     email: "domingo.roman@usach.cl",
      //     name: "Domingo Román M."
      //   },
      //   {
      //     email: "nretamalvenegas@gmail.com",
      //     name: "Nicolás Retamal Venegas"
      //   }
      // ],
      subject: "Nueva Propuesta: " + title,
      text: mailContent,
      // html: mailContent,
      attachments: [
        {
          filename: documentName,
          content: document
        }
      ]
    }),
  });
  return send_request;
}
