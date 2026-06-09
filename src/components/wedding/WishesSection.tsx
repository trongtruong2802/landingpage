"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useState } from "react";

import { Container } from "@/components/ui/container";
import { weddingData } from "@/constants/wedding-data";
import type { SampleWish } from "@/constants/wedding-data";
import { cn } from "@/lib/cn";

const SECTION_EYEBROW = "Sweet Wishes";
const SECTION_TITLE =
  "\u004e\u0068\u1eef\u006e\u0067\u0020\u006c\u1eddi\u0020\u0063\u0068\u00fa\u0063\u0020\u0064\u00e0\u006e\u0068\u0020\u0063\u0068\u006f\u0020\u0068\u0061\u0069\u0020\u0111\u1ee9\u0061";
const SECTION_SUBTITLE =
  "\u0044\u0061\u006e\u0068\u0020\u0073\u00e1\u0063\u0068\u0020\u0062\u00ea\u006e\u0020\u0064\u01b0\u1edb\u0069\u0020\u0062\u1eaft\u0020\u0111\u1ea7\u0075\u0020\u0074\u1eeb\u0020\u0064\u1eef\u0020\u006c\u0069\u1ec7\u0075\u0020\u006d\u1eabu\u0020\u0076\u00e0\u0020\u0063\u00f3\u0020\u0074\u0068\u1ec3\u0020\u0111\u01b0\u1ee3\u0063\u0020\u0062\u1ed5\u0020\u0073\u0075\u006e\u0067\u0020\u006e\u0067\u0061\u0079\u0020\u0074\u1ea1\u0069\u0020\u0067\u0069\u0061\u006f\u0020\u0064\u0069\u1ec7\u006e\u0020\u006d\u1ed9\u0074\u0020\u0063\u00e1\u0063\u0068\u0020\u0067\u1ecdn\u0020\u006e\u0068\u1eb9\u002e";
const NAME_LABEL = "\u0054\u00ea\u006e\u0020\u006e\u0067\u01b0\u1eddi\u0020\u0067\u1eed\u0069";
const MESSAGE_LABEL = "\u004e\u1ed9\u0069\u0020\u0064\u0075\u006e\u0067\u0020\u006c\u1eddi\u0020\u0063\u0068\u00fa\u0063";
const SUBMIT_LABEL = "\u0047\u1eed\u0069\u0020\u006c\u1eddi\u0020\u0063\u0068\u00fa\u0063";
const SUCCESS_MESSAGE =
  "\u0043\u1ea3\u006d\u0020\u01a1\u006e\u0020\u0062\u1ea1\u006e\u0021\u0020\u004c\u1eddi\u0020\u0063\u0068\u00fa\u0063\u0020\u0111\u00e3\u0020\u0111\u01b0\u1ee3\u0063\u0020\u0074\u0068\u00ea\u006d\u0020\u0076\u00e0\u006f\u0020\u0064\u0061\u006e\u0068\u0020\u0073\u00e1\u0063\u0068\u0020\u006e\u0067\u0061\u0079\u0020\u0062\u00ea\u006e\u0020\u0064\u01b0\u1edb\u0069\u002e";
const REQUIRED_NAME_ERROR =
  "\u0056\u0075\u0069\u0020\u006c\u00f2\u006e\u0067\u0020\u006e\u0068\u1ead\u0070\u0020\u0074\u00ea\u006e\u0020\u006e\u0067\u01b0\u1eddi\u0020\u0067\u1eed\u0069\u002e";
const REQUIRED_MESSAGE_ERROR =
  "\u0056\u0075\u0069\u0020\u006c\u00f2\u006e\u0067\u0020\u006e\u0068\u1ead\u0070\u0020\u006e\u1ed9\u0069\u0020\u0064\u0075\u006e\u0067\u0020\u006c\u1eddi\u0020\u0063\u0068\u00fa\u0063\u002e";

type WishFormValues = {
  author: string;
  message: string;
};

type WishFormErrors = {
  author?: string;
  message?: string;
};

type WishItem = SampleWish & {
  id: string;
};

const initialFormValues: WishFormValues = {
  author: "",
  message: ""
};

export type WishesSectionProps = {
  className?: string;
};

export function WishesSection({ className }: WishesSectionProps) {
  const [wishes, setWishes] = useState<WishItem[]>(() =>
    weddingData.sampleWishes.map((wish, index) => ({
      ...wish,
      id: `sample-wish-${index + 1}`
    }))
  );
  const [formValues, setFormValues] = useState<WishFormValues>(initialFormValues);
  const [errors, setErrors] = useState<WishFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange =
    (field: keyof WishFormValues) =>
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedAuthor = formValues.author.trim();
    const trimmedMessage = formValues.message.trim();
    const nextErrors: WishFormErrors = {};

    if (!trimmedAuthor) {
      nextErrors.author = REQUIRED_NAME_ERROR;
    }

    if (!trimmedMessage) {
      nextErrors.message = REQUIRED_MESSAGE_ERROR;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    const nextWish: WishItem = {
      author: trimmedAuthor,
      id: createWishId(),
      message: trimmedMessage
    };

    setWishes((current) => [nextWish, ...current]);
    setFormValues(initialFormValues);
    setIsSubmitted(true);
  };

  return (
    <section className={cn("relative py-16 sm:py-20 lg:py-24", className)} id="wishes-section">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="wedding-fade-in wedding-fade-in-delay-1 text-[0.68rem] uppercase tracking-[0.4em] text-[color:var(--primary)]">
              {SECTION_EYEBROW}
            </p>
            <h2 className="wedding-fade-in wedding-fade-in-delay-2 mt-4 font-display text-[2rem] leading-tight text-balance text-[color:var(--foreground)] sm:text-5xl">
              {SECTION_TITLE}
            </h2>
            <p className="wedding-fade-in wedding-fade-in-delay-3 mt-4 max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {SECTION_SUBTITLE}
            </p>

            <div className="mt-8 space-y-4">
              {wishes.map((wish, index) => (
                <article
                  className={cn(
                    "wedding-panel overflow-hidden rounded-[1.75rem] p-5 sm:p-6",
                    index === 0 ? "wedding-fade-in wedding-fade-in-delay-1" : "",
                    index === 1 ? "wedding-fade-in wedding-fade-in-delay-2" : "",
                    index >= 2 ? "wedding-fade-in wedding-fade-in-delay-3" : ""
                  )}
                  key={wish.id}
                >
                  <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                  <p className="mt-4 text-[0.72rem] uppercase tracking-[0.35em] text-[color:var(--primary)]">
                    {wish.author}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="wedding-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <form noValidate onSubmit={handleSubmit}>
              <FormField error={errors.author} htmlFor="wish-author" label={NAME_LABEL}>
                <input
                  className={inputClassName(Boolean(errors.author))}
                  id="wish-author"
                  name="author"
                  onChange={handleChange("author")}
                  placeholder={NAME_LABEL}
                  type="text"
                  value={formValues.author}
                />
              </FormField>

              <div className="mt-5">
                <FormField
                  error={errors.message}
                  htmlFor="wish-message"
                  label={MESSAGE_LABEL}
                >
                  <textarea
                    className={cn(inputClassName(Boolean(errors.message)), "min-h-36 resize-y")}
                    id="wish-message"
                    name="message"
                    onChange={handleChange("message")}
                    placeholder={MESSAGE_LABEL}
                    value={formValues.message}
                  />
                </FormField>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  className="wedding-button-primary inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition sm:min-h-12"
                  type="submit"
                >
                  {SUBMIT_LABEL}
                </button>

                {isSubmitted ? (
                  <p
                    aria-live="polite"
                    className="text-sm leading-7 text-[color:var(--foreground)]"
                    role="status"
                  >
                    {SUCCESS_MESSAGE}
                  </p>
                ) : null}
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

function inputClassName(hasError: boolean) {
  return cn(
    "min-h-11 w-full rounded-[1.25rem] border bg-[rgba(255,255,255,0.8)] px-4 py-3 text-sm text-[color:var(--foreground)] outline-none transition placeholder:text-[color:var(--muted)]/65 focus:border-[color:var(--accent-rose)] focus:ring-2 focus:ring-[color:var(--accent-rose)]/18 sm:min-h-12",
    hasError ? "border-[color:#a14b3b]" : "border-[color:var(--border)]"
  );
}

function createWishId() {
  return `wish-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
