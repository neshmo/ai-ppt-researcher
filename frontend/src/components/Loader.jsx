import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4 py-8">
            <div className="relative w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                    initial={{ width: "0%", x: "-100%" }}
                    animate={{
                        width: ["0%", "50%", "100%"],
                        x: ["-100%", "0%", "100%"]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }}></div>
            </div>

            <motion.p
                className="text-xs font-medium text-slate-400 uppercase tracking-widest"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Orchestrating AI Agents...
            </motion.p>
        </div>
    );
}
