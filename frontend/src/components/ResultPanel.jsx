import React from "react";
import { Download, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultPanel({ pptUrl }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="w-full max-w-2xl mx-auto"
        >
            <div className="relative group">
                {/* Outer glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-30 blur-xl transition duration-500 group-hover:opacity-50"></div>

                <div className="relative glass-panel rounded-2xl p-8 sm:p-10 text-center overflow-hidden">

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center">

                        {/* Success Icon Animation */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                            className="h-20 w-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)] border border-emerald-500/20"
                        >
                            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight"
                        >
                            Research Complete
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-slate-400 max-w-md mx-auto mb-10 text-lg leading-relaxed"
                        >
                            Your comprehensive research report and presentation have been generated successfully.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                        >
                            {/* Download Button */}
                            <a
                                href={pptUrl}
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 
                                           bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 
                                           text-white font-bold rounded-xl transition-all duration-300 
                                           shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                            >
                                <Download className="h-5 w-5" />
                                <span>Download PPT</span>
                                <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

