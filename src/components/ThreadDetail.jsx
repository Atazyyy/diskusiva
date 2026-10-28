import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Eye,
  MessageSquare,
  Send,
  Share2,
  ThumbsUp,
} from "lucide-react";
import Avatar from "./Avatar";
import { ROLE_STYLE, categoryById, userById } from "../data/seed";
import { num, timeAgo } from "../utils/format";

function VoteButton({ count, voted, onClick, size = "sm" }) {
  const cls =
    size === "lg"
      ? "flex-col px-3 py-2 text-sm"
      : "flex-row px-2.5 py-1.5 text-xs";
  return (
    <button
      onClick={onClick}
      title={voted ? "Batalkan upvote" : "Upvote"}
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold transition-colors ${cls} ${
        voted
          ? "border-azure bg-azure-soft text-azure-deep"
          : "border-edge bg-card text-mute hover:border-azure/50 hover:text-azure"
      }`}
    >
      <ThumbsUp className={size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"} />
      {num(count)}
    </button>
  );
}

function ReplyCard({ reply, onVote, onToggleBest, index }) {
  const author = userById(reply.authorId);

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.05, 0.25) }}
      className={`rounded-2xl border p-5 ${
        reply.best
          ? "border-accent/50 bg-accent-soft/40"
          : "border-edge bg-card"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={author.name} size="sm" />
          <div>
            <p className="flex flex-wrap items-center gap-1.5 text-sm font-bold text-ink">
              {author.name}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${ROLE_STYLE[author.role]}`}
              >
                {author.role}
              </span>
            </p>
            <p className="text-[11px] text-mute">
              {timeAgo(reply.createdAt)}
            </p>
          </div>
        </div>
        {reply.best && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-extrabold text-white">
            <BadgeCheck className="h-3.5 w-3.5" />
            Jawaban terbaik
          </span>
        )}
      </div>

      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink">
        {reply.body}
      </p>

      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <VoteButton
          count={reply.votes}
          voted={reply.voted}
          onClick={() => onVote(reply.id)}
        />
        <button
          onClick={onToggleBest}
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-bold transition-colors ${
            reply.best
              ? "border-accent/60 bg-accent-soft text-amber-700 hover:border-accent"
              : "border-edge bg-card text-mute hover:border-emerald-400 hover:text-emerald-700"
          }`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {reply.best
            ? "Lepas tanda jawaban terbaik"
            : "Tandai jawaban terbaik"}
        </button>
      </div>
    </motion.li>
  );
}

export default function ThreadDetail({
  thread,
  onBack,
  onReply,
  onVote,
  onToggleBest,
}) {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!thread) {
    return (
      <div className="rounded-2xl border border-edge bg-card p-10 text-center">
        <p className="font-bold text-ink">Diskusi tidak ditemukan</p>
        <button
          onClick={onBack}
          className="mt-3 rounded-full bg-azure px-4 py-2 text-sm font-bold text-white hover:bg-azure-deep"
        >
          Kembali ke forum
        </button>
      </div>
    );
  }

  const author = userById(thread.authorId);
  const cat = categoryById(thread.category);

  // Jawaban terbaik selalu muncul paling atas, sisanya terbaru dulu
  const sortedReplies = [
    ...thread.replies.filter((r) => r.best),
    ...thread.replies
      .filter((r) => !r.best)
      .sort((a, b) => b.createdAt - a.createdAt),
  ];

  const submit = (e) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    onReply(body);
    setDraft("");
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/thread/${thread.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard diblokir — abaikan
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-mute transition-colors hover:text-azure"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke forum
      </button>

      {/* Pertanyaan utama */}
      <article className="rounded-2xl border border-edge bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-azure-soft px-2.5 py-1 text-[11px] font-bold text-azure-deep">
            {cat.label}
          </span>
          {thread.solved && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Terjawab
            </span>
          )}
          <span className="text-[11px] text-mute">
            {timeAgo(thread.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-mute">
            <Eye className="h-3.5 w-3.5" />
            {num(thread.views)} dilihat
          </span>
        </div>

        <h1 className="mt-3 text-xl font-extrabold leading-snug text-ink md:text-2xl">
          {thread.title}
        </h1>

        <div className="mt-4">
          {thread.body.map((p, i) => (
            <p
              key={i}
              className="mb-3 whitespace-pre-line text-sm leading-relaxed text-ink md:text-[15px]"
            >
              {p}
            </p>
          ))}
        </div>

        {thread.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
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

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-edge pt-4">
          <div className="flex items-center gap-2.5">
            <Avatar name={author.name} size="md" />
            <div>
              <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
                {author.name}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${ROLE_STYLE[author.role]}`}
                >
                  {author.role}
                </span>
              </p>
              <p className="text-[11px] text-mute">Pembuka diskusi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <VoteButton
              count={thread.votes}
              voted={thread.voted}
              onClick={() => onVote(null)}
              size="lg"
            />
            <button
              onClick={share}
              className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-card px-3 py-2 text-sm font-bold text-mute transition-colors hover:border-azure/50 hover:text-azure"
              title="Salin tautan diskusi"
            >
              <Share2 className="h-4 w-4" />
              {copied ? "Tautan disalin" : "Bagikan"}
            </button>
          </div>
        </div>
      </article>

      {/* Balasan */}
      <section className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 text-base font-extrabold text-ink">
          <MessageSquare className="h-4.5 w-4.5 text-azure" />
          {thread.replies.length} Balasan
        </h2>

        {sortedReplies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-edge bg-card p-8 text-center">
            <p className="text-sm font-bold text-ink">
              Belum ada balasan
            </p>
            <p className="mt-1 text-sm text-mute">
              Jadi yang pertama membantu — tulis jawabanmu di bawah.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {sortedReplies.map((r, i) => (
              <ReplyCard
                key={r.id}
                reply={r}
                index={i}
                onVote={(replyId) => onVote(replyId)}
                onToggleBest={() => onToggleBest(r.id)}
              />
            ))}
          </ul>
        )}
      </section>

      {/* Form balas */}
      <form
        onSubmit={submit}
        className="sticky bottom-20 mt-8 rounded-2xl border border-edge bg-card p-5 shadow-lg sm:bottom-4"
      >
        <div className="mb-3 flex items-center gap-2.5">
          <Avatar name="Kamu" size="sm" />
          <p className="text-xs font-bold text-ink">
            Balas sebagai{" "}
            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
              Member
            </span>
          </p>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          placeholder="Tulis jawabanmu… bagikan pengalaman, bukan cuma teori."
          className="w-full resize-none rounded-xl border border-edge bg-canvas/60 p-3.5 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-mute/70 focus:border-azure focus:bg-card"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-[11px] text-mute">
            {draft.trim().length > 0
              ? `${draft.trim().length} karakter`
              : "Jawaban yang jelas & sopan akan diupvote."}
          </p>
          <button
            type="submit"
            disabled={!draft.trim()}
            className="inline-flex items-center gap-1.5 rounded-full bg-azure px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-azure-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
            Kirim balasan
          </button>
        </div>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs font-bold text-emerald-700"
          >
            Balasan terkirim — tersimpan di perangkatmu (localStorage).
          </motion.p>
        )}
      </form>
    </div>
  );
}
