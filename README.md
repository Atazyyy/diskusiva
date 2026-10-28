Kategori: Web App — Forum/Community Q&A

# Diskusiva — Forum & Q&A Komunitas

> **Kategori proyek: Web App — Forum/Community Q&A.**
> Anggota bertanya, komunitas menjawab — lengkap dengan upvote, jawaban
> terbaik, dan papan kontributor.

Aplikasi forum tanya-jawab komunitas fiktif "Diskusiva" — dari daftar
diskusi yang hidup sampai halaman detail dengan balasan satu level.
Proyek ini adalah **concept demo** untuk portofolio jasa pembuatan web
app — seluruh nama, diskusi, dan angka bersifat fiktif. Nama "Diskusiva"
sengaja dibuat unik (belum dipakai entitas mana pun di internet).

**Live:** https://diskusiva.vercel.app

## Fitur

- **Daftar diskusi**: 12 thread contoh (judul, kategori, author dengan
  avatar inisial berwarna + badge role Admin/Moderator/Kontributor/Member,
  jumlah balasan, upvote, jumlah dilihat, waktu relatif) + indikator
  "Terjawab" untuk diskusi yang sudah punya jawaban terbaik.
- **Detail thread**: pertanyaan lengkap + balasan satu level, upvote
  thread & balasan, tombol tandai/lepas "jawaban terbaik" (jawaban
  terbaik selalu naik ke atas), form balas langsung, dan tombol bagikan
  (salin tautan).
- **Buat diskusi baru**: form judul, kategori, isi multi-paragraf, dan
  tag opsional dengan validasi inline — langsung terbuka setelah
  diterbitkan.
- **Pencarian + urutan**: cari judul/isi/tag, urutkan terbaru (aktivitas
  terakhir) atau teratas (upvote tertinggi).
- **Sidebar**: kategori dengan jumlah thread, top kontributor (poin &
  gelar kontribusi), aturan singkat forum, dan kartu CTA.
- **Statistik forum** dihitung langsung dari data: jumlah diskusi,
  balasan, terjawab, dan total dilihat.
- Semua perubahan (diskusi baru, balasan, upvote, jawaban terbaik)
  tersimpan di **localStorage** — refresh tidak menghilangkan data, dan
  tombol "Reset data contoh" mengembalikan seed awal.
- Responsif desktop + mobile (sidebar turun ke bawah, kategori jadi chip
  scroll di atas), animasi halus Framer Motion, ikon Lucide, tanpa
  backend & tanpa library chart.

## Untuk siapa demo ini?

Komunitas produk, kelas online, asosiasi profesi, atau brand yang butuh
ruang tanya-jawab bermutu — tempat pertanyaan pelanggan/anggota dijawab
secara terstruktur dan jawaban terbaik tetap terarsip.

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (token tema `@theme`)
- Framer Motion
- Lucide Icons
- Avatar inisial berwarna (tanpa foto orang)

## Menjalankan

```bash
npm install
npm run dev      # development
npm run build    # production build ke folder dist/
npm run preview  # preview hasil build
```

---

Dibuat oleh [Agni Miftah Fauzi](https://github.com/Atazyyy) — jasa pembuatan
website & web app.
