/**
 * Contact form rules, shared by the client (instant feedback) and the server
 * action (the check that actually counts — anyone can POST around the UI).
 */

export const PROJECT_TYPES = [
  "Architecture",
  "Interiors",
  "Planning & Urban Design",
  "Engineering",
  "Green & Responsive Design",
  "Project Management",
  "Something else",
] as const;

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { minDigits: 7, maxDigits: 15 },
  message: { min: 20, max: 2000 },
} as const;

export type ContactField = "name" | "email" | "phone" | "projectType" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const EMPTY_VALUES: ContactValues = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

// Deliberately loose: one "@", no spaces, a dot in the domain. Stricter
// patterns reject real addresses; the reply is the real test.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS_RE = /^\+?[\d\s\-().]+$/;

export function validateField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "Please tell us your name.";
      if (value.length < LIMITS.name.min) return "Please enter your full name.";
      if (value.length > LIMITS.name.max)
        return `Please keep your name under ${LIMITS.name.max} characters.`;
      return;
    case "email":
      if (!value) return "Please enter your email so we can reply.";
      if (value.length > LIMITS.email.max || !EMAIL_RE.test(value))
        return "Please enter a valid email address, like name@example.com.";
      return;
    case "phone": {
      if (!value) return; // optional
      const digits = value.replace(/\D/g, "").length;
      if (
        !PHONE_CHARS_RE.test(value) ||
        digits < LIMITS.phone.minDigits ||
        digits > LIMITS.phone.maxDigits
      )
        return "Please enter a valid phone number, like +91 98765 43210.";
      return;
    }
    case "projectType":
      if (!value) return "Please choose the kind of project.";
      if (!(PROJECT_TYPES as readonly string[]).includes(value))
        return "Please choose one of the listed options.";
      return;
    case "message":
      if (!value) return "Please tell us a little about your project.";
      if (value.length < LIMITS.message.min)
        return `A little more detail helps — at least ${LIMITS.message.min} characters.`;
      if (value.length > LIMITS.message.max)
        return `Please keep it under ${LIMITS.message.max} characters.`;
      return;
  }
}

export const FIELD_ORDER: ContactField[] = [
  "name",
  "email",
  "phone",
  "projectType",
  "message",
];

export function validateAll(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of FIELD_ORDER) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}
