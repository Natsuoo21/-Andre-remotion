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

// Domain columns
const DOMAINS = [
  "Carga e Ambiente",
  "Autonomia e Controle",
  "Apoio da Chefia",
  "Apoio dos Colegas",
  "Relacionamento e Clima",
  "Clareza de Papéis",
  "Comunicação e Mudanças",
  "Saúde Mental (GAD-7)",
];

// Sector data
const SECTORS = [
  {
    name: "RH",
    responses: 6,
    data: [
      { value: 50.0, risk: "Moderado" },
      { value: 50.0, risk: "Moderado" },
      { value: 49.2, risk: "Moderado" },
      { value: 49.4, risk: "Moderado" },
      { value: 49.3, risk: "Moderado" },
      { value: 50.8, risk: "Moderado" },
      { value: 50.0, risk: "Moderado" },
      { value: 33.3, risk: "Alto" },
    ],
  },
  {
    name: "Marketing",
    responses: 12,
    data: [
      { value: 62.5, risk: "Moderado" },
      { value: 58.3, risk: "Moderado" },
      { value: 45.0, risk: "Moderado" },
      { value: 67.2, risk: "Moderado" },
      { value: 55.8, risk: "Moderado" },
      { value: 71.4, risk: "Baixo" },
      { value: 48.9, risk: "Moderado" },
      { value: 42.1, risk: "Moderado" },
    ],
  },
  {
    name: "Financeiro",
    responses: 8,
    data: [
      { value: 38.5, risk: "Alto" },
      { value: 42.0, risk: "Moderado" },
      { value: 55.6, risk: "Moderado" },
      { value: 51.2, risk: "Moderado" },
      { value: 44.8, risk: "Moderado" },
      { value: 60.3, risk: "Moderado" },
      { value: 35.7, risk: "Alto" },
      { value: 28.9, risk: "Alto" },
    ],
  },
  {
    name: "Jurídico",
    responses: 4,
    data: [
      { value: 72.0, risk: "Baixo" },
      { value: 68.5, risk: "Moderado" },
      { value: 75.3, risk: "Baixo" },
      { value: 70.1, risk: "Baixo" },
      { value: 66.7, risk: "Moderado" },
      { value: 78.2, risk: "Baixo" },
      { value: 69.4, risk: "Moderado" },
      { value: 58.6, risk: "Moderado" },
    ],
  },
];

export const Scene4Heatmap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Grid animation
  const gridProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  // Critical cell highlight
  const criticalPulse = frame > 140
    ? interpolate(Math.sin((frame - 140) * 0.3), [-1, 1], [1, 1.05])
    : 1;

  const criticalGlow = frame > 140
    ? interpolate(Math.sin((frame - 140) * 0.3), [-1, 1], [0.3, 0.8])
    : 0;

  // Text overlays
  const overlayOpacity = interpolate(frame, [160, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [235, 240], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const getColor = (value: number) => {
    if (value < 40) return COLORS.destructive;
    if (value < 70) return COLORS.warning;
    return COLORS.success;
  };

  const cellWidth = 130;
  const cellHeight = 55;
  const gap = 3;
  const startX = 200;
  const startY = 220;
  const rowGap = 8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Title */}
      <div
        className="absolute top-8 left-16"
        style={{ opacity: titleOpacity }}
      >
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: COLORS.foreground }}
        >
          Heatmap Setores × Domínios
        </h1>
        <p style={{ color: COLORS.muted }}>
          Identificação de Riscos Críticos por Setor
        </p>
      </div>

      {/* Domain Labels (Header) */}
      <div
        className="absolute flex"
        style={{
          left: startX,
          top: startY - 50,
          opacity: Math.max(gridProgress, 0),
        }}
      >
        {DOMAINS.map((domain, i) => (
          <div
            key={i}
            className="text-center"
            style={{
              width: cellWidth + gap,
            }}
          >
            <p
              className="text-xs font-medium leading-tight"
              style={{
                color: i === 7 ? COLORS.destructive : COLORS.muted,
              }}
            >
              {domain}
            </p>
          </div>
        ))}
      </div>

      {/* Sectors Rows */}
      {SECTORS.map((sector, sectorIndex) => {
        const rowDelay = sectorIndex * 0.15;
        const rowOpacity = interpolate(
          Math.max(gridProgress - rowDelay, 0),
          [0, 0.5],
          [0, 1],
          { extrapolateRight: "clamp" }
        );

        return (
          <div key={sector.name} style={{ opacity: rowOpacity }}>
            {/* Sector Label */}
            <div
              className="absolute flex items-center gap-3"
              style={{
                left: startX - 120,
                top: startY + sectorIndex * (cellHeight + rowGap) + 10,
              }}
            >
              <div
                className="w-1 h-10 rounded"
                style={{ backgroundColor: COLORS.primary }}
              />
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: COLORS.foreground }}
                >
                  {sector.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: COLORS.primary }}
                >
                  {sector.responses} respostas
                </p>
              </div>
            </div>

            {/* Heatmap Cells */}
            <div
              className="absolute flex"
              style={{
                left: startX,
                top: startY + sectorIndex * (cellHeight + rowGap),
              }}
            >
              {sector.data.map((item, colIndex) => {
                const color = getColor(item.value);
                const isCritical = item.value < 40;
                const cellDelay = colIndex * 0.05 + rowDelay;
                const cellOpacity = interpolate(
                  Math.max(gridProgress - cellDelay, 0),
                  [0, 0.3],
                  [0, 1],
                  { extrapolateRight: "clamp" }
                );

                return (
                  <div
                    key={colIndex}
                    className="rounded-lg flex flex-col items-center justify-center"
                    style={{
                      width: cellWidth,
                      height: cellHeight,
                      marginRight: gap,
                      backgroundColor: color,
                      opacity: cellOpacity,
                      transform: isCritical ? `scale(${criticalPulse})` : "scale(1)",
                      boxShadow: isCritical
                        ? `0 0 20px ${COLORS.destructive}${Math.round(criticalGlow * 255).toString(16).padStart(2, '0')}`
                        : "none",
                      zIndex: isCritical ? 10 : 1,
                    }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: item.value < 50 ? COLORS.foreground : COLORS.background,
                      }}
                    >
                      {item.value.toFixed(1)}%
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        color: item.value < 50 ? `${COLORS.foreground}CC` : `${COLORS.background}CC`,
                      }}
                    >
                      {item.risk === "Alto" ? "Alto" : item.risk === "Baixo" ? "Baixo" : "Moderado"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Critical Alert */}
      {frame > 140 && (
        <div
          className="absolute flex items-center gap-4 px-5 py-3 rounded-xl"
          style={{
            right: 40,
            top: startY + 4 * (cellHeight + rowGap) + 20,
            backgroundColor: `${COLORS.destructive}15`,
            border: `1px solid ${COLORS.destructive}50`,
            opacity: overlayOpacity,
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS.destructive }}
          />
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: COLORS.destructive }}
            >
              Áreas Críticas Identificadas
            </p>
            <p className="text-xs" style={{ color: COLORS.muted }}>
              Financeiro e RH - Saúde Mental em Alto Risco
            </p>
          </div>
        </div>
      )}

      {/* Screenshot Reference */}
      <div
        className="absolute bottom-8 right-8 rounded-xl overflow-hidden"
        style={{
          opacity: overlayOpacity * 0.7,
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          border: `2px solid ${COLORS.border}`,
        }}
      >
        <Img
          src={staticFile("screen-heatmap.png")}
          style={{
            width: 450,
            height: "auto",
            borderRadius: 12,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
