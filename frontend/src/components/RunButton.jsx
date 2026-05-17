export default function RunButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        flex items-center gap-2 px-5 py-2 rounded
        font-mono text-sm font-bold tracking-wider uppercase
        transition-all duration-150 border
        ${
          loading
            ? "bg-surface border-border text-dim cursor-not-allowed"
            : "bg-accent/10 border-accent text-accent hover:bg-accent hover:text-bg active:scale-95"
        }
      `}
    >
      {loading ? (
        <>
          <span className="w-3 h-3 border border-dim border-t-text rounded-full animate-spin" />
          running
        </>
      ) : (
        <>
          <span className="text-base leading-none">▶</span>
          run
        </>
      )}
    </button>
  );
}
