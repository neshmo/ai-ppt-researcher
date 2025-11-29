import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, PenTool, Layout, CheckCircle2, Terminal } from "lucide-react";

const getIconForEvent = (event) => {
    const lower = event.toLowerCase();
    if (lower.includes("search")) return <Search className="h-4 w-4" />;
    if (lower.includes("extract") || lower.includes("read")) return <FileText className="h-4 w-4" />;
    if (lower.includes("write") || lower.includes("draft")) return <PenTool className="h-4 w-4" />;
    if (lower.includes("ppt") || lower.includes("slide")) return <Layout className="h-4 w-4" />;
    if (lower.includes("done")) return <CheckCircle2 className="h-4 w-4" />;
    return <Terminal className="h-4 w-4" />;
};

export default function EventFeed({ events }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [events]);

    if (!events || events.length === 0) return null;

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Activity Log</h3>
                <span className="text-xs text-slate-600 bg-slate-900/50 px-2 py-1 rounded-full border border-slate-800">
                    {events.length} events
                </span>
            </div>

            <div
                ref={scrollRef}
                className="max-h-[400px] overflow-y-auto scrollbar-hide space-y-3 p-2 mask-linear-fade"
            >
                <AnimatePresence initial={false}>
                    {events.map((ev, i) => {
                        const isDone = ev.event === "done";
                        const isError = ev.event === "error";

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className={`
                                    relative p-4 rounded-xl border backdrop-blur-md transition-all duration-300
                                    ${isDone
                                        ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                        : isError
                                            ? "bg-red-500/10 border-red-500/30"
                                            : "bg-slate-900/60 border-white/5 hover:border-white/10 hover:bg-slate-800/60"
                                    }
                                `}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`
                                        mt-0.5 p-1.5 rounded-lg
                                        ${isDone ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/10 text-blue-400"}
                                    `}>
                                        {getIconForEvent(ev.event)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-xs font-bold uppercase tracking-wider ${isDone ? "text-emerald-400" : "text-blue-400"}`}>
                                                {ev.event}
                                            </span>
                                            <span className="text-[10px] text-slate-600 font-mono">
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                            {ev.message}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
