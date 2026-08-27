import "server-only";
import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_auth";

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function requireAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("Falta ADMIN_PASSWORD en las variables de entorno.");
  }
  return password;
}

// Token determinístico derivado de la contraseña: no necesita tabla de
// sesiones. Alcanza para un panel de uso personal (la pareja); no es un
// sistema de auth multiusuario.
export function getExpectedSessionToken() {
  const password = requireAdminPassword();
  return createHash("sha256").update(password).digest("hex");
}

export function verifyAdminPassword(password: string) {
  return safeEqual(password, requireAdminPassword());
}

export function verifyAdminSession(cookieValue: string | undefined) {
  if (!cookieValue) return false;
  return safeEqual(cookieValue, getExpectedSessionToken());
}
