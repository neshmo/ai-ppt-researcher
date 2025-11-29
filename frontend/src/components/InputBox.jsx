import React, { useState } from "react";
import { ArrowRight, Sparkles, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { getReadableTextColor, hexToRgba } from "../utils/colors";
import TopicSuggestions from "./TopicSuggestions";

export default function InputBox({ value, onChange, onGenerate, loading }) {
    const [isFocused, setIsFocused] = useState(false);
    const { themeConfig } = useTheme();

    // Determine readable text color based on the theme's background color
    // We assume the input box will have a semi-transparent background matching the theme
    const inputBgColor = themeConfig.background_color;
    const textColor = getReadableTextColor(inputBgColor);
    const placeholderColor = hexToRgba(textColor, 0.5);
    const iconColor = isFocused ? themeConfig.brand_primary : hexToRgba(textColor, 0.7);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !loading) {
            onGenerate();
        }
    };

    const handleSelectSuggestion = (suggestion) => {
        if (suggestion) {
            onChange(suggestion);
            // Optional: Auto-generate or just fill? User said "fill the search input".
            // We'll just fill it and keep focus.
        }
        setIsFocused(false); // Close suggestions
    };

    return (
        <div className="w-full max-w-3xl mx-auto relative z-20">
            {/* Glow Effect - Preserved */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-2xl opacity-30 blur-xl transition duration-500 group-hover:opacity-50"></div>

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`
                    relative glass-panel rounded-2xl p-2 sm:p-3 flex flex-col sm:flex-row items-center gap-3 transition-all duration-300
                    ${isFocused ? 'ring-2 ring-blue-500/30 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.15)]' : 'border-white/10'}
                `}
                style={{
                    borderRadius: `${themeConfig.corner_radius}px`,
                    // Override glass-panel background to match theme tint, ensuring text contrast logic holds
                    backgroundColor: hexToRgba(inputBgColor, 0.4)
                }}
            >
                {/* Input Container */}
                <div className="relative flex-1 w-full h-14 sm:h-16 group overflow-visible">

                    {/* Icon */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                        <motion.div
                            animate={{
                                color: iconColor,
                                scale: isFocused ? 1.1 : 1
                            }}
                        >
                            {loading ? (
                                <Sparkles className="h-5 w-5 animate-pulse" />
                            ) : (
                                <Search className="h-5 w-5" />
                            )}
                        </motion.div>
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        id="topic-input"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        // Delay blur to allow clicking suggestions
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        disabled={loading}
                        className="block w-full h-full pl-12 pr-4 bg-transparent border-none focus:ring-0 text-lg font-medium transition-all duration-300"
                        placeholder="Type a topic to research..."
                        style={{
                            display: 'block',
                            position: 'relative',
                            lineHeight: 'normal',
                            fontFamily: themeConfig.font_family,
                            color: textColor,
                            '--placeholder-color': placeholderColor
                        }}
                        autoComplete="off"
                    />
                    {/* Style tag for placeholder since inline styles don't support pseudo-elements directly */}
                    <style>{`
                        #topic-input::placeholder {
                            color: ${placeholderColor};
                            opacity: 1;
                        }
                    `}</style>

                    {/* Topic Suggestions */}
                    <TopicSuggestions
                        query={value}
                        isVisible={isFocused}
                        onSelect={handleSelectSuggestion}
                    />
                </div>

                {/* Action Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onGenerate}
                    disabled={loading || !value.trim()}
                    className={`
                        w-full sm:w-auto px-8 py-4 sm:h-16 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300 shrink-0
                        ${loading || !value.trim()
                            ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed border border-white/5'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/25 border border-white/10'
                        }
                    `}
                    style={{
                        fontFamily: themeConfig.font_family,
                        borderRadius: `${themeConfig.corner_radius}px`
                    }}
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.span
                                key="loading"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2"
                            >
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                </span>
                                Analyzing...
                            </motion.span>
                        ) : (
                            <motion.span
                                key="idle"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2"
                            >
                                Start Research <ArrowRight className="h-5 w-5" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.div>
        </div>
    );
}
