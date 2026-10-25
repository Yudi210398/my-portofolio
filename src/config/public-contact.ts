// Add an approved PDF under public/ and set its root-relative path here.
export const CV_PATH: string = "";

// Enter the owner-approved WhatsApp number in international digits, without + or spaces.
export const WHATSAPP_NUMBER: string = "";

export function getCvHref(path: string): string | null {
  return /^\/(?:[A-Za-z0-9_-]+\/)*[A-Za-z0-9_-]+\.pdf$/i.test(path)
    ? path
    : null;
}

export function getWhatsAppHref(number: string): string | null {
  return /^[1-9]\d{7,14}$/.test(number)
    ? `https://wa.me/${number}`
    : null;
}
