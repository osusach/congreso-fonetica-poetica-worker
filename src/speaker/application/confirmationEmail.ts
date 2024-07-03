import { speakerRequest } from "./schemas";

const language = (n: number) => {
  switch (n) {
    case 1:
      return "Inglés"
    case 2:
      return "Español"
    case 3:
      return "Francés"
    default:
      return "Español"
  }
}

export const confirmationEmail = (data: speakerRequest) => {
  const authors = data.authors.split(";").map(e => `<li style="font-weight: normal; font-size: 13px;">${e}</li>`).join("\n")
  const hosts = data.hosts.split(";").map(e => `<li style="font-weight: normal; font-size: 13px;">${e}</li>`).join("\n")
  const tags = data.keywords.split(";").join(", ")
  const bibliography = data.bibliography.split("\n").map(e => `<li style="font-weight: normal; font-size: 13px;">${e}</li>`).join("\n")
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Propuesta Congreso Fonética y Poética</title>
</head>
<body>
<h1 style="margin: 0px; padding: 0px;margin-bottom: 20px">Recepción de Ponencia</h1>

<h2>¡Hola, ${data.name}!</h2>

<p>Te informamos que hemos recibido correctamente tu propuesta para el Congreso de Fonética y Poética, 
y aprovechamos de adjuntarte una copia de lo que recibimos, para que puedas verificar que toda la 
información se encuentre bien.
<br>
<br>
En caso de cualquier corrección, duda o solicitud, puedes enviar 
un correo directamente a foneticaypoetica@usach.cl
</p>

<p></p>

<p style="font-weight: bold;">Por favor, no responder a este correo.</p>


<h2 style="margin-top: 3px; margin-bottom: 5px">Información de contacto</h2>
<h3 style="margin-top: 3px; margin-bottom: 0px">Nombre</h3>
<p style="margin-top: 0px; margin-bottom: 0px">${data.name}</p>
<h3 style="margin-top: 3px; margin-bottom: 0px">Correo electrónico</h3>
<p style="margin-top: 0px; margin-bottom: 0px">${data.email}</p>
<h3 style="margin-top: 3px; margin-bottom: 0px">Institución</h2>
<p style="margin-top: 0px; margin-bottom: 12px">${data.institution}</p>

<h2 style="margin-top: 10px; margin-bottom: 5px">Información de la ponencia</h2>
<h3 style="margin-top: 3px; margin-bottom: 0px">Título</h3>
<p style="margin-top: 0px; margin-bottom: 0px">${data.title}</p>

<h3 style="margin-top: 3px; margin-bottom: 0px">Autor(es) y filiación</h3>
<ul style="margin-top: 0px; margin-bottom: 0px">
${authors}
</ul>

<h3 style="margin-top: 3px; margin-bottom: 0px">Presentador(es)</h2>
<ul style="margin-top: 0px; margin-bottom: 0px">
${hosts}
</ul>

<h3 style="margin-top: 3px; margin-bottom: 0px">Palabras clave</h2>
<p style="margin-top: 0px; margin-bottom: 0px">${tags}</p>
<h3 style="margin-top: 3px; margin-bottom: 0px">País</h2>
<p style="margin-top: 0px; margin-bottom: 0px">${data.country}</p>
<h3 style="margin-top: 3px; margin-bottom: 0px">Idioma</h2>
<p style="margin-top: 0px; margin-bottom: 0px">${language(data.lang)}</p>
<h3 style="margin-top: 3px; margin-bottom: 0px">Categoría</h2>
<p style="margin-top: 0px; margin-bottom: 0px">${data.theme}</p>
<h3 style="margin-top: 3px; margin-bottom: 0px">Resumen de la presentación</h2>
<p style="margin-top: 0px; margin-bottom: 0px">${data.abstract}</p>
<h3 style="margin-top: 3px; margin-bottom: 0px">Referencias bibliográficas</h2>
<ul style="margin-top: 0px; margin-bottom: 0px">
${bibliography}
</ul>

</body>
</html>
`
}
  