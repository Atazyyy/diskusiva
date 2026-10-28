import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Search,
  ThumbsUp,
  Eye,
  X,
} from "lucide-react";
import Avatar from "./Avatar";
import Sidebar from "./Sidebar";
import { CATEGORIES, ROLE_STYLE, categoryById, userById } from "../data/seed";
import { num, timeAgo } from "../utils/format";

const SORTS = [
  { id: "terbaru", label: "Terbaru" },
  { id: "teratas", label: "Teratas" },
];

function StatCard({ icon: Icon, value, label, tone }) {
  return (
    <div className="rounded-2xl border border-edge bg-card px-4 py-3.5">
      <div className={`mb-1 flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xl font-extrabold leading-tight text-ink">{value}</p>
      <p className="text-xs font-semibold text-mute">{label}</p>
    </div>
  );
}

function ThreadCard({ thread, onOpen, index }) {
  const author = userById(thread.authorId);
  const cat = categoryById(thread.category);
  const snippet = thread.body[0] || "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
    >
      <button
        onClick={() => onOpen(thread.id)}
        className="group block w-full rounded-2xl border border-edge bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-azure/40 hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-azure-soft px-2.5 py-1 text-[11px] font-bold text-azure-deep">
            {cat.label}
          </span>
          {thread.solved ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Terjawab
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
              Menunggu jawaban
            </span>
          )}
        </div>

        <h3 className="mt-3 text-base font-extrabold leading-snug text-ink transition-colors group-hover:text-azure md:text-lg">
          {thread.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-mute">
          {snippet}
        </p>

        {thread.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {thread.tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-canvas px-2 py-0.5 text-[11px] font-semibold text-mute"
              >
                #{t.replace(/\s+/g, "-")}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-edge pt-3.5">
          <div className="flex items-center gap-2.5">
            <Avatar name={author.name} size="sm" />
            <span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-ink">
                {author.name}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${ROLE_STYLE[author.role]}`}
                >
                  {author.role}
                </span>
              </span>
              <span className="text-[11px] text-mute">
                {timeAgo(thread.createdAt)}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-mute">
            <span className="inline-flex items-center gap-1">
              <ThumbsUp className="h-3.5 w-3.5" />
              {num(thread.votes)}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              {thread.replies.length}
            </span>
            <span className="hidden items-center gap-1 sm:inline-flex">
              <Eye className="h-3.5 w-3.5" />
              {num(thread.views)}
            </span>
            <ChevronRight className="h-4 w-4 text-edge transition-colors group-hover:text-azure" />
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export default function Forum({
  threads,
  onOpenThread,
  activeCategory,
  onSelectCategory,
  onNewThread,
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("terbaru");

  const totalReplies = threads.reduce((s, t) => s + t.replies.length, 0);
  const solved = threads.filter((t) => t.solved).length;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = threads.filter((t) => {
      if (activeCategory !== "all" && t.category !== activeCategory)
        return false;
      if (!q) return true;
      const hay = [t.title, ...t.body, ...t.tags]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
    if (sort === "teratas") {
      return [...filtered].sort(
        (a, b) => b.votes - a.votes || b.updatedAt - a.updatedAt
      );
    }
    return [...filtered].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [threads, query, sort, activeCategory]);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      {/* Kolom utama */}
      <div>
        {/* Hero kecil */}
        <section className="mb-6 rounded-2xl border border-edge bg-gradient-to-br from-card to-azure-soft/50 p-6 md:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl">
            Tanya, jawab,{" "}
            <span className="text-azure">berbagi pengalaman.</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute md:text-base">
            Forum komunitas tempat pertanyaan menemukan jawaban terbaiknya —
            dari karier, teknologi, sampai usaha kecil.
          </p>
          <button
            onClick={onNewThread}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-azure px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-azure-deep"
          >
            <MessageSquare className="h-4 w-4" />
            Mulai diskusi baru
          </button>
        </section>

        {/* Statistik */}
        <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            icon={MessageSquare}
            value={num(threads.length)}
            label="Diskusi"
            tone="bg-azure-soft text-azure-deep"
          />
          <StatCard
            icon={ThumbsUp}
            value={num(totalReplies)}
            label="Balasan"
            tone="bg-emerald-50 text-emerald-700"
          />
          <StatCard
            icon={CheckCircle2}
            value={num(solved)}
            label="Terjawab"
            tone="bg-amber-50 text-amber-700"
          />
          <StatCard
            icon={Eye}
            value={num(
              threads.reduce((s, t) => s + t.views, 0)
            )}
            label="Dilihat"
            tone="bg-violet-50 text-violet-700"
          />
        </section>

        {/* Chips kategori (mobile) */}
        <div className="mb-4 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:hidden">
          {[{ id: "all", label: "Semua" }, ...CATEGORIES].map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                activeCategory === c.id
                  ? "bg-azure text-white"
                  : "border border-edge bg-card text-mute"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Toolbar: pencarian + urutan */}
        <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari diskusi, mis. gaji, desain, laptop…"
              className="w-full rounded-full border border-edge bg-card py-2.5 pl-10 pr-9 text-sm text-ink outline-none transition-colors placeholder:text-mute/70 focus:border-azure"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mute hover:text-ink"
                aria-label="Bersihkan pencarian"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 self-start rounded-full bg-card p-1 shadow-sm sm:self-auto">
            {SORTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSort(s.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                  sort === s.id
                    ? "bg-azure text-white"
                    : "text-mute hover:text-azure"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>

        {/* Daftar thread */}
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-edge bg-card p-10 text-center">
            <p className="text-sm font-bold text-ink">
              Tidak ada diskusi yang cocok
            </p>
            <p className="mt-1 text-sm text-mute">
              Coba kata kunci lain atau pilih kategori "Semua Diskusi".
            </p>
            <button
              onClick={() => {
                setQuery("");
                onSelectCategory("all");
              }}
              className="mt-4 rounded-full bg-azure-soft px-4 py-2 text-xs font-bold text-azure-deep hover:bg-azure hover:text-white"
            >
              Bersihkan filter
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {visible.map((t, i) => (
              <ThreadCard
                key={t.id}
                thread={t}
                index={i}
                onOpen={onOpenThread}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <Sidebar
        threads={threads}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
}
