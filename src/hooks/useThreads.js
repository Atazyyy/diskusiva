import { useCallback, useEffect, useState } from "react";
import { buildThreads } from "../data/seed";

const KEY = "diskusiva-threads-v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return buildThreads();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr) || arr.length === 0) return buildThreads();
    return arr;
  } catch {
    return buildThreads();
  }
}

// Satu sumber kebenaran seluruh thread — perubahan (thread baru, balasan,
// upvote, jawaban terbaik) tersimpan di localStorage.
export function useThreads() {
  const [threads, setThreads] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(threads));
    } catch {
      // penyimpanan penuh / mode privat — abaikan, demo tetap jalan
    }
  }, [threads]);

  const patchThread = (threadId, fn) =>
    setThreads((list) =>
      list.map((t) => (t.id === threadId ? fn(t) : t))
    );

  const getThread = (id) => threads.find((t) => t.id === id) || null;

  // ---------- Aksi ----------

  const addThread = useCallback(({ title, category, body, tags }) => {
    const id = `u${Date.now()}`;
    const now = Date.now();
    const paragraphs = body
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    const thread = {
      id,
      title: title.trim(),
      category,
      authorId: "me",
      body: paragraphs.length ? paragraphs : [body.trim()],
      tags: (tags || [])
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean)
        .slice(0, 4),
      votes: 0,
      voted: false,
      views: 1,
      createdAt: now,
      updatedAt: now,
      replies: [],
      solved: false,
    };
    setThreads((list) => [thread, ...list]);
    return id;
  }, []);

  const addReply = useCallback((threadId, body) => {
    const now = Date.now();
    patchThread(threadId, (t) => ({
      ...t,
      updatedAt: now,
      replies: [
        ...t.replies,
        {
          id: `${t.id}-ur${now}`,
          authorId: "me",
          body: body.trim(),
          votes: 0,
          voted: false,
          best: false,
          createdAt: now,
        },
      ],
    }));
  }, []);

  // Upvote thread atau balasan (replyId null = thread utama)
  const toggleVote = useCallback((threadId, replyId = null) => {
    patchThread(threadId, (t) => {
      if (replyId === null) {
        if (t.voted) return { ...t, votes: t.votes - 1, voted: false };
        return { ...t, votes: t.votes + 1, voted: true };
      }
      return {
        ...t,
        replies: t.replies.map((r) =>
          r.id === replyId
            ? { ...r, votes: r.voted ? r.votes - 1 : r.votes + 1, voted: !r.voted }
            : r
        ),
      };
    });
  }, []);

  // Tandai / lepas jawaban terbaik (satu per thread)
  const toggleBest = useCallback((threadId, replyId) => {
    patchThread(threadId, (t) => {
      const isBestNow = t.replies.find((r) => r.id === replyId)?.best;
      return {
        ...t,
        solved: !isBestNow,
        replies: t.replies.map((r) => ({ ...r, best: !isBestNow && r.id === replyId })),
      };
    });
  }, []);

  const reset = useCallback(() => setThreads(buildThreads()), []);

  return { threads, getThread, addThread, addReply, toggleVote, toggleBest, reset };
}
