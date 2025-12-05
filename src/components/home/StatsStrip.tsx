"use client";

type StatItem =
  | { type: "text"; label: string }
  | { type: "button"; label: string };

const ITEMS: StatItem[] = [
  { type: "text", label: "[12.5k+ users]" },
  { type: "text", label: "[9+ projects]" },
  { type: "text", label: "[Web + Mobile]" },
  { type: "text", label: "[LA | REMOTE]" },
  { type: "button", label: "Connect" },
];

export default function StatsStrip() {
  const handleConnectClick = () => {
    const target =
      document.getElementById("contact") ??
      document.getElementById("contact-dock") ??
      document.querySelector("footer");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="-mt-12 mb-8 text-sm text-white tracking-wide px-6">
      <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 sm:justify-between w-full">
        {ITEMS.map((item) => (
          <li key={item.label}>
            {item.type === "text" ? (
              <span className="whitespace-normal sm:whitespace-nowrap hover:text-white/85 focus-visible:text-white/85 focus-visible:outline-none">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={handleConnectClick}
                className="whitespace-normal sm:whitespace-nowrap hover:text-white/85 focus-visible:text-white/85 focus-visible:outline-none cursor-pointer"
                aria-label="Scroll to connect"
              >
                [Connect]
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

