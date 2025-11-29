import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const THEME_PRESETS = {
    corporateBlue: {
        name: "Corporate Blue",
        brand_primary: '#0052CC',
        brand_secondary: '#172B4D',
        accent_color: '#00B8D9',
        text_color: '#172B4D',
        background_color: '#FFFFFF',
        font_family: 'Inter',
        corner_radius: 6
    },
    darkNeon: {
        name: "Dark Neon",
        brand_primary: '#00E5FF',
        brand_secondary: '#D500F9',
        accent_color: '#FFEA00',
        text_color: '#E0E0E0',
        background_color: '#0A0A0A',
        font_family: 'Roboto',
        corner_radius: 0
    },
    gradientPurple: {
        name: "Gradient Purple",
        brand_primary: '#7C3AED',
        brand_secondary: '#EC4899',
        accent_color: '#F59E0B',
        text_color: '#F3F4F6',
        background_color: '#111827',
        font_family: 'Lato',
        corner_radius: 16
    },
    minimalLight: {
        name: "Minimal Light",
        brand_primary: '#111827',
        brand_secondary: '#6B7280',
        accent_color: '#10B981',
        text_color: '#1F2937',
        background_color: '#F9FAFB',
        font_family: 'Inter',
        corner_radius: 8
    },
    consultingGrey: {
        name: "Consulting Grey",
        brand_primary: '#374151',
        brand_secondary: '#9CA3AF',
        accent_color: '#EF4444',
        text_color: '#111827',
        background_color: '#F3F4F6',
        font_family: 'Arial',
        corner_radius: 2
    }
};

export default function ThemeSelector() {
    const { themeConfig, setThemeConfig } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const applyPreset = (key) => {
        const preset = THEME_PRESETS[key];
        setThemeConfig(prev => ({
            ...prev,
            ...preset,
            // Don't override theme name if we want to keep tracking custom vs preset, 
            // but here we can just apply values.
        }));
    };

    const handleChange = (key, value) => {
        setThemeConfig(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-6">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium mx-auto mb-4"
            >
                <Palette className="w-4 h-4" />
                {isOpen ? "Hide Theme Settings" : "Customize Brand & Theme"}
                {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-8">

                            {/* Quick Themes */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Themes</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {Object.entries(THEME_PRESETS).map(([key, preset]) => (
                                        <button
                                            key={key}
                                            onClick={() => applyPreset(key)}
                                            className="group relative flex flex-col items-center gap-2 p-3 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all"
                                        >
                                            <div className="flex gap-1">
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.brand_primary }}></div>
                                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.brand_secondary }}></div>
                                                <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.background_color }}></div>
                                            </div>
                                            <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-200 text-center leading-tight">
                                                {preset.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-white/5 w-full"></div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Colors */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Brand Colors</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        <ColorInput label="Primary Brand" value={themeConfig.brand_primary} onChange={v => handleChange('brand_primary', v)} />
                                        <ColorInput label="Secondary Brand" value={themeConfig.brand_secondary} onChange={v => handleChange('brand_secondary', v)} />
                                        <ColorInput label="Accent Color" value={themeConfig.accent_color} onChange={v => handleChange('accent_color', v)} />
                                        <ColorInput label="Background" value={themeConfig.background_color} onChange={v => handleChange('background_color', v)} />
                                        <ColorInput label="Text Color" value={themeConfig.text_color} onChange={v => handleChange('text_color', v)} />
                                    </div>
                                </div>

                                {/* Typography & Shape */}
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Design System</h3>

                                    <div className="space-y-2">
                                        <label className="text-xs text-slate-400">Font Family</label>
                                        <select
                                            value={themeConfig.font_family}
                                            onChange={(e) => handleChange('font_family', e.target.value)}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none transition-all"
                                        >
                                            <option value="Inter">Inter</option>
                                            <option value="Roboto">Roboto</option>
                                            <option value="Lato">Lato</option>
                                            <option value="Arial">Arial</option>
                                            <option value="Calibri">Calibri</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-xs text-slate-400">Corner Radius</label>
                                            <span className="text-xs font-mono text-slate-500">{themeConfig.corner_radius}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="32"
                                            value={themeConfig.corner_radius}
                                            onChange={(e) => handleChange('corner_radius', parseInt(e.target.value))}
                                            className="w-full accent-blue-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function ColorInput({ label, value, onChange }) {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleHexChange = (e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        if (/^#[0-9A-F]{6}$/i.test(newValue)) {
            onChange(newValue);
        }
    };

    return (
        <div className="flex items-center gap-3 bg-slate-900/50 p-2.5 rounded-lg border border-white/5 hover:border-white/10 transition-colors group">
            <div className="relative overflow-hidden w-8 h-8 rounded-md ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 border-none cursor-pointer"
                />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5 truncate">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-xs select-none">#</span>
                    <input
                        type="text"
                        value={localValue.replace('#', '')}
                        onChange={(e) => handleHexChange({ target: { value: '#' + e.target.value } })}
                        className="text-xs font-mono text-slate-300 bg-transparent border-none focus:outline-none w-full uppercase p-0 placeholder-slate-700"
                        maxLength={6}
                        placeholder="000000"
                    />
                </div>
            </div>
        </div>
    );
}
