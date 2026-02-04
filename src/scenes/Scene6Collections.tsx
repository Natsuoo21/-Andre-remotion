import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
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

// Collection data
const COLLECTIONS = [
  { id: 1, name: "Coleta Q1 2025", responses: 847, status: "Concluída", date: "15/03/2025" },
  { id: 2, name: "Coleta Q2 2025", responses: 523, status: "Concluída", date: "20/06/2025" },
  { id: 3, name: "Coleta Q3 2025", responses: 612, status: "Concluída", date: "18/09/2025" },
  { id: 4, name: "Coleta Q4 2025", responses: 89, status: "Em Andamento", date: "10/12/2025" },
];

export const Scene6Collections: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Table animation
  const tableProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 18, stiffness: 60 },
  });

  // Cursor animation (Frame 80-120)
  const cursorVisible = frame > 80;
  const cursorX = interpolate(frame, [80, 110], [800, 950], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [80, 110], [400, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button click effect
  const buttonClick = frame > 115 && frame < 125;
  const buttonScale = buttonClick ? 0.95 : 1;

  // New row animation (Frame 130+)
  const newRowOpacity = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const newRowHighlight = frame > 130 && frame < 180
    ? interpolate(Math.sin((frame - 130) * 0.2), [-1, 1], [0, 0.3])
    : 0;

  // Fade in
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [205, 210], [1, 0], {
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
      {/* Title */}
      <div
        className="absolute top-12 left-16 right-16 flex items-center justify-between"
        style={{ opacity: titleOpacity }}
      >
        <div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: COLORS.foreground }}
          >
            Gestão NR-1
          </h1>
          <p style={{ color: COLORS.muted }}>
            Ciclos de Coleta Contínuos
          </p>
        </div>

        {/* New Collection Button */}
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.foreground,
            transform: `scale(${buttonScale})`,
            boxShadow: buttonClick ? `0 0 20px ${COLORS.primary}` : "none",
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nova Coleta
        </button>
      </div>

      {/* Collections Table */}
      <div
        className="absolute left-16 right-16 top-40"
        style={{ opacity: Math.max(tableProgress, 0) }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: COLORS.sidebar,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          {/* Table Header */}
          <div
            className="grid grid-cols-5 px-6 py-4"
            style={{
              backgroundColor: `${COLORS.foreground}05`,
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            {["Nome da Coleta", "Respostas", "Status", "Data", "Ações"].map((header, i) => (
              <span
                key={i}
                className="text-sm font-semibold"
                style={{ color: COLORS.muted }}
              >
                {header}
              </span>
            ))}
          </div>

          {/* Table Rows */}
          {COLLECTIONS.map((collection, index) => {
            const rowDelay = index * 0.1;
            const rowOpacity = interpolate(
              Math.max(tableProgress - rowDelay, 0),
              [0, 0.5],
              [0, 1],
              { extrapolateRight: "clamp" }
            );

            return (
              <div
                key={collection.id}
                className="grid grid-cols-5 px-6 py-4 items-center"
                style={{
                  opacity: rowOpacity,
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <span style={{ color: COLORS.foreground }}>{collection.name}</span>
                <span style={{ color: COLORS.foreground }}>{collection.responses}</span>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium w-fit"
                  style={{
                    backgroundColor: collection.status === "Concluída"
                      ? `${COLORS.success}20`
                      : `${COLORS.warning}20`,
                    color: collection.status === "Concluída"
                      ? COLORS.success
                      : COLORS.warning,
                  }}
                >
                  {collection.status}
                </span>
                <span style={{ color: COLORS.muted }}>{collection.date}</span>
                <span
                  className="text-sm font-medium cursor-pointer"
                  style={{ color: COLORS.primary }}
                >
                  Ver Detalhes
                </span>
              </div>
            );
          })}

          {/* New Row (Coleta #5) */}
          {frame > 130 && (
            <div
              className="grid grid-cols-5 px-6 py-4 items-center relative"
              style={{
                opacity: newRowOpacity,
              }}
            >
              {/* Highlight Glow */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: COLORS.primary,
                  opacity: newRowHighlight,
                }}
              />

              <span className="relative z-10" style={{ color: COLORS.foreground }}>
                Coleta #5
              </span>
              <span className="relative z-10" style={{ color: COLORS.foreground }}>
                0
              </span>
              <span
                className="relative z-10 px-3 py-1 rounded-full text-sm font-medium w-fit"
                style={{
                  backgroundColor: `${COLORS.primary}20`,
                  color: COLORS.primary,
                }}
              >
                Nova
              </span>
              <span className="relative z-10" style={{ color: COLORS.muted }}>
                Agora
              </span>
              <span
                className="relative z-10 text-sm font-medium"
                style={{ color: COLORS.primary }}
              >
                Configurar
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Animated Cursor */}
      {cursorVisible && frame < 130 && (
        <div
          className="absolute z-50 pointer-events-none"
          style={{
            left: cursorX,
            top: cursorY,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.79a.5.5 0 0 0-.85.42Z"
              fill="white"
              stroke="black"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}

      {/* Bottom Info */}
      <div
        className="absolute bottom-12 left-16"
        style={{ opacity: newRowOpacity }}
      >
        <p
          className="text-xl"
          style={{ color: COLORS.primary }}
        >
          Crie ciclos de coleta contínuos para monitorar a conformidade NR-1
        </p>
      </div>
    </AbsoluteFill>
  );
};
