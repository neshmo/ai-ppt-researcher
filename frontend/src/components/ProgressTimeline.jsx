import React from "react";
import { CheckCircle2, Circle, Loader2, FileText, Search, PenTool, Layout } from "lucide-react";

const getIconForEvent = (event) => {
    const lower = event.toLowerCase();
    if (lower.includes("search")) return <Search className="h-5 w-5" />;
    if (lower.includes("extract") || lower.includes("read")) return <FileText className="h-5 w-5" />;
    if (lower.includes("write") || lower.includes("draft")) return <PenTool className="h-5 w-5" />;
    if (lower.includes("ppt") || lower.includes("slide")) return <Layout className="h-5 w-5" />;
    return <Circle className="h-5 w-5" />;
};

export default function ProgressTimeline({ events, loading }) {
    if (!events || events.length === 0) return null;

    return (
        <div className="glass-panel rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-200 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Research Progress
                </h2>
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {loading ? "Active" : "Completed"}
                </span>
            </div>

            <div className="relative space-y-8 pl-2">
                {/* Vertical Line */}
                <div className="absolute left-[1.65rem] top-4 bottom-4 w-px bg-slate-800/50" />

                {events.map((ev, i) => {
                    const isDone = ev.event === "done";
                    const isError = ev.event === "error";

                    return (
                        <div key={i} className="relative flex gap-4 group animate-in slide-in-from-bottom-2 duration-500 fill-mode-backwards" style={{ animationDelay: `${i * 100}ms` }}>
                            {/* Icon Bubble */}
                            <div
                                className={`
                                    relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 
                                    transition-all duration-500
                                    ${isDone
                                        ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                                        : isError
                                            ? "bg-red-500/10 border-red-500/50 text-red-400"
                                            : "bg-slate-900 border-slate-700 text-slate-400 group-hover:border-blue-500/50 group-hover:text-blue-400"
                                    }
                                `}
                            >
                                {isDone ? <CheckCircle2 className="h-6 w-6" /> : getIconForEvent(ev.event)}
                            </div>

                            {/* Content Card */}
                            <div className="flex-1 min-w-0 py-1">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-bold tracking-wide uppercase ${isDone ? "text-emerald-400" : "text-blue-400"}`}>
                                            {ev.event}
                                        </span>
                                        <span className="text-xs text-slate-600">
                                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-slate-300 text-base leading-relaxed">
                                        {ev.message}
                                    </p>
                                    {ev.step && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-400 w-fit mt-1">
                                            Step {ev.step}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
