import React from "react";

/**
 * ChartPreviewGrid – displays a responsive grid of chart image thumbnails.
 * Each chart path is a URL (served from the backend static files directory).
 * The component uses simple inline styles to achieve a premium look without external CSS.
 */
export default function ChartPreviewGrid({ charts }) {
    if (!charts || charts.length === 0) return null;

    const containerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1rem",
        marginTop: "1.5rem",
    };

    const cardStyle = {
        position: "relative",
        borderRadius: "0.75rem",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        border: "2px solid rgba(56, 189, 248, 0.2)", // accent glow
        transition: "transform 0.3s, box-shadow 0.3s",
    };

    const imgStyle = {
        width: "100%",
        height: "auto",
        display: "block",
        backgroundColor: "#121212",
    };

    const hoverStyle = {
        transform: "scale(1.03)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
    };

    return (
        <div style={containerStyle}>
            {charts.map((src, idx) => (
                <div
                    key={idx}
                    style={cardStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform: "scale(1)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" })}
                >
                    <img src={src} alt={`Chart ${idx + 1}`} style={imgStyle} />
                </div>
            ))}
        </div>
    );
}
