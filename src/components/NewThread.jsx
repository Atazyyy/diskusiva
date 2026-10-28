import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Info, MessageSquarePlus, Send } from "lucide-react";
import { CATEGORIES } from "../data/seed";

export default function NewThread({ onBack, onCreate }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (title.trim().length < 10) {
      setError("Judul minimal 10 karakter supaya mudah dipahami pembaca.");
      return;
    }
    if (body.trim().length < 20) {
      setError("Ceritakan konteksnya — isi diskusi minimal 20 karakter.");
      return;
    }
    setError("");
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const id = onCreate({
      title,
      category,
      body,
      tags: tagList,
    });
    onCreate && void id;
  };

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-mute transition-colors hover:text-azure"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke forum
      </button>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl border border-edge bg-card p-6 md:p-8"
      >
        <div className="mb-1 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-soft">
            <MessageSquarePlus className="h-5 w-5 text-azure-deep" />
          </div>
          <h1 className="text-xl font-extrabold text-ink md:text-2xl">
            Mulai diskusi baru
          </h1>
        </div>
        <p className="mb-6 text-sm text-mute">
          Judul yang spesifik + konteks yang cukup = jawaban lebih cepat.
        </p>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label
              htmlFor="judul"
              className="mb-1.5 block text-sm font-bold text-ink"
            >
              Judul pertanyaan <span className="text-rose-500">*</span>
            </label>
            <input
              id="judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="mis. Bagaimana cara mengatur jadwal kerja lepas agar tidak tumpang tindih?"
              className="w-full rounded-xl border border-edge bg-canvas/60 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-mute/70 focus:border-azure focus:bg-card"
            />
            <p className="mt-1 text-[11px] text-mute">
              {title.trim().length}/10 karakter minimum
            </p>
          </div>

          <div>
            <label
              htmlFor="kategori"
              className="mb-1.5 block text-sm font-bold text-ink"
            >
              Kategori <span className="text-rose-500">*</span>
            </label>
            <select
              id="kategori"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-edge bg-canvas/60 px-4 py-3 text-sm font-semibold text-ink outline-none transition-colors focus:border-azure focus:bg-card"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="isi"
              className="mb-1.5 block text-sm font-bold text-ink"
            >
              Isi diskusi <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="isi"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={7}
              placeholder="Ceritakan situasimu: apa yang sudah dicoba, kendalanya di mana, dan hasil seperti apa yang kamu harapkan. Pisahkan paragraf dengan satu baris kosong."
              className="w-full resize-none rounded-xl border border-edge bg-canvas/60 px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-mute/70 focus:border-azure focus:bg-card"
            />
            <p className="mt-1 text-[11px] text-mute">
              {body.trim().length}/20 karakter minimum
            </p>
          </div>

          <div>
            <label
              htmlFor="tag"
              className="mb-1.5 block text-sm font-bold text-ink"
            >
              Tag <span className="font-normal text-mute">(opsional)</span>
            </label>
            <input
              id="tag"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="pisahkan dengan koma, mis. freelance, manajemen waktu"
              className="w-full rounded-xl border border-edge bg-canvas/60 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-mute/70 focus:border-azure focus:bg-card"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700">
              {error}
            </p>
          )}

          <div className="flex items-start gap-2 rounded-xl bg-azure-soft/60 px-4 py-3 text-[11px] leading-relaxed text-azure-deep">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Diskusi yang kamu buat tersimpan di browser (localStorage) —
            bagian dari simulasi demo, tidak dikirim ke server mana pun.
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-azure px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-azure-deep sm:w-auto"
          >
            <Send className="h-4 w-4" />
            Terbitkan diskusi
          </button>
        </form>
      </motion.section>
    </div>
  );
}
