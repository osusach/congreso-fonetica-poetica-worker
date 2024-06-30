import { speakerRequest } from "./schemas";

export const correoInterested = (data: speakerRequest) => {
  const authors = data.authors.split(";").join("\n    - ")
  const hosts = data.hosts.split(";").join("\n    - ")
  const tags = data.keywords.split(";").join(", ")
  const bibliography = data.bibliography.split(";").join("\n    - ")
  return `Se ha recibido una nueva propuesta de ponencia:

Información de contacto:
- Nombre: ${data.name}
- Correo electrónico: ${data.email}
- Institución: ${data.institution}

Información de la ponencia:
- Título: ${data.title}
- Autor(es) y filiación:
  - ${authors}
- Presentadores:   
  - ${hosts}
- Palabras clave: ${tags}
- País: ${data.country}
- Idioma: ${data.lang}
- Categoría: ${data.theme}
- Resumen de la presentación: ${data.abstract}
- Referencias bibliográficas:
  - ${bibliography}

Se adjunta la presentación como documento en el correo electrónico
`
}
  