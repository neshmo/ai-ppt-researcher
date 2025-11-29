import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText, PenTool, CheckCircle2, Circle } from "lucide-react";

const STEPS = [
    { id: 1, title: "Researching", icon: Search, keywords: ["search", "collect"] },
    { id: 2, title: "Analyzing", icon: FileText, keywords: ["analyze", "insight", "read"] },
    { id: 3, title: "Drafting", icon: PenTool, keywords: ["structure", "design", "slide", "draft"] },
    { id: 4, title: "Finalizing", icon: CheckCircle2, keywords: ["finalize", "ppt", "done"] },
];

export default function StepTracker({ events }) {
    // Determine current step based on latest event
    const latestEvent = events[events.length - 1]?.message?.toLowerCase() || "";
    const isResearchDone = events.some(e => e.event === "done");

    let currentStepIndex = 0;
    if (events.length > 0) {
        // Find the furthest step that matches the history
        const allMessages = events.map(e => e.message.toLowerCase()).join(" ");

        STEPS.forEach((step, index) => {
            if (step.keywords.some(k => allMessages.includes(k))) {
                currentStepIndex = index;
            }
        });

        // If "done" event exists, we are at the end
        if (isResearchDone) {
            currentStepIndex = STEPS.length - 1;
        }
    }

    return (
        <div className="glass-panel rounded-2xl p-6 w-full">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isResearchDone ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isResearchDone ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                </span>
                Live Progress
            </h3>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-[1.15rem] top-2 bottom-2 w-0.5 bg-slate-800/50 rounded-full" />

                <div className="space-y-6">
                    {STEPS.map((step, index) => {
                        const isCompleted = index < currentStepIndex;
                        const isCurrent = index === currentStepIndex;
                        const isUpcoming = index > currentStepIndex;

                        // Special handling for the final step when research is done
                        const isFinalStep = index === STEPS.length - 1;
                        const showAsDone = isFinalStep && isResearchDone;

                        // Dynamic styles and text
                        let stepTitle = step.title;
                        let statusText = "In Progress...";
                        let circleColor = "text-slate-600";
                        let bgColor = "rgba(30, 41, 59, 0.5)";
                        let borderColor = "rgba(71, 85, 105, 0.5)";
                        let shadow = "";

                        if (showAsDone) {
                            stepTitle = "Completed";
                            statusText = "Done";
                            circleColor = "text-emerald-400";
                            bgColor = "rgba(16, 185, 129, 0.1)";
                            borderColor = "rgba(16, 185, 129, 0.5)";
                            shadow = "shadow-[0_0_15px_rgba(16,185,129,0.3)]";
                        } else if (isCompleted) {
                            circleColor = "text-blue-400";
                            bgColor = "rgba(59, 130, 246, 0.1)";
                            borderColor = "rgba(59, 130, 246, 0.5)";
                        } else if (isCurrent) {
                            circleColor = "text-blue-400";
                            bgColor = "rgba(59, 130, 246, 0.1)";
                            borderColor = "rgba(59, 130, 246, 0.5)";
                            shadow = "shadow-[0_0_15px_rgba(59,130,246,0.3)]";
                        }

                        return (
                            <div key={step.id} className="relative flex items-center gap-4 z-10">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: (isCurrent || showAsDone) ? 1.1 : 1,
                                        backgroundColor: bgColor,
                                        borderColor: borderColor,
                                        boxShadow: shadow ? shadow.match(/shadow-\[(.*?)\]/)[1].replace(/_/g, " ") : "none" // Extract shadow value and fix format
                                    }}
                                    // Using className for shadow as framer-motion boxShadow animation can be tricky with tailwind classes
                                    className={`
                                        h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all duration-500
                                        ${circleColor} ${shadow}
                                    `}
                                >
                                    {isCompleted || showAsDone ? (
                                        <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                        <step.icon className="h-5 w-5" />
                                    )}
                                </motion.div>

                                <div className="flex-1">
                                    <h4 className={`text-sm font-semibold transition-colors duration-300 ${isUpcoming ? "text-slate-600" : "text-slate-200"}`}>
                                        {stepTitle}
                                    </h4>
                                    <AnimatePresence>
                                        {(isCurrent || showAsDone) && (
                                            <motion.p
                                                key={showAsDone ? "done" : "progress"}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className={`text-xs mt-0.5 font-medium ${showAsDone ? "text-emerald-400" : "text-blue-400"}`}
                                            >
                                                {statusText}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
