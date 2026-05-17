import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

export const STARTER_CODE = `# Write your Python code here
# The AI will detect runtime AND logical errors

def calculate_average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)

scores = [85, 92, 78, 95, 88]
print("Average:", calculate_average(scores))
print("Average of empty list:", calculate_average([]))
`;

export default function Editor({ code, onChange }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex-1 min-h-0 border-b border-border relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface z-10">
          <span className="font-mono text-xs text-dim animate-pulse">
            loading editor...
          </span>
        </div>
      )}
      <MonacoEditor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={onChange}
        theme="vs-dark"
        onMount={() => setIsLoading(false)}
        options={{
          fontSize: 14,
          fontFamily: '"JetBrains Mono", monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          padding: { top: 16, bottom: 16 },
          tabSize: 4,
        }}
      />
    </div>
  );
}
