/**
 * Single source for the studio's identity and contact details (NAP).
 * The footer, contact page, metadata and structured data all read from here,
 * so the name, address and phone stay identical everywhere.
 */

// Set per environment in .env.local / the host's env settings. Falls back to
// localhost so a missing value never leaks a wrong domain into canonicals.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const site = {
  name: "Voussoir",
  tagline: "Architecture · Interior · Design",
  siteUrl,
  locale: "en_IN",
  contact: {
    address: {
      street: "505–507, Tower C, Urbtech Trade Centre",
      locality: "Sector 132",
      city: "Noida",
      region: "Uttar Pradesh",
      postalCode: "201304",
      country: "IN",
    },
    phone: {
      display: "+91 93196 88233",
      e164: "+919319688233",
    },
    email: "info@voussoir.in",
    instagram: {
      handle: "@voussoir.design",
      url: "https://www.instagram.com/voussoir.design",
    },
  },
} as const;

const { address } = site.contact;

// The two lines the footer and contact page print, split where they break.
export const addressLines = [
  `${address.street},`,
  `${address.locality}, ${address.city}, ${address.region}, ${address.postalCode}`,
] as const;
