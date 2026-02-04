import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";

// Noreum Design System
const COLORS = {
  primary: "#3B82F6",
  background: "#0F172A",
  sidebar: "#1E293B",
  foreground: "#F8FAFC",
  muted: "#64748B",
  success: "#22C55E",
  warning: "#F59E0B",
  destructive: "#EF4444",
  border: "#334155",
};

export const Scene2Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === PHASE 1: Show the real dashboard screenshot (Frame 0-100) ===

  // Screenshot fade in
  const screenshotOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle zoom on screenshot
  const screenshotScale = interpolate(frame, [0, 100], [1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screenshot fades to background when elements appear
  const screenshotToBackground = interpolate(frame, [100, 130], [1, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const screenshotBlur = interpolate(frame, [100, 130], [0, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === PHASE 2: Animated elements appear (Frame 100+) ===

  // Sidebar animation
  const sidebarProgress = spring({
    frame: frame - 100,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const sidebarX = interpolate(Math.min(Math.max(sidebarProgress, 0), 1), [0, 1], [-220, 0]);
  const sidebarOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleOpacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Risk card animation
  const cardProgress = spring({
    frame: frame - 120,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const cardScale = interpolate(Math.min(Math.max(cardProgress, 0), 1), [0, 1], [0.9, 1]);
  const cardOpacity = interpolate(frame, [120, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Risk index counter animation (Frame 140-200)
  const counterValue = interpolate(frame, [145, 200], [0, 48.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barProgress = interpolate(frame, [145, 200], [0, 0.481], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge animation
  const badgeOpacity = interpolate(frame, [190, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Highlight effect on risk card
  const highlightOpacity = frame > 210
    ? interpolate(Math.sin((frame - 210) * 0.15), [-1, 1], [0, 0.2])
    : 0;

  // Smooth fade out
  const fadeOut = interpolate(frame, [235, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in at start
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Showing software" indicator
  const indicatorOpacity = interpolate(frame, [20, 40, 80, 100], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* === PHASE 1: Full Dashboard Screenshot === */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: screenshotOpacity * screenshotToBackground,
          transform: `scale(${screenshotScale})`,
          filter: `blur(${screenshotBlur}px)`,
        }}
      >
        <Img
          src={staticFile("screen-dashboard.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Software indicator badge */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full"
        style={{
          opacity: indicatorOpacity,
          backgroundColor: `${COLORS.primary}20`,
          border: `1px solid ${COLORS.primary}50`,
          backdropFilter: "blur(10px)",
        }}
      >
        <span
          className="text-lg font-medium"
          style={{ color: COLORS.primary }}
        >
          Dashboard Noreum
        </span>
      </div>

      {/* === PHASE 2: Animated Elements === */}

      {/* Animated Sidebar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-56"
        style={{
          backgroundColor: COLORS.sidebar,
          transform: `translateX(${sidebarX}px)`,
          borderRight: `1px solid ${COLORS.border}`,
          opacity: sidebarOpacity,
        }}
      >
        {/* Logo */}
        <div className="p-5 flex items-center gap-3">
          <Img
            src={staticFile("noreum-logo.png")}
            style={{ width: 36, height: 36 }}
          />
          <span
            className="text-lg font-bold"
            style={{ color: COLORS.foreground }}
          >
            NOREUM
          </span>
        </div>

        {/* Menu */}
        <div className="px-3 mt-4 space-y-1">
          {[
            { name: "Dashboard", active: true },
            { name: "NR-1", active: false },
            { name: "Canal de Denúncias", active: false },
          ].map((item, i) => (
            <div
              key={i}
              className="px-4 py-3 rounded-lg flex items-center gap-3"
              style={{
                backgroundColor: item.active ? `${COLORS.primary}20` : "transparent",
                color: item.active ? COLORS.primary : COLORS.muted,
              }}
            >
              <div
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: item.active ? COLORS.primary : COLORS.muted,
                }}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="absolute left-60 right-8 top-8"
        style={{ opacity: titleOpacity }}
      >
        {/* Title */}
        <div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: COLORS.foreground }}
          >
            Dashboard Noreum
          </h1>
          <p style={{ color: COLORS.muted }}>
            Análise detalhada das respostas NR-1
          </p>
        </div>

        {/* Risk Index Card */}
        <div
          className="mt-8 rounded-2xl p-8 relative overflow-hidden"
          style={{
            backgroundColor: COLORS.sidebar,
            border: `1px solid ${COLORS.border}`,
            maxWidth: 600,
            opacity: cardOpacity,
            transform: `scale(${cardScale})`,
          }}
        >
          {/* Highlight Glow */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: COLORS.warning,
              opacity: highlightOpacity,
            }}
          />

          <div className="relative z-10">
            <h2
              className="text-xl font-semibold mb-6"
              style={{ color: COLORS.foreground }}
            >
              Índice Geral de Risco
            </h2>

            <div className="flex items-end gap-6 mb-6">
              {/* Counter */}
              <span
                className="text-7xl font-bold"
                style={{
                  color: COLORS.warning,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {counterValue.toFixed(1)}
              </span>

              {/* Badge */}
              <div
                className="px-4 py-2 rounded-full mb-3"
                style={{
                  opacity: badgeOpacity,
                  backgroundColor: `${COLORS.warning}20`,
                  border: `1px solid ${COLORS.warning}50`,
                }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: COLORS.warning }}
                >
                  Risco Moderado
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div
                className="h-4 rounded-full overflow-hidden"
                style={{ backgroundColor: COLORS.border }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${barProgress * 100}%`,
                    background: `linear-gradient(90deg, ${COLORS.destructive}, ${COLORS.warning}, ${COLORS.success})`,
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 0%",
                  }}
                />
              </div>

              {/* Scale Labels */}
              <div className="flex justify-between text-xs">
                <span style={{ color: COLORS.destructive }}>0.0 - Alto Risco</span>
                <span style={{ color: COLORS.warning }}>4.0 - Risco Moderado</span>
                <span style={{ color: COLORS.success }}>7.0 - Baixo Risco</span>
                <span style={{ color: COLORS.muted }}>10.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Label */}
      <div
        className="absolute bottom-12 left-60"
        style={{ opacity: badgeOpacity }}
      >
        <p
          className="text-2xl font-light"
          style={{ color: COLORS.primary }}
        >
          Índice Geral: <strong>48.1</strong> (Risco Moderado)
        </p>
      </div>
    </AbsoluteFill>
  );
};
