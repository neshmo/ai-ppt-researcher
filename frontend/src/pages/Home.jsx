import React, { useState } from "react";
import InputBox from "../components/InputBox";
import OutputBox from "../components/OutputBox";
import Loader from "../components/Loader";
import { connectWebSocket } from "../api/socket";
import ChartPreviewGrid from "../components/ChartPreviewGrid";

function Home() {
  const [charts, setCharts] = useState([]);
  const [topic, setTopic] = useState("");
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert("Enter a topic");
      return;
    }

    setLoading(true);
    setProgress("");
    setResult(null);
    setCharts([]);

    const ws = await connectWebSocket(topic);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Update generic progress message
      if (data.message) {
        setProgress(data.message);
      }

      // Handle chart events
      if (data.type === "chart_generated" && data.chart_path) {
        setCharts((prev) => [...prev, data.chart_path]);
      }

      if (data.status === "DONE") {
        setResult(data);
        setLoading(false);
        ws.close();
      }

      if (data.status === "ERROR") {
        alert(data.message);
        setLoading(false);
        ws.close();
      }
    };
  };

  return (
    <div className="home">
      <h1>AI Research Agent (Live Mode)</h1>
      <InputBox topic={topic} setTopic={setTopic} onGenerate={handleGenerate} />

      {loading && <Loader />}

      {progress && <p style={{ marginTop: "10px", color: "#9ca3af" }}>{progress}</p>}

      {/* Chart preview grid */}
      <ChartPreviewGrid charts={charts} />

      {result && <OutputBox data={result} />}
    </div>
  );
}

export default Home;
