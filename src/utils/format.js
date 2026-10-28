export const num = (n) => n.toLocaleString("id-ID");

export const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const fmtTime = (ts) =>
  new Date(ts).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const fmtDateTime = (ts) => `${fmtDate(ts)}, ${fmtTime(ts)}`;

// "2 jam lalu" — label waktu ramah untuk feed forum
export const timeAgo = (ts) => {
  const diff = Date.now() - new Date(ts).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  return fmtDate(ts);
};

// Inisial nama untuk avatar: "Nadia Prameswari" -> "NP"
export const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

// Poin kontribusi -> gelar singkat untuk kartu kontributor
export const contributionLabel = (points) => {
  if (points >= 1500) return "Legenda forum";
  if (points >= 1000) return "Sangat aktif";
  if (points >= 500) return "Sering membantu";
  if (points >= 200) return "Mulai aktif";
  return "Anggota baru";
};
