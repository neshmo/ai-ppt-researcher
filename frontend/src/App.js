import React, { useState, useEffect, useRef } from "react";
import InputBox from "./components/InputBox";
import HistorySidebar from "./components/HistorySidebar";
import StepTracker from "./components/StepTracker";
import EventFeed from "./components/EventFeed";
import ResultPanel from "./components/ResultPanel";
import Loader from "./components/Loader";
import ThemeSelector from "./components/ThemeSelector";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const [topic, setTopic] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pptUrl, setPptUrl] = useState(null);
  const { themeConfig } = useTheme();

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events]);

  // Fake timeline sequence to mimic streaming
  const simulateProgress = async () => {
    const steps = [
      "Searching the web…",
      "Collecting sources…",
      "Analyzing content…",
      "Generating insights…",
      "Creating deck structure…",
      "Designing slides…",
      "Finalizing PPT…",
    ];

    for (const step of steps) {
      setEvents(prev => [...prev, { event: "progress", message: step }]);
      await new Promise(res => setTimeout(res, 700)); // small delay
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    // Add to history
    try {
      const historyItem = { topic, timestamp: new Date().toISOString() };
      const history = JSON.parse(localStorage.getItem('deepresearch_history') || '[]');
      // Avoid duplicates at top
      const newHistory = [historyItem, ...history.filter(h => h.topic !== topic)].slice(0, 10);
      localStorage.setItem('deepresearch_history', JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to save history", e);
    }

    setEvents([]);
    setPptUrl(null);
    setLoading(true);

    simulateProgress(); // run the fake progress timeline

    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, max_sources: 5, theme_config: themeConfig }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Generation failed");

      setPptUrl(data.ppt_url);

      // Final event
      setEvents(prev => [...prev, { event: "done", message: "Research completed!" }]);
    } catch (err) {
      console.error(err);
      setEvents(prev => [...prev, { event: "error", message: err.message }]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-slate-200 selection:bg-blue-500/30 overflow-x-hidden">
      <HistorySidebar onSelectTopic={setTopic} />

      {/* Background Gradients - Keeping original look */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 w-[60%] h-[60%] bg-slate-900/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 max-w-7xl mx-auto">

        {/* Header */}
        <header className="w-full flex flex-col items-center mb-16 mt-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full 
            bg-white/5 border border-white/10 text-blue-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg"
            style={{ color: themeConfig.brand_primary }}
          >
            AI Research Agent v2.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text 
            bg-gradient-to-b from-white via-slate-200 to-slate-500 font-heading"
            style={{ fontFamily: themeConfig.font_family }}
          >
            Deep Research
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl leading-relaxed"
          >
            Autonomous agent that researches any topic, aggregates data,
            and generates professional PowerPoint presentations.
          </motion.p>
        </header>

        {/* Main Content */}
        <main className="w-full flex flex-col gap-12 pb-20">

          {/* Input Section */}
          <div className="flex flex-col gap-4">
            <InputBox value={topic} onChange={setTopic} onGenerate={handleGenerate} loading={loading} />
            <ThemeSelector />
          </div>

          {/* Results & Progress Grid */}
          <AnimatePresence>
            {(loading || events.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full"
              >

                {/* Left Column: Timeline (Sticky) */}
                <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit space-y-6">
                  <StepTracker events={events} />
                </div>

                {/* Right Column: Feed & Results */}
                <div className="lg:col-span-8 flex flex-col gap-8">

                  {loading && (
                    <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[200px]">
                      <Loader />
                    </div>
                  )}

                  {/* Event Feed */}
                  <EventFeed events={events} />

                  {/* Result Panel */}
                  {pptUrl && (
                    <div className="mt-4">
                      <ResultPanel pptUrl={pptUrl} />
                    </div>
                  )}

                  <div ref={bottomRef}></div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </main>

        {/* Footer */}
        <footer className="mt-auto py-8 text-slate-600 text-sm font-medium border-t border-white/5 w-full text-center">
          &copy; {new Date().getFullYear()} AI Research Agent. Built with React & Python.
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
