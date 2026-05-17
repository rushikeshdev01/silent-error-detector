export default function OutputPanel({ result, loading }) {
  if (loading) {
    return (
      <div className="p-4 font-mono text-sm">
        <span className="text-accent animate-pulse-dim">▋ running...</span>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="p-4 font-mono text-xs text-muted">
        — no output yet. hit run to execute your code —
      </div>
    );
  }

  const { stdout, stderr, exit_code } = result;
  const success = exit_code === 0;

  return (
    <div className="p-4 font-mono text-sm space-y-3 animate-fade-up">
      {/* Exit status badge */}
      <div className="flex items-center gap-2">
        <span
          className={`text-xs px-2 py-0.5 rounded font-bold ${
            success ? "bg-accent/10 text-accent" : "bg-danger/10 text-danger"
          }`}
        >
          exit {exit_code}
        </span>
        <span className="text-xs text-dim">
          {success ? "process exited cleanly" : "process exited with error"}
        </span>
      </div>

      {/* stdout */}
      {stdout && (
        <div>
          <div className="text-xs text-dim mb-1">stdout</div>
          <pre className="text-accent/90 whitespace-pre-wrap leading-relaxed text-xs">
            {stdout}
          </pre>
        </div>
      )}

      {/* stderr */}
      {stderr && (
        <div>
          <div className="text-xs text-dim mb-1">stderr</div>
          <pre className="text-danger/90 whitespace-pre-wrap leading-relaxed text-xs">
            {stderr}
          </pre>
        </div>
      )}

      {!stdout && !stderr && (
        <p className="text-dim text-xs">(no output produced)</p>
      )}
    </div>
  );
}
