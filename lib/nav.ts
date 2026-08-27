/**
 * The bridge's channel legends. Plain words, because a visitor deciding
 * whether to email a studio should never have to decode a label — the console
 * lives in the hardware, not in the vocabulary.
 *
 * Targets are stored as ids and resolved against the home document, so the
 * bridge navigates correctly from an interior page as well as from the desk.
 */
export const NAV_ITEMS = [
  { label: "Clients", id: "clients" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "References", id: "references" },
  { label: "Contact", id: "contact" },
] as const;

export const EMAIL = "hello@kastproductions.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;
