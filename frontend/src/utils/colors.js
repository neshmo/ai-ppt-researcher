export function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function getReadableTextColor(bgColor) {
    const rgb = hexToRgb(bgColor);
    if (!rgb) return '#FFFFFF'; // Default to white if invalid

    // Calculate luminance
    // Formula: 0.299*R + 0.587*G + 0.114*B
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);

    // If luminance is high (bright background), return black. Else white.
    // Threshold 128 is standard, but can be tweaked.
    return luminance > 128 ? '#1A1A1A' : '#FFFFFF';
}

export function hexToRgba(hex, alpha = 1) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
