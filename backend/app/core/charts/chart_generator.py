import os
from typing import List, Dict, Any
import matplotlib.pyplot as plt

def _get_theme_colors(theme_config: Dict[str, Any] = None) -> Dict[str, str]:
    tc = theme_config or {}
    return {
        'primary': tc.get('brand_primary', '#38BDF8'),
        'secondary': tc.get('brand_secondary', '#818CF8'),
        'accent': tc.get('accent_color', '#F472B6'),
        'bg': tc.get('background_color', '#121212'),
        'text': tc.get('text_color', '#F0F0F0')
    }

def _setup_plot_style(theme_config: Dict[str, Any]):
    colors = _get_theme_colors(theme_config)
    # If background is light, use default style, else dark_background
    # Simple heuristic: if bg is white-ish, use default
    bg = colors['bg'].lower()
    if bg in ['#ffffff', '#fff', 'white']:
        plt.style.use('default')
    else:
        plt.style.use('dark_background')
    
    # Override specific params
    plt.rcParams['figure.facecolor'] = 'none' # Transparent figure
    plt.rcParams['axes.facecolor'] = 'none'   # Transparent axes
    plt.rcParams['text.color'] = colors['text']
    plt.rcParams['axes.labelcolor'] = colors['text']
    plt.rcParams['xtick.color'] = colors['text']
    plt.rcParams['ytick.color'] = colors['text']
    return colors

def _save_chart(fig, filename: str, output_dir: str) -> str:
    """Save figure as transparent PNG and return file path."""
    path = os.path.join(output_dir, filename)
    fig.savefig(path, transparent=True, bbox_inches='tight', dpi=100)
    plt.close(fig)
    return path

def generate_market_size_chart(data: Dict[str, float], output_dir: str, theme_config: Dict[str, Any]) -> str:
    colors = _setup_plot_style(theme_config)
    fig, ax = plt.subplots(figsize=(16, 9))
    years = list(data.keys())
    values = list(data.values())
    ax.plot(years, values, marker='o', color=colors['primary'], linewidth=4, markersize=10)
    ax.fill_between(years, values, color=colors['primary'], alpha=0.2)
    ax.set_title('Market Size Growth', fontsize=24, color=colors['primary'], pad=20)
    ax.tick_params(colors=colors['text'], labelsize=12)
    for i, v in enumerate(values):
        ax.text(i, v, f"{v}", ha='center', color=colors['text'])
    return _save_chart(fig, 'chart_market_size.png', output_dir)

def generate_market_share_chart(data: Dict[str, float], output_dir: str, theme_config: Dict[str, Any]) -> str:
    colors = _setup_plot_style(theme_config)
    fig, ax = plt.subplots(figsize=(16, 9))
    labels = list(data.keys())
    sizes = list(data.values())
    
    # Use theme colors for pie slices if possible, or fallback to a colormap
    # We can create a custom color list starting with primary, secondary, accent
    pie_colors = [colors['primary'], colors['secondary'], colors['accent']]
    # Fill rest with tab20
    import matplotlib.cm as cm
    if len(labels) > 3:
        extra_colors = cm.tab20.colors
        pie_colors.extend(extra_colors)
    
    ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=140, colors=pie_colors[:len(labels)],
           textprops={'color': colors['text']})
    ax.set_title('Market Share', fontsize=24, color=colors['primary'], pad=20)
    return _save_chart(fig, 'chart_market_share.png', output_dir)

def generate_growth_projection_chart(data: Dict[str, float], output_dir: str, theme_config: Dict[str, Any]) -> str:
    colors = _setup_plot_style(theme_config)
    fig, ax = plt.subplots(figsize=(16, 9))
    years = list(data.keys())
    values = list(data.values())
    ax.plot(years, values, marker='s', linestyle='--', color=colors['accent'], linewidth=4, markersize=10)
    ax.set_title('Growth Projection', fontsize=24, color=colors['primary'], pad=20)
    ax.tick_params(colors=colors['text'], labelsize=12)
    for i, v in enumerate(values):
        ax.text(i, v, f"{v}%", ha='center', color=colors['text'])
    return _save_chart(fig, 'chart_growth_projection.png', output_dir)

def generate_competitors_chart(data: Dict[str, float], output_dir: str, theme_config: Dict[str, Any]) -> str:
    colors = _setup_plot_style(theme_config)
    fig, ax = plt.subplots(figsize=(16, 9))
    companies = list(data.keys())
    scores = list(data.values())
    ax.bar(companies, scores, color=colors['secondary'])
    ax.set_title('Competitor Comparison', fontsize=24, color=colors['primary'], pad=20)
    ax.tick_params(colors=colors['text'], labelsize=12)
    for i, v in enumerate(scores):
        ax.text(i, v, f"{v}", ha='center', va='bottom', color=colors['text'])
    return _save_chart(fig, 'chart_competitors.png', output_dir)

def generate_trends_chart(data: Dict[str, float], output_dir: str, theme_config: Dict[str, Any]) -> str:
    colors = _setup_plot_style(theme_config)
    fig, ax = plt.subplots(figsize=(16, 9))
    trends = list(data.keys())
    impact = list(data.values())
    y_pos = range(len(trends))
    ax.barh(y_pos, impact, color=colors['primary'])
    ax.set_yticks(y_pos)
    ax.set_yticklabels(trends, fontsize=12)
    ax.invert_yaxis()
    ax.set_title('Key Trends Impact', fontsize=24, color=colors['primary'], pad=20)
    ax.tick_params(colors=colors['text'], labelsize=12)
    return _save_chart(fig, 'chart_trends.png', output_dir)

def generate_charts(slide_plan: Dict[str, Any], output_dir: str, theme_config: Dict[str, Any] = None) -> List[str]:
    """Generate all requested charts based on slide_plan['chart_data'].
    Returns list of file paths for the generated PNGs.
    """
    chart_data = slide_plan.get('chart_data', {})
    os.makedirs(output_dir, exist_ok=True)
    generated: List[str] = []
    
    # Ensure theme_config is not None
    theme_config = theme_config or {}

    try:
        if 'market_size' in chart_data:
            generated.append(generate_market_size_chart(chart_data['market_size'], output_dir, theme_config))
        if 'market_share' in chart_data:
            generated.append(generate_market_share_chart(chart_data['market_share'], output_dir, theme_config))
        if 'growth_projection' in chart_data:
            generated.append(generate_growth_projection_chart(chart_data['growth_projection'], output_dir, theme_config))
        if 'competitors' in chart_data:
            generated.append(generate_competitors_chart(chart_data['competitors'], output_dir, theme_config))
        if 'trends' in chart_data:
            generated.append(generate_trends_chart(chart_data['trends'], output_dir, theme_config))
    except Exception as e:
        print(f"[ChartGenerator] Error generating charts: {e}")
    return generated
