import { useState } from "react";
import Navbar from "../components/Navbar";
import OutputPanel from "../components/OutputPanel";
import AIFeedback from "../components/AIFeedback";
import RunButton from "../components/RunButton";
import { useAnalysis } from "../hooks/useAnalysis";
import MonacoEditor from "@monaco-editor/react";

const STARTER_CODE = `# Write your Python code here
def calculate_average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)

scores = [85, 92, 78, 95, 88]
print("Average:", calculate_average(scores))
print("Average of empty list:", calculate_average([]))
`;

export default function EditorPage() {
  const [code, setCode] = useState(STARTER_CODE);
  const { result, loading, error, analyze } = useAnalysis();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#0d0f14",
        color: "#e2e8f0",
      }}
    >
      <Navbar />

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* LEFT: Editor */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              background: "#13161e",
              borderBottom: "1px solid #1f2433",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#6b7280",
              }}
            >
              main.py
            </span>
            <div style={{ marginLeft: "auto" }}>
              <RunButton onClick={() => analyze(code)} loading={loading} />
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>
            <MonacoEditor
              height="100%"
              defaultLanguage="python"
              value={code}
              onChange={setCode}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                padding: { top: 16 },
                tabSize: 4,
              }}
            />
          </div>
        </div>

        {/* RIGHT: Output + AI */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "420px",
            background: "#13161e",
            borderLeft: "1px solid #1f2433",
          }}
        >
          <div
            style={{
              flex: "0 0 45%",
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid #1f2433",
            }}
          >
            <div
              style={{ padding: "8px 16px", borderBottom: "1px solid #1f2433" }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#6b7280",
                }}
              >
                OUTPUT
              </span>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <OutputPanel result={result} loading={loading} />
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <div
              style={{ padding: "8px 16px", borderBottom: "1px solid #1f2433" }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#6b7280",
                }}
              >
                AI DEBUG
              </span>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <AIFeedback result={result} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
