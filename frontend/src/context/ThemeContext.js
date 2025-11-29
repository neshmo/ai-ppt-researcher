import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const DEFAULT_THEME = {
    theme: 'dark',
    brand_primary: '#38BDF8',
    brand_secondary: '#818CF8',
    accent_color: '#F472B6',
    text_color: '#F0F0F0',
    background_color: '#121212',
    font_family: 'Inter',
    corner_radius: 12
};

export function ThemeProvider({ children }) {
    const [themeConfig, setThemeConfig] = useState(DEFAULT_THEME);

    return (
        <ThemeContext.Provider value={{ themeConfig, setThemeConfig }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
