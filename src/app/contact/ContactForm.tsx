"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendEnquiry, type ContactState } from "./actions";
import {
  EMPTY_VALUES,
  FIELD_ORDER,
  LIMITS,
  PROJECT_TYPES,
  validateField,
  type ContactField,
} from "@/lib/contact";

const initialState: ContactState = { status: "idle", values: EMPTY_VALUES };

// `!` because globals.css sets `* { border-color }` outside any layer, which
// otherwise beats every border-color utility.
const inputClass =
  "mt-2 w-full border-b bg-transparent py-2 outline-none transition-colors " +
  "focus:border-ink! aria-[invalid=true]:border-accent!";

/**
 * Validation timing follows the usual "reward early, punish late" pattern:
 * a field is checked when you leave it (not while you first type), and once
 * it shows an error it re-checks on every keystroke so the error clears as
 * soon as it's fixed. The server re-validates everything regardless.
 */
export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  // Client-side verdicts override the server's for fields checked since;
  // `undefined` under a key means "checked and valid".
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<ContactField, string | undefined>>
  >({});
  // null until typed in: falls back to the length of any value echoed back.
  const [messageLength, setMessageLength] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const showSuccess = state.status === "success" && dismissed !== state;
  const errorFor = (field: ContactField) =>
    field in clientErrors ? clientErrors[field] : state.errors?.[field];

  // After the server answers, move focus to where the user needs to be.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
    } else if (state.errors) {
      const first = FIELD_ORDER.find((f) => state.errors?.[f]);
      const el = first && formRef.current?.elements.namedItem(first);
      if (el instanceof HTMLElement) el.focus();
    }
  }, [state]);

  function check(field: ContactField, value: string) {
    setClientErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  }

  function handleBlur(e: React.FocusEvent<HTMLFormElement>) {
    const el = fieldFrom(e.target);
    if (!el) return;
    const field = el.name as ContactField;
    // Don't scold someone for tabbing through an empty field.
    if (el.value.trim() || errorFor(field)) check(field, el.value);
  }

  function handleInput(e: React.FormEvent<HTMLFormElement>) {
    const el = fieldFrom(e.target);
    if (!el) return;
    const field = el.name as ContactField;
    if (field === "message") setMessageLength(el.value.length);
    if (errorFor(field)) check(field, el.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    const next: Partial<Record<ContactField, string | undefined>> = {};
    for (const field of FIELD_ORDER) {
      next[field] = validateField(field, String(data.get(field) ?? ""));
    }
    setClientErrors(next);
    const first = FIELD_ORDER.find((f) => next[f]);
    if (first) {
      e.preventDefault();
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
    }
  }

  if (showSuccess) {
    return (
      <div className="mt-12 max-w-sm" role="status">
        <h2
          ref={successRef}
          tabIndex={-1}
          className="text-2xl outline-none"
        >
          Thank you — message received.
        </h2>
        <p className="mt-3 text-ink-soft">
          We usually reply within two working days. If it&apos;s urgent, call
          us on{" "}
          <a href="tel:+919319688233" className="link-sweep hover:text-accent">
            +91 93196 88233
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setDismissed(state);
            setClientErrors({});
            setMessageLength(null);
          }}
          className="link-sweep tap mt-6 text-sm font-medium hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  const values = state.values;
  const serverOnlyMessage = state.status === "error" && !state.errors;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      onInput={handleInput}
      noValidate
      aria-describedby="form-status"
      className="mt-12 space-y-6 max-w-sm"
    >
      <p className="font-sans text-sm text-ink-faint">
        All fields are required unless marked optional.
      </p>

      <Field id="name" label="Name" error={errorFor("name")}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          autoCapitalize="words"
          required
          maxLength={LIMITS.name.max}
          defaultValue={values.name}
          aria-invalid={!!errorFor("name")}
          aria-describedby={errorFor("name") ? "name-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="email" label="Email" error={errorFor("email")}>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          maxLength={LIMITS.email.max}
          defaultValue={values.email}
          aria-invalid={!!errorFor("email")}
          aria-describedby={errorFor("email") ? "email-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field id="phone" label="Phone" optional error={errorFor("phone")}>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={24}
          placeholder="+91"
          defaultValue={values.phone}
          aria-invalid={!!errorFor("phone")}
          aria-describedby={errorFor("phone") ? "phone-error" : undefined}
          className={`${inputClass} placeholder:text-ink-faint`}
        />
      </Field>

      <Field id="projectType" label="Project type" error={errorFor("projectType")}>
        <div className="relative">
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue={values.projectType}
            aria-invalid={!!errorFor("projectType")}
            aria-describedby={errorFor("projectType") ? "projectType-error" : undefined}
            className={`${inputClass} cursor-pointer appearance-none pr-8`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className="pointer-events-none absolute right-1 bottom-3.5 size-3 text-ink-faint"
          >
            <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        </div>
      </Field>

      <Field id="message" label="Tell us about your project" error={errorFor("message")}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={LIMITS.message.max}
          defaultValue={values.message}
          aria-invalid={!!errorFor("message")}
          aria-describedby={[
            errorFor("message") ? "message-error" : "",
            "message-hint",
          ].join(" ").trim()}
          className={`${inputClass} resize-y min-h-28`}
        />
        <p
          id="message-hint"
          className="mt-1 flex justify-between gap-4 font-sans text-xs text-ink-faint"
        >
          <span>Location, size, timeline — whatever you know so far.</span>
          <span aria-hidden="true" className="tabular-nums shrink-0">
            {messageLength ?? values.message.length}/{LIMITS.message.max}
          </span>
        </p>
      </Field>

      {/* Spam traps: a field people never see, and when the form was opened. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input
        type="hidden"
        name="started"
        ref={(el) => {
          if (el && !el.value) el.value = String(Date.now());
        }}
      />

      <div>
        <button
          type="submit"
          disabled={pending}
          className="btn-morph text-base sm:text-[0.9375rem] font-medium bg-ink text-paper px-6 py-3 hover:bg-accent disabled:opacity-60 disabled:cursor-wait"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p
          id="form-status"
          role={serverOnlyMessage ? "alert" : undefined}
          aria-live="polite"
          className="mt-4 font-sans text-sm text-accent empty:hidden"
        >
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}

function fieldFrom(target: EventTarget) {
  const isControl =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement;
  return isControl && (FIELD_ORDER as string[]).includes(target.name) ? target : null;
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: ContactField;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-faint">
        {label}
        {optional && <span className="font-normal"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-sans text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
