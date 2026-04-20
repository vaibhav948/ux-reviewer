import { useState } from "react";
import axios from "axios";

type HistoryItemType = [string, string];

function HistoryCard({
  item,
}: {
  item: HistoryItemType;
}) {
  const [open, setOpen] = useState(false);

  const url = item[0];
  let result: any = null;

  try {
    result = JSON.parse(item[1]);
  } catch (e) {
    result = null;
  }

  return (
    <div
      style={{
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "10px",
        background: "#020617",
        border: "1px solid #1e293b",
      }}
    >
      {/* URL */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        style={{
          color: "#6366f1",
          fontWeight: "bold",
          textDecoration: "none",
          wordBreak: "break-all",
        }}
      >
        {url}
      </a>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          marginTop: "8px",
          padding: "6px 12px",
          borderRadius: "6px",
          background: "#6366f1",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {open ? "Hide Details" : "View Full Details"}
      </button>

      {/* Expanded view */}
      {open && result && (
        <div style={{ marginTop: "12px" }}>
          {/* SCORE */}
          <div style={{ color: "#22c55e", fontWeight: "bold" }}>
            Score: {result.score}/100
          </div>

          {/* ISSUES FULL DETAIL */}
          <div>
            <h4 style={{ marginBottom: "8px", color: "#e2e8f0" }}>
              Issues
            </h4>

            {result.issues?.map((issue: any, idx: number) => (
              <div
                key={idx}
                style={{
                  background: "#020617",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              >
                <b style={{ color: "#60a5fa" }}>
                  {issue.category}
                </b>

                <p style={{ margin: "6px 0", fontSize: "13px" }}>
                  <b>Issue:</b> {issue.issue}
                </p>

                <p style={{ margin: "6px 0", fontSize: "12px", color: "#94a3b8" }}>
                  <b>Why:</b> {issue.why}
                </p>

                <p style={{ fontSize: "11px", color: "#64748b" }}>
                  <b>Proof:</b> {issue.proof}
                </p>
              </div>
            ))}
          </div>

          {/* FIXES */}
          <div style={{ marginTop: "10px" }}>
            <h4 style={{ marginBottom: "8px", color: "#e2e8f0" }}>
              Top Fixes
            </h4>

            {result.top_fixes?.map((fix: any, idx: number) => (
              <div
                key={idx}
                style={{
                  background: "#020617",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              >
                <p style={{ color: "#ef4444", fontSize: "13px" }}>
                  <b>Before:</b> {fix.before}
                </p>

                <p style={{ color: "#22c55e", fontSize: "13px" }}>
                  <b>After:</b> {fix.after}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [history, setHistory] = useState<HistoryItemType[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      setData(null);

      const res = await axios.post("https://ux-reviewer-7.onrender.com/analyze", {
        url,
      });

      setData(res.data);
    } catch (err: any) {
      alert(err?.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get("https://ux-reviewer-7.onrender.com/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        {/* HEADER */}
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
          UX Reviewer AI
        </h1>
        <p style={{ color: "#94a3b8" }}>
          AI-powered UX analysis tool
        </p>

        {/* INPUT */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
            }}
          />

          <button
            onClick={handleAnalyze}
            style={{
              padding: "10px 16px",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {/* HISTORY BUTTON */}
        <button
          onClick={() => {
            setShowHistory(!showHistory);
            if (!showHistory) fetchHistory();
          }}
          style={{
            marginTop: "15px",
            color: "#60a5fa",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showHistory ? "Hide History" : "Show Last 5 Reviews"}
        </button>

        {/* HISTORY */}
        {showHistory && (
          <div style={{ marginTop: "15px" }}>
            {history.length === 0 ? (
              <p style={{ color: "#94a3b8" }}>No history yet</p>
            ) : (
              history.map((item, i) => (
                <HistoryCard key={i} item={item} />
              ))
            )}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <p style={{ marginTop: "20px", color: "#94a3b8" }}>
            Analyzing website...
          </p>
        )}

        {/* RESULT */}
        {data && (
          <div style={{ marginTop: "25px" }}>
            <h2>{data.content.title}</h2>

            <div style={{ marginTop: "10px" }}>
              <b>Score:</b> {data.analysis.score}/100
            </div>

            <h3 style={{ marginTop: "20px" }}>Issues</h3>

            {data.analysis.issues.map((issue: any, i: number) => (
              <div
                key={i}
                style={{
                  background: "#020617",
                  border: "1px solid #1e293b",
                  padding: "12px",
                  marginTop: "10px",
                  borderRadius: "10px",
                }}
              >
                <b style={{ color: "#60a5fa" }}>
                  {issue.category}
                </b>
                <p>{issue.issue}</p>
                <p style={{ color: "#94a3b8", fontSize: "12px" }}>
                  {issue.why}
                </p>
              </div>
            ))}

            <h3 style={{ marginTop: "20px" }}>Top Fixes</h3>

            {data.analysis.top_fixes.map((fix: any, i: number) => (
              <div
                key={i}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  border: "1px solid #1e293b",
                  borderRadius: "10px",
                }}
              >
                <p style={{ color: "#ef4444" }}>
                  <b>Before:</b> {fix.before}
                </p>
                <p style={{ color: "#22c55e" }}>
                  <b>After:</b> {fix.after}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
