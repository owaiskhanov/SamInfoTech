"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { quote } from "@/lib/site";

type Status = "idle" | "submitting" | "sent";

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    const data = new FormData(form);
    const body = [
      `Name: ${data.get("name") ?? ""}`,
      `Company: ${data.get("company") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `Service: ${data.get("service") ?? ""}`,
      `Budget: ${data.get("budget") ?? ""}`,
      "",
      `${data.get("message") ?? ""}`,
    ].join("\n");

    // The marketing form hands off to the sales inbox. No backend required.
    window.setTimeout(() => {
      window.location.href = `mailto:sales@saminfosystems.com?subject=${encodeURIComponent(
        `Quote request: ${data.get("company") || data.get("name") || "Website"}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      form.reset();
    }, 500);
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-4" : "space-y-5"} noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="qf-name">
            Name <span className="text-brand-300">*</span>
          </label>
          <input
            id="qf-name"
            name="name"
            required
            autoComplete="name"
            className="field"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="label" htmlFor="qf-company">
            Company
          </label>
          <input
            id="qf-company"
            name="company"
            autoComplete="organization"
            className="field"
            placeholder="Company name"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="qf-email">
          Email <span className="text-brand-300">*</span>
        </label>
        <input
          id="qf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field"
          placeholder="you@company.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="qf-service">
            Needed services
          </label>
          <select id="qf-service" name="service" className="field" defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {quote.services.map((s) => (
              <option key={s} value={s} className="bg-ink-900">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="qf-budget">
            Budget
          </label>
          <select id="qf-budget" name="budget" className="field" defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {quote.budgets.map((b) => (
              <option key={b} value={b} className="bg-ink-900">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="qf-message">
          Message
        </label>
        <textarea
          id="qf-message"
          name="message"
          rows={compact ? 3 : 4}
          className="field resize-none"
          placeholder="Tell us what you're trying to solve…"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900/30 border-t-ink-900" />
            Sending…
          </>
        ) : (
          <>
            Get a Quote Now
            <Icon name="arrow-right" size={16} />
          </>
        )}
      </button>

      <p aria-live="polite" className="min-h-[1.1rem] text-center text-[0.76rem] text-mist-500">
        {status === "sent"
          ? "Thanks. Your email client is opening with the details. We reply within one business day."
          : "We reply within one business day. No spam, ever."}
      </p>
    </form>
  );
}
