// Arma el link de WhatsApp (wa.me) para enviar RSVPs y sugerencias de
// canción directo al novio, sin pasar por ninguna base de datos.

const DEFAULT_COUNTRY_CODE = "51";

export function buildWhatsAppLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const withCountryCode = digits.startsWith(DEFAULT_COUNTRY_CODE)
    ? digits
    : `${DEFAULT_COUNTRY_CODE}${digits}`;
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`;
}
