import { initials } from "../utils/format";

// Avatar inisial berwarna — warna stabil dari hash nama (tanpa foto orang).
const PALETTE = [
  "bg-azure",
  "bg-rose-500",
  "bg-emerald-600",
  "bg-amber-500",
  "bg-violet-600",
  "bg-cyan-600",
  "bg-orange-500",
  "bg-teal-600",
];

const colorFor = (name) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 997;
  return PALETTE[h % PALETTE.length];
};

export default function Avatar({ name, size = "md" }) {
  const sizes = {
    sm: "h-8 w-8 text-[11px]",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${colorFor(
        name
      )} ${sizes[size]}`}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}
