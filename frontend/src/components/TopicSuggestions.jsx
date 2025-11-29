import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { hexToRgba, getReadableTextColor } from '../utils/colors';

// Mock suggestions for now
const MOCK_TRENDING = [
    "Artificial Intelligence in Healthcare",
    "Sustainable Energy Solutions 2025",
    "Future of Remote Work",
    "Quantum Computing Breakthroughs",
    "Global Economic Outlook"
];

export default function TopicSuggestions({ query, onSelect, isVisible }) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const { themeConfig } = useTheme();

    // Debounced fetch
    useEffect(() => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                // In a real app, fetch from /api/suggest?query=${query}
                // await fetch(`/api/suggest?query=${encodeURIComponent(query)}`);

                // Simulating API delay and response
                await new Promise(resolve => setTimeout(resolve, 300));

                // Filter mock trending + add some dynamic ones based on query
                const filtered = MOCK_TRENDING.filter(t =>
                    t.toLowerCase().includes(query.toLowerCase())
                );

                // Add "AI refined" suggestions
                const aiSuggestions = [
                    `Impact of ${query} on Global Markets`,
                    `History and Evolution of ${query}`,
                    `Key Challenges in ${query}`
                ];

                setSuggestions([...filtered, ...aiSuggestions].slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            } finally {
                setLoading(false);
            }
        }, 250);

        return () => clearTimeout(timer);
    }, [query]);

    // Keyboard navigation
    useEffect(() => {
        if (!isVisible || suggestions.length === 0) {
            setSelectedIndex(-1);
            return;
        }

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % suggestions.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                e.preventDefault();
                onSelect(suggestions[selectedIndex]);
            } else if (e.key === 'Escape') {
                onSelect(null); // Close
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, suggestions, selectedIndex, onSelect]);

    if (!isVisible || (suggestions.length === 0 && !loading)) return null;

    const bgColor = hexToRgba(themeConfig.background_color, 0.95);
    const textColor = getReadableTextColor(themeConfig.background_color);
    const accentColor = themeConfig.brand_primary;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-2xl border border-white/10 z-50 backdrop-blur-xl"
                style={{ backgroundColor: bgColor }}
            >
                {loading ? (
                    <div className="p-4 flex items-center gap-2 text-sm text-slate-400">
                        <Sparkles className="w-4 h-4 animate-pulse text-blue-400" />
                        Thinking...
                    </div>
                ) : (
                    <div className="py-2">
                        <div className="px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <TrendingUp className="w-3 h-3" />
                            Suggestions
                        </div>
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => onSelect(suggestion)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-3
                                    ${index === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'}
                                `}
                                style={{ color: index === selectedIndex ? accentColor : textColor }}
                            >
                                <Search className={`w-4 h-4 ${index === selectedIndex ? 'opacity-100' : 'opacity-50'}`} />
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
