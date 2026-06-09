"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

const SECTION_EYEBROW = "RSVP";
const SECTION_TITLE =
  "\u0058\u00e1\u0063\u0020\u006e\u0068\u1ead\u006e\u0020\u0074\u0068\u0061\u006d\u0020\u0064\u1ef1";
const SECTION_SUBTITLE =
  "\u0046\u006f\u0072\u006d\u0020\u006e\u00e0\u0079\u0020\u0063\u0068\u1ec9\u0020\u006d\u00f4\u0020\u0070\u0068\u1ecf\u006e\u0067\u0020\u0076\u0069\u1ec7\u0063\u0020\u0078\u00e1\u0063\u0020\u006e\u0068\u1ead\u006e\u0020\u0074\u0068\u0061\u006d\u0020\u0064\u1ef1\u002e\u0020\u004b\u0068\u00f4\u006e\u0067\u0020\u0063\u00f3\u0020\u0041\u0050\u0049\u0020\u0111\u01b0\u1ee3\u0063\u0020\u0067\u1ecdi\u002c\u0020\u0064\u1eef\u0020\u006c\u0069\u1ec7\u0075\u0020\u0073\u1ebd\u0020\u0111\u01b0\u1ee3\u0063\u0020\u0069\u006e\u0020\u0072\u0061\u0020\u0063\u006f\u006e\u0073\u006f\u006c\u0065\u0020\u0076\u00e0\u0020\u0068\u0069\u1ec3\u006e\u0020\u0074\u0068\u1ecb\u0020\u0074\u0068\u00f4\u006e\u0067\u0020\u0062\u00e1\u006f\u0020\u0074\u0068\u00e0\u006e\u0068\u0020\u0063\u00f4\u006e\u0067\u002e";
const SUCCESS_MESSAGE =
  "\u0043\u1ea3\u006d\u0020\u01a1\u006e\u0020\u0062\u1ea1\u006e\u0020\u0111\u00e3\u0020\u0078\u00e1\u0063\u0020\u006e\u0068\u1ead\u006e\u002e\u0020\u0043\u0068\u00fa\u006e\u0067\u0020\u006d\u00ec\u006e\u0068\u0020\u0072\u1ea5\u0074\u0020\u0076\u0075\u0069\u0020\u006b\u0068\u0069\u0020\u006e\u0068\u1ead\u006e\u0020\u0111\u01b0\u1ee3\u0063\u0020\u0070\u0068\u1ea3\u006e\u0020\u0068\u1ed3\u0069\u0020\u0063\u1ee7\u0061\u0020\u0062\u1ea1\u006e\u002e";
const HONOR_MESSAGE =
  "\u0053\u1ef1\u0020\u0068\u0069\u1ec7\u006e\u0020\u0064\u0069\u1ec7\u006e\u0020\u0063\u1ee7\u0061\u0020\u0062\u1ea1\u006e\u0020\u006c\u00e0\u0020\u006e\u0069\u1ec1\u006d\u0020\u0076\u0069\u006e\u0068\u0020\u0068\u1ea1\u006e\u0068\u0020\u0063\u1ee7\u0061\u0020\u0063\u0068\u00fa\u006e\u0067\u0020\u0074\u00f4\u0069\u002e";
const SUBMIT_LABEL =
  "\u0047\u1eed\u0069\u0020\u0078\u00e1\u0063\u0020\u006e\u0068\u1ead\u006e";
const FULL_NAME_LABEL = "\u0048\u1ecd\u0020\u0074\u00ea\u006e";
const FULL_NAME_PLACEHOLDER =
  "\u004e\u0068\u1ead\u0070\u0020\u0068\u1ecd\u0020\u0074\u00ea\u006e";
const ATTENDANCE_YES =
  "\u0043\u00f3\u002c\u0020\u0074\u00f4\u0069\u0020\u0073\u1ebd\u0020\u0074\u0068\u0061\u006d\u0020\u0064\u1ef1";
const ATTENDANCE_NO =
  "\u004b\u0068\u00f4\u006e\u0067\u002c\u0020\u0074\u00f4\u0069\u0020\u006b\u0068\u00f4\u006e\u0067\u0020\u0074\u0068\u1ec3\u0020\u0074\u0068\u0061\u006d\u0020\u0064\u1ef1";
const PHONE_LABEL =
  "\u0053\u1ed1\u0020\u0111\u0069\u1ec7\u006e\u0020\u0074\u0068\u006f\u1ea1\u0069";
const PHONE_PLACEHOLDER =
  "\u004e\u0068\u1ead\u0070\u0020\u0073\u1ed1\u0020\u0111\u0069\u1ec7\u006e\u0020\u0074\u0068\u006f\u1ea1\u0069";
const GUEST_COUNT_LABEL =
  "\u0053\u1ed1\u0020\u006c\u01b0\u1ee3\u006e\u0067\u0020\u006e\u0067\u01b0\u1eddi\u0020\u0074\u0068\u0061\u006d\u0020\u0064\u1ef1";
const ATTENDANCE_GROUP_LABEL =
  "\u0043\u00f3\u0020\u0074\u0068\u0061\u006d\u0020\u0064\u1ef1\u0020\u0068\u0061\u0079\u0020\u006b\u0068\u00f4\u006e\u0067";
const MESSAGE_LABEL = "\u004c\u1eddi\u0020\u006e\u0068\u1eaf\u006e";
const MESSAGE_PLACEHOLDER =
  "\u0047\u1eed\u0069\u0020\u006d\u1ed9\u0074\u0020\u006c\u1eddi\u0020\u006e\u0068\u1eaf\u006e\u0020\u0111\u1ebf\u006e\u0020\u0063\u00f4\u0020\u0064\u00e2\u0075\u0020\u0076\u00e0\u0020\u0063\u0068\u00fa\u0020\u0072\u1ec3";
const REQUIRED_NAME_ERROR =
  "\u0056\u0075\u0069\u0020\u006c\u00f2\u006e\u0067\u0020\u006e\u0068\u1ead\u0070\u0020\u0068\u1ecd\u0020\u0074\u00ea\u006e\u002e";
const REQUIRED_PHONE_ERROR =
  "\u0056\u0075\u0069\u0020\u006c\u00f2\u006e\u0067\u0020\u006e\u0068\u1ead\u0070\u0020\u0073\u1ed1\u0020\u0111\u0069\u1ec7\u006e\u0020\u0074\u0068\u006f\u1ea1\u0069\u002e";

type AttendanceValue = "yes" | "no";

type RSVPFormValues = {
  attendance: AttendanceValue;
  fullName: string;
  guestCount: number;
  message: string;
  phone: string;
};

type RSVPFormErrors = {
  fullName?: string;
  phone?: string;
};

const initialFormValues: RSVPFormValues = {
  attendance: "yes",
  fullName: "",
  guestCount: 1,
  message: "",
  phone: ""
};

export type RSVPSectionProps = {
  className?: string;
};

export function RSVPSection({ className }: RSVPSectionProps) {
  const [formValues, setFormValues] = useState<RSVPFormValues>(initialFormValues);
  const [errors, setErrors] = useState<RSVPFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTextChange =
    (field: "fullName" | "message" | "phone") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;

      setFormValues((current) => ({
        ...current,
        [field]: value
      }));

      setErrors((current) => ({
        ...current,
        [field]: undefined
      }));
      setIsSubmitted(false);
    };

  const handleAttendanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as AttendanceValue;

    setFormValues((current) => ({
      ...current,
      attendance: value
    }));
    setIsSubmitted(false);
  };

  const handleGuestCountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormValues((current) => ({
      ...current,
      guestCount: Number(event.target.value)
    }));
    setIsSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: RSVPFormErrors = {};

    if (!formValues.fullName.trim()) {
      nextErrors.fullName = REQUIRED_NAME_ERROR;
    }

    if (!formValues.phone.trim()) {
      nextErrors.phone = REQUIRED_PHONE_ERROR;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    const payload = {
      ...formValues,
      fullName: formValues.fullName.trim(),
      message: formValues.message.trim(),
      phone: formValues.phone.trim()
    };

    console.log("RSVP submission", payload);
    setIsSubmitted(true);
  };

  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="rsvp-section">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(199,165,109,0.34)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(250,242,233,0.97))] shadow-[0_30px_80px_rgba(137,107,82,0.14)]">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(199,165,109,0.72),transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute -left-12 top-12 h-32 w-32 rounded-full bg-[rgba(211,176,146,0.12)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-12 right-0 h-40 w-40 rounded-full bg-[rgba(199,165,109,0.12)] blur-3xl"
          />

          <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative border-b border-[rgba(199,165,109,0.2)] bg-[linear-gradient(180deg,rgba(255,252,247,0.94),rgba(247,238,230,0.84))] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-r-[rgba(199,165,109,0.2)] lg:p-10">
              <p className="wedding-fade-in wedding-fade-in-delay-1 relative text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--primary)]">
                {SECTION_EYEBROW}
              </p>
              <h2 className="wedding-fade-in wedding-fade-in-delay-2 relative mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
                {SECTION_TITLE}
              </h2>
              <p className="wedding-fade-in wedding-fade-in-delay-3 relative mt-4 max-w-md text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                {SECTION_SUBTITLE}
              </p>

              <div className="wedding-fade-in wedding-fade-in-delay-3 relative mt-8 rounded-[1.75rem] border border-[rgba(199,165,109,0.22)] bg-white/72 px-5 py-5 shadow-[0_18px_40px_rgba(154,121,98,0.08)] backdrop-blur-sm">
                <div className="h-px w-16 bg-[linear-gradient(90deg,rgba(199,165,109,0.9),rgba(211,176,146,0.35))]" />
                <p className="mt-4 font-display text-[1.35rem] leading-8 text-[color:var(--foreground)] sm:text-[1.5rem]">
                  {HONOR_MESSAGE}
                </p>
              </div>

              {isSubmitted ? (
                <div
                  aria-live="polite"
                  className="relative mt-8 rounded-[1.5rem] border border-[rgba(199,165,109,0.18)] bg-[rgba(255,255,255,0.78)] px-5 py-4 text-sm leading-7 text-[color:var(--foreground)] shadow-[0_14px_30px_rgba(154,121,98,0.07)]"
                  role="status"
                >
                  {SUCCESS_MESSAGE}
                </div>
              ) : null}
            </div>

            <form className="relative p-6 sm:p-8 lg:p-10" noValidate onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  error={errors.fullName}
                  htmlFor="rsvp-full-name"
                  label={FULL_NAME_LABEL}
                >
                  <input
                    autoComplete="name"
                    className={inputClassName(errors.fullName)}
                    id="rsvp-full-name"
                    name="fullName"
                    onChange={handleTextChange("fullName")}
                    placeholder={FULL_NAME_PLACEHOLDER}
                    type="text"
                    value={formValues.fullName}
                  />
                </FormField>

                <FormField error={errors.phone} htmlFor="rsvp-phone" label={PHONE_LABEL}>
                  <input
                    autoComplete="tel"
                    className={inputClassName(errors.phone)}
                    id="rsvp-phone"
                    inputMode="tel"
                    name="phone"
                    onChange={handleTextChange("phone")}
                    placeholder={PHONE_PLACEHOLDER}
                    type="tel"
                    value={formValues.phone}
                  />
                </FormField>
              </div>

              <div className="mt-5">
                <FormField htmlFor="rsvp-guest-count" label={GUEST_COUNT_LABEL}>
                  <select
                    className={inputClassName()}
                    id="rsvp-guest-count"
                    name="guestCount"
                    onChange={handleGuestCountChange}
                    value={formValues.guestCount}
                  >
                    {[1, 2, 3, 4, 5].map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <fieldset className="mt-5 rounded-[1.75rem] border border-[rgba(199,165,109,0.18)] bg-[rgba(255,252,247,0.82)] p-4 shadow-[0_16px_30px_rgba(154,121,98,0.06)] backdrop-blur-sm sm:p-5">
                <legend className="px-2 text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--primary)]">
                  {ATTENDANCE_GROUP_LABEL}
                </legend>

                <div className="mt-3 grid gap-3">
                  <label className="flex cursor-pointer items-start gap-3 rounded-[1.3rem] border border-[rgba(199,165,109,0.18)] bg-white/85 px-4 py-4 transition hover:border-[color:var(--primary)] hover:shadow-[0_12px_24px_rgba(154,121,98,0.08)]">
                    <input
                      checked={formValues.attendance === "yes"}
                      className="mt-1 h-4 w-4 accent-[color:var(--primary)]"
                      name="attendance"
                      onChange={handleAttendanceChange}
                      type="radio"
                      value="yes"
                    />
                    <span className="text-sm leading-7 text-[color:var(--foreground)]">
                      {ATTENDANCE_YES}
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-[1.3rem] border border-[rgba(199,165,109,0.18)] bg-white/85 px-4 py-4 transition hover:border-[color:var(--primary)] hover:shadow-[0_12px_24px_rgba(154,121,98,0.08)]">
                    <input
                      checked={formValues.attendance === "no"}
                      className="mt-1 h-4 w-4 accent-[color:var(--primary)]"
                      name="attendance"
                      onChange={handleAttendanceChange}
                      type="radio"
                      value="no"
                    />
                    <span className="text-sm leading-7 text-[color:var(--foreground)]">
                      {ATTENDANCE_NO}
                    </span>
                  </label>
                </div>
              </fieldset>

              <div className="mt-5">
                <FormField htmlFor="rsvp-message" label={MESSAGE_LABEL}>
                  <textarea
                    className={cn(inputClassName(), "min-h-32 resize-y")}
                    id="rsvp-message"
                    name="message"
                    onChange={handleTextChange("message")}
                    placeholder={MESSAGE_PLACEHOLDER}
                    value={formValues.message}
                  />
                </FormField>
              </div>

              <div className="mt-6">
                <button
                  className="wedding-button-primary inline-flex min-h-11 items-center justify-center rounded-full px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] shadow-[0_18px_32px_rgba(171,137,89,0.24)] transition hover:-translate-y-0.5 sm:min-h-12"
                  type="submit"
                >
                  {SUBMIT_LABEL}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

type FormFieldProps = {
  children: ReactNode;
  error?: string;
  htmlFor: string;
  label: string;
};

function FormField({ children, error, htmlFor, label }: FormFieldProps) {
  return (
    <div>
      <label
        className="block text-[0.72rem] uppercase tracking-[0.28em] text-[color:var(--primary)]"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      <div className="mt-3">{children}</div>
      {error ? (
        <p className="mt-2 text-sm text-[color:#a14b3b]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClassName(hasError?: string) {
  return cn(
    "min-h-11 w-full rounded-[1.35rem] border bg-[rgba(255,252,247,0.9)] px-4 py-3 text-sm text-[color:var(--foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition placeholder:text-[color:var(--muted)]/68 focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[rgba(199,165,109,0.18)] sm:min-h-12",
    hasError ? "border-[color:#a14b3b]" : "border-[rgba(199,165,109,0.2)]"
  );
}
