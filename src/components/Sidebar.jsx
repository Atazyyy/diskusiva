import { BadgeCheck, Scale, Sparkles, Trophy } from "lucide-react";
import Avatar from "./Avatar";
import {
  CATEGORIES,
  ROLE_STYLE,
  RULES,
  USERS,
  WA_NUMBER,
} from "../data/seed";
import { contributionLabel, num } from "../utils/format";

export default function Sidebar({ threads, activeCategory, onSelectCategory }) {
  const countFor = (catId) =>
    threads.filter((t) => t.category === catId).length;

  const top = [...USERS].sort((a, b) => b.points - a.points).slice(0, 5);

  return (
    <aside className="space-y-5">
      {/* Kategori */}
      <section className="rounded-2xl border border-edge bg-card p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-mute">
          <Scale className="h-4 w-4 text-azure" />
          Kategori
        </h2>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => onSelectCategory("all")}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                activeCategory === "all"
                  ? "bg-azure text-white"
                  : "text-ink hover:bg-azure-soft hover:text-azure-deep"
              }`}
            >
              Semua Diskusi
              <span
                className={`text-xs font-bold ${
                  activeCategory === "all" ? "text-white/80" : "text-mute"
                }`}
              >
                {threads.length}
              </span>
            </button>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => onSelectCategory(c.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === c.id
                    ? "bg-azure text-white"
                    : "text-ink hover:bg-azure-soft hover:text-azure-deep"
                }`}
              >
                {c.label}
                <span
                  className={`text-xs font-bold ${
                    activeCategory === c.id ? "text-white/80" : "text-mute"
                  }`}
                >
                  {countFor(c.id)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Top kontributor */}
      <section className="rounded-2xl border border-edge bg-card p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-mute">
          <Trophy className="h-4 w-4 text-accent" />
          Top Kontributor
        </h2>
        <ul className="space-y-3">
          {top.map((u, i) => (
            <li key={u.id}>
              <div className="flex items-center gap-3 rounded-xl px-1 py-1">
                <span className="w-4 text-center text-xs font-extrabold text-mute">
                  {i + 1}
                </span>
                <Avatar name={u.name} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-ink">
                    {u.name}
                  </span>
                  <span className="text-xs text-mute">
                    {contributionLabel(u.points)}
                  </span>
                </span>
                <span className="text-xs font-extrabold text-azure">
                  {num(u.points)}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-xl bg-canvas px-3 py-2 text-[11px] leading-relaxed text-mute">
          Poin didapat dari jawaban yang diupvote dan ditandai
          "jawaban terbaik" oleh anggota lain.
        </p>
      </section>

      {/* Aturan singkat */}
      <section className="rounded-2xl border border-edge bg-card p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-mute">
          <BadgeCheck className="h-4 w-4 text-emerald-600" />
          Aturan Singkat
        </h2>
        <ol className="space-y-3">
          {RULES.map((r, i) => (
            <li key={r.title} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-azure-soft text-xs font-extrabold text-azure-deep">
                {i + 1}
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">
                  {r.title}
                </span>
                <span className="text-xs leading-relaxed text-mute">
                  {r.desc}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Kartu CTA */}
      <section className="rounded-2xl border border-azure/30 bg-gradient-to-br from-azure-soft to-canvas p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-azure" />
          <h2 className="text-sm font-extrabold text-ink">
            Suka forum ini?
          </h2>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-mute">
          Diskusiva adalah demo konsep forum komunitas. Butuh forum atau
          komunitas serupa untuk bisnismu? Hubungi pembuatnya.
        </p>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
            "Halo! Saya tertarik buat forum/komunitas web seperti Diskusiva."
          )}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-azure px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-azure-deep"
        >
          Diskusikan proyekmu
        </a>
      </section>
    </aside>
  );
}
