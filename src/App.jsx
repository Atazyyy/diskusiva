import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Forum from "./components/Forum";
import ThreadDetail from "./components/ThreadDetail";
import NewThread from "./components/NewThread";
import { useThreads } from "./hooks/useThreads";

export default function App() {
  const [view, setView] = useState("forum"); // forum | detail | new
  const [activeId, setActiveId] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const {
    threads,
    getThread,
    addThread,
    addReply,
    toggleVote,
    toggleBest,
    reset,
  } = useThreads();

  const navigate = useCallback((v) => {
    setView(v);
    window.scrollTo({ top: 0 });
  }, []);

  const openThread = useCallback(
    (id) => {
      setActiveId(id);
      navigate("detail");
    },
    [navigate]
  );

  const createThread = useCallback(
    (data) => {
      const id = addThread(data);
      setActiveId(id);
      navigate("detail");
      return id;
    },
    [addThread, navigate]
  );

  const handleReply = useCallback(
    (body) => {
      if (activeId) addReply(activeId, body);
    },
    [activeId, addReply]
  );

  const handleVote = useCallback(
    (replyId) => {
      if (activeId) toggleVote(activeId, replyId);
    },
    [activeId, toggleVote]
  );

  const handleToggleBest = useCallback(
    (replyId) => {
      if (activeId) toggleBest(activeId, replyId);
    },
    [activeId, toggleBest]
  );

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased">
      <Navbar view={view === "detail" ? "forum" : view} onNavigate={navigate} />
      <main className="flex-1 pb-16 sm:pb-0">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          {view === "forum" && (
            <Forum
              threads={threads}
              onOpenThread={openThread}
              activeCategory={activeCategory}
              onSelectCategory={(c) => {
                setActiveCategory(c);
                window.scrollTo({ top: 0 });
              }}
              onNewThread={() => navigate("new")}
            />
          )}
          {view === "detail" && (
            <ThreadDetail
              thread={getThread(activeId)}
              onBack={() => navigate("forum")}
              onReply={handleReply}
              onVote={handleVote}
              onToggleBest={handleToggleBest}
            />
          )}
          {view === "new" && (
            <NewThread onBack={() => navigate("forum")} onCreate={createThread} />
          )}
        </div>
      </main>
      <Footer />

      {/* Reset data contoh — kecil, tidak mengganggu */}
      {view === "forum" && (
        <button
          onClick={() => {
            if (
              window.confirm(
                "Kembalikan semua data contoh? Diskusi & balasan yang kamu buat akan hilang."
              )
            ) {
              reset();
            }
          }}
          className="fixed bottom-16 right-4 z-20 rounded-full border border-edge bg-card px-3 py-2 text-[11px] font-bold text-mute shadow-sm transition-colors hover:border-azure/50 hover:text-azure sm:bottom-4 sm:right-6"
        >
          Reset data contoh
        </button>
      )}
    </div>
  );
}
