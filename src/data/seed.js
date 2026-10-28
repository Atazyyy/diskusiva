// Data contoh Diskusiva — seluruh nama, diskusi, dan angka bersifat FIKTIF.
// Timestamp dihitung relatif terhadap waktu halaman dibuka supaya demo
// selalu terlihat "hidup" (ada diskusi baru hari ini, balasan jam terakhir, dsb).

const H = 3600000; // satu jam dalam ms

export const WA_NUMBER = "6281234567890";

export const CURRENT_USER = {
  id: "me",
  name: "Kamu",
  role: "Member",
  points: 12,
};

export const CATEGORIES = [
  { id: "teknologi", label: "Teknologi" },
  { id: "karier", label: "Karier" },
  { id: "bisnis", label: "Bisnis & Usaha" },
  { id: "desain", label: "Desain & Kreatif" },
  { id: "finansial", label: "Finansial" },
  { id: "edukasi", label: "Edukasi" },
  { id: "lifestyle", label: "Gaya Hidup" },
];

export const ROLE_STYLE = {
  Admin: "bg-violet-100 text-violet-700",
  Moderator: "bg-azure-soft text-azure-deep",
  Kontributor: "bg-emerald-50 text-emerald-700",
  Member: "bg-slate-100 text-slate-600",
};

export const USERS = [
  { id: "u1", name: "Fatih Alamsyah", role: "Admin", points: 1840 },
  { id: "u2", name: "Nadia Prameswari", role: "Moderator", points: 1265 },
  { id: "u3", name: "Raka Ardiansyah", role: "Kontributor", points: 940 },
  { id: "u4", name: "Salsabila Putri", role: "Kontributor", points: 812 },
  { id: "u5", name: "Dimas Prayoga", role: "Member", points: 655 },
  { id: "u6", name: "Theresia Manurung", role: "Kontributor", points: 598 },
  { id: "u7", name: "Bagas Nugraha", role: "Member", points: 430 },
  { id: "u8", name: "Larissa Halim", role: "Member", points: 365 },
  { id: "u9", name: "Yoga Pratama", role: "Member", points: 280 },
  { id: "u10", name: "Anisa Fitriani", role: "Member", points: 245 },
];

export const userById = (id) =>
  id === "me" ? CURRENT_USER : USERS.find((u) => u.id === id) || CURRENT_USER;

export const categoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];

export const RULES = [
  {
    title: "Judul yang jelas",
    desc: "Tulis pertanyaan yang spesifik beserta konteksnya, supaya mudah dijawab.",
  },
  {
    title: "Sopan itu wajib",
    desc: "Tidak perlu kasar untuk jujur. Kritik idenya, bukan orangnya.",
  },
  {
    title: "Bagikan pengalaman",
    desc: "Cerita nyata lebih berharga daripada teori yang ditulis ulang.",
  },
  {
    title: "Tandai jawaban terbaik",
    desc: "Kalau masalahmu terpecahkan, tandai jawabannya supaya membantu orang lain.",
  },
];

const THREAD_SPECS = [
  {
    id: "t1",
    title:
      "Laptop bekas bisnis vs laptop baru biasa untuk kerja harian — mana yang lebih masuk akal?",
    category: "teknologi",
    authorId: "u5",
    votes: 34,
    views: 1240,
    hours: 26,
    tags: ["laptop", "belanja cerdas"],
    body: [
      "Saya kerja harian utamanya ngetik dokumen, rapat daring, dan kadang editing video pendek. Budget saya mentok, dan saya mulai bingung: ambil laptop bekas kelas bisnis (sering dijual murah karena stok perusahaan) atau laptop baru kelas biasa yang spesifikasinya lebih rendah?",
      "Yang saya takutkan dari bekas itu kondisi baterai dan garansi yang sudah habis. Tapi dari sisi build quality katanya jauh lebih awet. Kira-kira kalian pilih yang mana kalau di posisi saya?",
    ],
    replies: [
      {
        authorId: "u1",
        hours: 24,
        votes: 21,
        best: true,
        body: "Sudah 5 tahun pakai laptop bekas bisnis untuk kerja sehari-hari dan tidak pernah menyesal. Yang perlu dicek sebelum beli: siklus baterai (minta screenshot), total jam pemakaian, dan pastikan modelnya masih dapat suku cadang di Indonesia. Kalau dua syarat itu aman, kelas bisnis bekas hampir selalu menang dari laptop baru sekelas konsumen.",
      },
      {
        authorId: "u6",
        hours: 22,
        votes: 9,
        body: "Tambahan: cek juga apakah pengisian dayanya pakai charger standar USB-C. Kalau iya, keruhnya berkurang karena charger gampang dicari kalau yang bawaan rusak.",
      },
      {
        authorId: "u7",
        hours: 19,
        votes: 4,
        body: "Pengalaman saya beda sedikit — saya dapat unit bekas yang layarnya mulai bergaris setelah 8 bulan. Jadi saran saya, beli dari penjual yang kasih garansi toko minimal 7 hari, bukan beli butuh.",
      },
    ],
  },
  {
    id: "t2",
    title: "Pindah karier dari marketing ke bidang IT di umur 28 — terlambat atau malah tepat?",
    category: "karier",
    authorId: "u8",
    votes: 51,
    views: 2870,
    hours: 52,
    tags: ["pindah karier", "it", "umur 28"],
    body: [
      "Saya 28 tahun, sudah 5 tahun kerja di marketing, tapi selama ini yang paling saya nikmati justru bagian menganalisis data kampanye dan sekali-kali otak-atik spreadsheet sampai malam. Mulai terpikir untuk serius pindah ke jalur IT, tapi terus terang takut mulai dari bawah di umur segini.",
      "Ada di sini yang pernah pindah karier di akhir 20-an atau awal 30-an? Kira-kira realistis nggak, dan jalur mana yang biasanya paling ramah untuk orang yang datang dari non-IT?",
    ],
    replies: [
      {
        authorId: "u2",
        hours: 49,
        votes: 27,
        best: true,
        body: "Saya pindah dari admin ke data support di umur 30, dan setahun kemudian sudah jadi analyst junior. Yang menyelamatkan saya: jangan keluar dari kerja dulu, tapi pindahkan keahlianmu ke arah IT lewat posisi jembatan — marketing analytics, CRM support, atau product ops. Di sana pengalaman marketing-mu justru nilai tambah, bukan nol. Setelah masuk, belajar teknisnya jadi jauh lebih cepat karena kamu sudah punya konteks bisnis.",
      },
      {
        authorId: "u1",
        hours: 46,
        votes: 12,
        body: "28 itu masih muda banget dalam hitungan karier. Rata-rata orang mengganti karier 2-3 kali seumur hidup. Yang bikin gagal bukan umur, tapi berhenti belajar di bulan ketiga.",
      },
      {
        authorId: "u3",
        hours: 44,
        votes: 8,
        body: "Saran praktis: bangun 2-3 proyek kecil yang nyambung dengan kerjaan sekarang. Misalnya dashboard laporan kampanye yang diotomasi. Itu jadi bukti kerja paling kuat di CV, lebih dari sertifikat.",
      },
      {
        authorId: "u4",
        hours: 40,
        votes: 5,
        body: "Satu hal yang jarang dibahas: gaji awal di jalur baru biasanya turun dulu sebelum naik. Sisihkan dana cadangan minimal 4-6 bulan sebelum lakukan transisi.",
      },
    ],
  },
  {
    id: "t3",
    title: "Cara membagi gaji pertama 4 juta supaya tidak selalu krisis di tanggal tua?",
    category: "finansial",
    authorId: "u9",
    votes: 47,
    views: 3110,
    hours: 8,
    tags: ["gaji pertama", "anggaran"],
    body: [
      "Baru kerja 3 bulan, gaji bersih 4 juta, dan setiap tanggal 25 ke atas dompet saya pasti sekarat. Pengeluaran utama saya kos 1,2 juta, makan transport sisanya biasanya bocor entah kemana.",
      "Untuk kalian yang dulu juga mulai dari gaji sekecil ini, kira-kira rumus pembagiannya seperti apa yang benar-benar bertahan lama? Jangan yang teoretis ya, yang beneran jalan di lapangan.",
    ],
    replies: [
      {
        authorId: "u6",
        hours: 6,
        votes: 24,
        best: true,
        body: "Rumus yang saya pakai sejak gaji pertama dan sampai sekarang: 50% kebutuhan tetap (kos, makan, transport), 20% dana darurat yang langsung di-autodebit ke rekening terpisah di hari gajian, 10% untuk negara pada diri sendiri (kursus/alat kerja), sisanya 20% bebas tanpa rasa bersalah. Kuncinya bukan rumusnya, tapi autodebit di hari yang sama dengan gajian — uang yang tidak terlihat tidak akan terpakai.",
      },
      {
        authorId: "u3",
        hours: 5,
        votes: 11,
        body: "Catat pengeluaran mentah selama 30 hari dulu tanpa mengubah kebiasaan apa pun. Biasanya yang bikin kaget bukan makan utamanya, tapi belanja kecil yang kebagian ribuan kali.",
      },
      {
        authorId: "u5",
        hours: 4,
        votes: 7,
        body: "Tips kecil yang berpengaruh: pisahkan rekening 'jajan' dari rekening utama. Kalau saldo jajan habis, ya menunggu gajian. Tanpa niatan, tanpa drama.",
      },
    ],
  },
  {
    id: "t4",
    title:
      "Dengan fitur AI sekarang, apakah masih worth it belajar desain dari nol secara manual?",
    category: "desain",
    authorId: "u10",
    votes: 62,
    views: 3540,
    hours: 31,
    tags: ["ai", "desain", "belajar"],
    body: [
      "Saya lagi setengah jalan belajar desain grafis secara otodidak — sudah paham dasar komposisi dan tipografi, tapi masih lambat. Teman-teman saya malah langsung generate hasil dari tool AI dan sudah dapat orderan lebih dulu.",
      "Jujur jadi bercabang: apakah saya lanjut mempertajam kemampuan manual, atau ikuti arus dan bikin AI sebagai skill utama? Bagi yang sudah kerja di bidang kreatif, bagaimana kalian melihat pergeseran ini?",
    ],
    replies: [
      {
        authorId: "u4",
        hours: 28,
        votes: 31,
        best: true,
        body: "Yang dibayar mahal bukan orang yang bisa memakai tool, tapi orang yang tahu hasil seperti apa yang pantas dibayar. AI membuat pembuatan gambar jadi murah, dan justru karena itu selera serta penilaian kritis kalian jadi aset paling langka. Latihan manual itu cara membangun selera itu. Jadi jawabannya bukan salah satu, tapi: kuasai dasar lebih dalam, lalu pakai AI untuk mempercepat eksekusi.",
      },
      {
        authorId: "u2",
        hours: 26,
        votes: 14,
        body: "Dari sisi moderator: topik ini muncul tiap bulan dan jawabannya konsisten — tool akan terus berganti, tapi fondasi tidak usang. Belajar manual sekarang = investasi yang tidak tergantung satu tool.",
      },
      {
        authorId: "u7",
        hours: 23,
        votes: 9,
        body: "Pengalaman jujur: klien saya malah minta revisi hasil AI karena 'kurang niat' terus. Yang selamat adalah orang yang bisa memperbaiki hasil AI, bukan yang cuma bisa menekan tombol generate.",
      },
      {
        authorId: "u9",
        hours: 20,
        votes: 6,
        body: "Menambahkan: mulai sekarang biasakan dokumentasi proses kerjamu. Portofolio yang menunjukkan cara berpikir jauh lebih tahan terhadap gelombang AI daripada gambar jadi saja.",
      },
    ],
  },
  {
    id: "t5",
    title: "Mulai usaha kopi dari rumah dengan modal di bawah 3 juta, realistis atau buaya nganga?",
    category: "bisnis",
    authorId: "u7",
    votes: 28,
    views: 1990,
    hours: 76,
    tags: ["usaha rumahan", "kopi", "modal kecil"],
    body: [
      "Saya tinggal di lingkungan yang ramai anak kost dan kantor kecil. Ide saya sederhana: kopi susu dan americano pesanan antar dalam radius 1 km, tanpa ruang duduk, tanpa dekorasi mewah.",
      "Dengan modal 3 juta — mesin espresso manual sekelas pemula, kulkas kecil, bahan dua minggu, dan cetak stiker — kira-kira masih masuk akal nggak? Atau saya yang terlalu optimis?",
    ],
    replies: [
      {
        authorId: "u3",
        hours: 72,
        votes: 17,
        best: true,
        body: "Realistis, tapi syaratnya satu: hitung biaya per cup dengan jujur termasuk cup, sedotan, gas, listrik, dan bahan yang terbuang. Banyak usaha rumahan gagal bukan karena sepi, tapi karena menjual di bawah biaya tanpa sadar. Mulai dari menu 2 produk saja sampai repeat order harian stabil, baru tambah menu. Dua minggu pertama anggap saja biaya riset, bukan untung rugi.",
      },
      {
        authorId: "u6",
        hours: 70,
        votes: 8,
        body: "Dari sisi pemasaran: di radius 1 km, yang menentukan bukan harga tapi konsistensi jam buka. Anak kost loyalnya ke yang selalu ada di jam yang sama, bukan ke yang terenak.",
      },
      {
        authorId: "u1",
        hours: 65,
        votes: 6,
        body: "Satu tambahan dari sisi admin komunitas: banyak anggota di sini yang jalani model yang sama. Kalau mau, buka thread kemajuan mingguan — biasanya masukan yang masuk jauh lebih tajam kalau kita terbuka soal angka.",
      },
    ],
  },
  {
    id: "t6",
    title: "Website portofolio saya loading-nya masih lambat padahal gambar sudah dikompres. Apa yang sering kelupaan?",
    category: "teknologi",
    authorId: "u10",
    votes: 19,
    views: 980,
    hours: 5,
    tags: ["web", "performa", "portofolio"],
    body: [
      "Sudah ubah semua gambar ke format modern dan kompres agresif, tapi saat dites di koneksi lambat halaman portofolio saya tetap terasa berat beberapa detik pertama.",
      "Kalau dari kalian yang lebih berpengalaman, biasanya selain gambar, apa sih penyebab lambat yang paling sering luput dari perhatian pemula?",
    ],
    replies: [
      {
        authorId: "u1",
        hours: 4,
        votes: 13,
        body: "Tiga tersangka utama yang jarang dicek pemula: (1) font kustom yang diunduh penuh sebelum teks tampil, (2) animasi library yang ikut termuat walau hanya dipakai di satu halaman, (3) gambar yang dimuat semua sekaligus padahal tidak terlihat di layar pertama. Coba tes lagi setelah font disetel agar tidak memblokir tampilan awal — sering ini saja sudah memangkas separuh kelambatan.",
      },
      {
        authorId: "u3",
        hours: 3,
        votes: 6,
        body: "Jangan lupa cek juga ukuran bundle JavaScript di panel jaringan browser. Sering ada satu library besar yang dipakai cuma untuk satu animasi kecil.",
      },
    ],
  },
  {
    id: "t7",
    title:
      "Belajar bahasa Inggris otodidak selama setahun — ringkasan metode yang benar-benar bikin saya berani ngobrol",
    category: "edukasi",
    authorId: "u3",
    votes: 55,
    views: 4020,
    hours: 100,
    tags: ["bahasa inggris", "otodidak"],
    body: [
      "Setahun lalu saya masih mumet pas ditanya turis jalanan. Sekarang saya bisa ngobrol santai 30 menit tanpa mental keburu collapse. Bukan pinter-pinter amat, tapi dari nol ke bisa, dan ada beberapa hal yang ternyata salah prioritas dari cara saya belajar sebelumnya.",
      "Intinya: 6 bulan pertama saya buang waktu nonton konten tanpa mencatat dan tanpa bicara. Yang mengubah semuanya adalah rutinitas sederhana — miring ke praktik bicara sejak minggu kedua, walau hasilnya kacau. Di bawah saya tulis ringkasan lengkapnya; silakan pakai, dan koreksi kalau ada yang menurut kalian keliru.",
    ],
    replies: [
      {
        authorId: "u6",
        hours: 96,
        votes: 19,
        best: true,
        body: "Poin 'bicara sejak minggu kedua walau kacau' ini persis yang saya alami juga. Satu tambahan dari saya: rekam diri bicara 2 menit tiap hari, lalu dengar ulang minggu depannya. Terasa brutal, tapi ini metode paling cepat untuk sadar kesalahan yang berulang.",
      },
      {
        authorId: "u4",
        hours: 92,
        votes: 8,
        body: "Setuju semua. Tambahan kecil: mulailah dari topik yang memang kamu kuasai di bahasa Indonesia (hobi, kerjaan). Kosakata akan nempel jauh lebih cepat karena konteksnya sudah ada di kepala.",
      },
      {
        authorId: "u8",
        hours: 88,
        votes: 5,
        body: "Boleh minta ringkasan rutinitas mingguannya dalam bentuk jadwal? Kalau ada di thread ini, saya bookmark dulu deh.",
      },
    ],
  },
  {
    id: "t8",
    title: "Melamar tanpa pengalaman formal: apa yang bikin CV kamu tetap dibuka rekruter?",
    category: "karier",
    authorId: "u4",
    votes: 38,
    views: 2610,
    hours: 15,
    tags: ["cv", "fresh graduate", "melamar"],
    body: [
      "Sering dapat pertanyaan dari adik-adik yang baru lulus: CV-nya kosong melompong karena belum pernah kerja formal. Padahal banyak dari mereka punya proyek kelas, organisasi, atau kerja lepas kecil yang tidak pernah mereka anggap 'pengalaman'.",
      "Dari sisi kalian yang pernah merekrut atau berhasil lolos tanpa pengalaman formal, elemen apa di CV yang paling menolong? Dan mana yang justru jadi tanda bahaya?",
    ],
    replies: [
      {
        authorId: "u1",
        hours: 12,
        votes: 22,
        best: true,
        body: "Perekrut tidak mencari pengalaman kerja, mereka mencari bukti bahwa kamu bisa menyelesaikan sesuatu. Proyek kelas yang berakhir jadi barang jadi, acara organisasi yang anggarannya kamu kelola, atau kerja lepas kecil dengan hasil terukur — semuanya valid kalau ditulis dengan format hasil, bukan tugas. Contoh: bukan 'membantu acara seminar', tapi 'mengelola pendaftaran 300+ peserta dengan formulir daring'. Yang jadi tanda bahaya justru CV yang hanya daftar tugas tanpa satu angka pun.",
      },
      {
        authorId: "u2",
        hours: 10,
        votes: 9,
        body: "Dari yang saya amati di forum ini: tautan portofolio yang aktif dan ringkas menaikkan peluang dibuka jauh lebih besar daripada daftar sertifikat panjang.",
      },
      {
        authorId: "u9",
        hours: 8,
        votes: 4,
        body: "Satu tips kecil: sesuaikan 3 baris pertama CV dengan kata kunci di lowongan. Bagian itu yang paling sering dibaca, sisanya biasanya dipindai.",
      },
    ],
  },
  {
    id: "t9",
    title: "Dua minggu mencoba kerja fokus 3 jam pagi tanpa sentuh HP — laporan jujur hasilnya",
    category: "lifestyle",
    authorId: "u5",
    votes: 22,
    views: 1340,
    hours: 45,
    tags: ["kebiasaan", "produktivitas"],
    body: [
      "Dua minggu lalu saya mulai kebiasaan baru: tiga jam pertama setiap pagi dipakai untuk pekerjaan paling berat, sementara HP tetap di ruang lain. Tidak ada teknik rumit, cuma itu.",
      "Hasilnya tidak securam artikel-artikel produktivitas, tapi ada satu perubahan yang sama sekali tidak saya duga. Mau share hasil lengkapnya di sini, sekalian tanya: kalian ada trik apa untuk bertahan melewati minggu kedua, di mana efek 'semangat baru' mulai habis?",
    ],
    replies: [
      {
        authorId: "u4",
        hours: 42,
        votes: 10,
        body: "Minggu kedua adalah titik balik — yang menolong saya: definisikan 'selesai' hari sebelumnya. Kalau pagi masih perlu mikir mau kerja apa, otak akan cari jalan keluar termudah: ponsel.",
      },
      {
        authorId: "u7",
        hours: 39,
        votes: 7,
        body: "Laporan satu orang ini kurang seru kalau sendirian. Yang lain yang sedang coba kebiasaan mirip, yuk lapor di sini juga tiap minggu. Biar ada tekanan positif.",
      },
    ],
  },
  {
    id: "t10",
    title: "Niat belajar coding di 2026: mulai dari bikin tampilan web dulu atau langsung ke dasar-dasar ilmu komputer?",
    category: "teknologi",
    authorId: "u8",
    votes: 44,
    views: 2980,
    hours: 64,
    tags: ["coding", "pemula", "belajar"],
    body: [
      "Ini pertanyaan klasik, tapi saya butuh jawaban yang kontekstual. Tujuan saya bukan jadi engineer di perusahaan besar — saya ingin bisa membangun alat kecil untuk usaha keluarga dan mungkin menerima proyek lepas sederhana dalam 1-2 tahun.",
      "Dengan tujuan segitu, apakah lebih efisien mulai dari membuat halaman web langsung dan belajar dasar-dasar sambil jalan, atau harus bangun fondasi teori dulu?",
    ],
    replies: [
      {
        authorId: "u1",
        hours: 60,
        votes: 26,
        best: true,
        body: "Untuk tujuanmu: mulai dari bikin sesuatu yang jalan, jangan dari teori. Fondasi ilmu komputer itu penting, tapi ia paling mudah dipelajari saat kamu sudah punya masalah nyata yang menjelaskan kenapa konsep itu ada. Urutan yang saya sarankan: buat satu halaman web sederhana dari tutorial, ubah-ubah sampai rusak, perbaiki, lalu ulangi dengan fitur kedua. Setelah tiga bulan punya 3-4 alat kecil yang dipakai orang sungguhan, baru belajar teori — di titik itu teori terasa seperti jawaban, bukan hafalan.",
      },
      {
        authorId: "u3",
        hours: 57,
        votes: 10,
        body: "Tambahan: pilih satu jalur dan tahan diri untuk tidak pindah-pindah selama 6 bulan. Musuh terbesar pemula bukan jalur yang salah, tapi gonta-ganti jalur tiap dua minggu.",
      },
      {
        authorId: "u6",
        hours: 54,
        votes: 7,
        body: "Dan jangan skip version control (menyimpan riwayat kode) walau terasa teknis. Dari minggu pertama saja sudah berguna, apalagi kalau mau kerja lepas.",
      },
      {
        authorId: "u10",
        hours: 50,
        votes: 3,
        body: "Turut bertanya di thread ini: kalau tujuannya alat internal usaha, perlu repot-repot belajar desain tampilan juga nggak ya, atau cukup pakai komponen siap pakai?",
      },
    ],
  },
  {
    id: "t11",
    title:
      "Jualan di marketplace kecil: stok tekor terus dan pesanan komplain numpuk. Kalian kelola gimana?",
    category: "bisnis",
    authorId: "u2",
    votes: 31,
    views: 1750,
    hours: 90,
    tags: ["jualan online", "operasional"],
    body: [
      "Toko kecil saya jual perlengkapan perabot rumah. Masalahnya klasik: stok catatan dan stok fisik sering beda, akhirnya ada pesanan masuk padahal barangnya sudah tidak ada, dan komplain pun berjatuhan.",
      "Sudah coba catat manual di buku, sudah coba aplikasi, tapi semua bolong-balik juga karena saya sendiri yang lalai. Bagi yang jalani toko sendirian, sistem seperti apa yang akhirnya bertahan lama di tangan kalian?",
    ],
    replies: [
      {
        authorId: "u7",
        hours: 85,
        votes: 15,
        best: true,
        body: "Yang menyelamatkan saya bukan aplikasi, tapi satu aturan fisik: stok di rak = angka yang dijual. Setiap malam sebelum tutup toko, foto rak selama 5 menit dan samakan angka jualan dengan kondisi nyata. Komplain tekor turun 90% karena sumbernya bukan salah catat, tapi barang yang sudah hilang tidak pernah dicatat. Aplikasi apapun tidak menolong kalau inputnya tidak jujur.",
      },
      {
        authorId: "u5",
        hours: 82,
        votes: 6,
        body: "Tambah dari pengalaman serupa: sediakan pesan simpanan untuk kasus tekor, jujur + tawarkan ganti dengan produk sejenis atau kirim bersamaan. Sebagian besar pembeli tidak masalah, yang bikin komplain membesar adalah diam.",
      },
    ],
  },
  {
    id: "t12",
    title: "Mohon masukan: portofolio desain pertama saya baru 3 proyek, layak ditawarkan ke klien atau tambah dulu?",
    category: "desain",
    authorId: "u10",
    votes: 16,
    views: 870,
    hours: 2,
    tags: ["portofolio", "freelance"],
    body: [
      "Saya baru selesai tiga proyek pribadi: identitas visual untuk usaha tetangga (gratis, tapi serius), ulang desain aplikasi fiktif, dan satu seri konten media sosial. Semuanya saya tata rapi di satu halaman web.",
      "Pertanyaannya: dengan isi segitu, sudah layak mulai menawarkan jasa ke klien kecil, atau lebih baik tambah 2-3 proyek lagi dulu? Takutnya malah buru-buru dan reputasi awal kena batu.",
    ],
    replies: [
      {
        authorId: "u4",
        hours: 1,
        votes: 5,
        body: "Tiga proyek serius dengan cerita proses yang jelas sudah lebih kuat daripada sepuluh proyek asal jadi. Satu yang perlu kamu siapkan bukan jumlah, tapi versi ceritanya: masalah apa, pilihan apa yang kamu ambil, dan hasilnya seperti apa. Klien kecil membeli kejelasan berpikirmu, bukan jumlah gambar.",
      },
    ],
  },
];

export function buildThreads() {
  const now = Date.now();
  return THREAD_SPECS.map((spec) => {
    const createdAt = now - spec.hours * H;
    const replies = spec.replies.map((r, i) => ({
      id: `${spec.id}-r${i + 1}`,
      authorId: r.authorId,
      body: r.body,
      votes: r.votes,
      voted: false,
      best: !!r.best,
      createdAt: now - r.hours * H,
    }));
    return {
      id: spec.id,
      title: spec.title,
      category: spec.category,
      authorId: spec.authorId,
      body: spec.body,
      tags: spec.tags,
      votes: spec.votes,
      voted: false,
      views: spec.views,
      createdAt,
      updatedAt: replies.length
        ? Math.max(...replies.map((r) => r.createdAt))
        : createdAt,
      replies,
      solved: replies.some((r) => r.best),
    };
  }).sort((a, b) => b.updatedAt - a.updatedAt);
}
