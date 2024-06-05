

export function authVerification(Authorization: string, env: Bindings) {
  const parts: string[] = Authorization.split(" ")
  if (parts.length != 2) {
    return {
      success: false,
      error: "La autorización debe componerse por 'Basic {token}', sin las comillas"
    }
  }
  if (parts[0].toLowerCase() != "basic") {
    return {
      success: false,
      error: "La autorización debe componerse por 'Basic {token}', sin las comillas"
    }
  }
  if (parts[1] != env.AUTH_TOKEN) {
    return {
      success: false,
      error: "Token inválido"
    }
  }
  return {
    success: true,
    message: "Autorización válida"
  }
}