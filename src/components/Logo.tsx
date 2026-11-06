/**
 * The Sam Infosystems monogram.
 *
 * A flat hexagon with a thin "S" cut through it. No gradients, no glows,
 * single accent colour so it reads at 16px and scales to any size.
 * Pure `currentColor`, so it inherits text colour in any context.
 */

export function LogoMark({
  size = 32,
  className = "",
  title,
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      role="img"
      aria-label={title ?? "Sam Infosystems"}
    >
      <path
        d="M20 2.4 34.8 11v17.6L20 37.2 5.2 28.6V11L20 2.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M24.6 15.4c-.9-1.3-2.5-2.1-4.6-2.1-2.9 0-4.9 1.6-4.9 3.9 0 2.3 1.8 3.3 4.7 3.9 2.6.6 3.8 1.2 3.8 2.7 0 1.4-1.3 2.4-3.4 2.4-1.9 0-3.5-.9-4.3-2.4"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="27.9" cy="13.4" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={30} className="text-brand-300" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-medium tracking-[-0.02em] text-mist-50">
          Sam Infosystems
        </span>
        <span className="mt-1 text-[0.6rem] font-normal uppercase tracking-[0.18em] text-mist-500">
          Pvt Ltd
        </span>
      </span>
    </span>
  );
}
