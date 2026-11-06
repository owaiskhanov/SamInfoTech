/**
 * The Sam Infosystems monogram: a hexagonal "shield" silhouette whose
 * negative space reads as a cloud-secured "S". Pure SVG so it stays crisp
 * from a 16px favicon to a billboard, and recolours via currentColor.
 */

export function LogoMark({
  size = 40,
  className = "",
  gradientId = "si-logo-grad",
}: {
  size?: number;
  className?: string;
  gradientId?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label="Sam Infosystems"
    >
      <defs>
        <linearGradient id={gradientId} x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67E8F9" />
          <stop offset="0.52" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* hexagon shell */}
      <path
        d="M24 2.6 42.4 13v22L24 45.4 5.6 35V13L24 2.6Z"
        fill={`url(#${gradientId})`}
        fillOpacity="0.14"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* inner shield accent */}
      <path
        d="M24 8.4 36.6 15.6v16.8L24 39.6 11.4 32.4V15.6L24 8.4Z"
        stroke={`url(#${gradientId})`}
        strokeOpacity="0.45"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* the S */}
      <path
        d="M29.6 18.6c-1-1.5-2.9-2.4-5.3-2.4-3.3 0-5.6 1.8-5.6 4.5 0 2.6 2.1 3.8 5.4 4.5 3 .6 4.4 1.4 4.4 3.1 0 1.6-1.5 2.7-3.9 2.7-2.2 0-4-1-4.9-2.7"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="33.4" cy="16.4" r="1.7" fill="#67E8F9" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={40} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-bold tracking-[-0.01em] text-white">
          SAM <span className="text-gradient">INFOSYSTEMS</span>
        </span>
        <span className="mt-1 font-display text-[0.56rem] font-medium tracking-[0.28em] text-mist-500 uppercase">
          Pvt Ltd · Since 2000
        </span>
      </span>
    </span>
  );
}
