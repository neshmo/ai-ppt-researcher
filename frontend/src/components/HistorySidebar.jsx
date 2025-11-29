import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, X, Clock, Trash2, PlayCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { hexToRgba } from '../utils/colors';

const HISTORY_KEY = 'deepresearch_history';

export default function HistorySidebar({ onSelectTopic }) {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const { themeConfig } = useTheme();

    useEffect(() => {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, [isOpen]);

    const clearHistory = () => {
        localStorage.removeItem(HISTORY_KEY);
        setHistory([]);
    };

    const formatTimeAgo = (timestamp) => {
        const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    // Helper to add item to history (exported or used via event/context if needed, 
    // but for now we assume App.js updates localStorage or we expose a method. 
    // Actually, App.js should probably handle adding to history when generating.
    // We'll just read here.)

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed left-6 top-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full 
                bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all text-sm font-medium text-slate-300 hover:text-white group"
            >
                <History className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">History</span>
            </button>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 bottom-0 w-80 z-50 glass-panel border-r border-white/10 flex flex-col"
                        style={{ backgroundColor: hexToRgba(themeConfig.background_color, 0.95) }}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <History className="w-5 h-5 text-blue-400" />
                                Research History
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                            {history.length === 0 ? (
                                <div className="text-center text-slate-500 py-10 text-sm">
                                    No recent research topics.
                                </div>
                            ) : (
                                history.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                                        onClick={() => {
                                            onSelectTopic(item.topic);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-sm font-medium text-slate-200 line-clamp-2 group-hover:text-blue-300 transition-colors">
                                                {item.topic}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Clock className="w-3 h-3" />
                                            {formatTimeAgo(item.timestamp)}
                                        </div>

                                        {/* Hover Action */}
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="p-2 bg-blue-500/20 rounded-full text-blue-400">
                                                <PlayCircle className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {history.length > 0 && (
                            <div className="p-4 border-t border-white/10">
                                <button
                                    onClick={clearHistory}
                                    className="w-full py-3 flex items-center justify-center gap-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear History
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
