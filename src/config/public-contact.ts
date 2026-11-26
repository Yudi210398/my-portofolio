// Add an approved PDF under public/ and set its root-relative path here.
export const CV_PATH: string = "";

export const CONTACT_EMAIL = "yudi.berland@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/yudi-runat-masneno-a03b141a7/";

// Enter the owner-approved WhatsApp number in international digits, without + or spaces.
export const WHATSAPP_NUMBER: string = "6281381871739";

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
