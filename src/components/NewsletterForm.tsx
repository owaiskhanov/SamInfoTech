"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
      }}
      className="w-full"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="field flex-1"
        />
        <button type="submit" className="btn btn-primary shrink-0">
          {done ? "Joined" : "Join"}
          <Icon name={done ? "check" : "arrow-right"} size={16} />
        </button>
      </div>
      <p aria-live="polite" className="mt-3 text-[0.74rem] leading-relaxed text-mist-500">
        {done
          ? "You're on the list — your promo code is on its way to your inbox."
          : "Offer valid only for new email subscribers. One email, then you choose."}
      </p>
    </form>
  );
}
