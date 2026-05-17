export default function AIFeedback({ result, loading, error }) {
  if (loading) {
    return (
      <div className="p-4 space-y-2">
        <div className="text-xs text-dim font-mono mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-info animate-pulse-dim" />
          ai is thinking...
        </div>
        {[80, 60, 90, 50].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded bg-border animate-pulse"
            style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 animate-fade-up">
        <div className="text-xs text-danger font-mono mb-1">error</div>
        <p className="text-danger/80 text-sm font-sans">{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="p-4 font-mono text-xs text-muted">
        — ai feedback will appear here after you run your code —
      </div>
    );
  }

  const { exit_code, ai_feedback } = result;
  const hasError = exit_code !== 0;

  return (
    <div className="p-4 animate-fade-up">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-info" />
        <span className="font-mono text-xs text-info">ai analysis</span>
        <span
          className={`ml-auto text-xs px-2 py-0.5 rounded font-mono ${
            hasError ? "bg-danger/10 text-danger" : "bg-warn/10 text-warn"
          }`}
        >
          {hasError ? "errors found" : "check logic"}
        </span>
      </div>

      {/* AI text */}
      <div className="text-sm font-sans text-text/90 leading-relaxed whitespace-pre-wrap">
        {ai_feedback}
      </div>
    </div>
  );
}
