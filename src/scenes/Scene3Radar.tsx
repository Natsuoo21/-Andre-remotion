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

// 8 NR-1 Domains
const DOMAINS = [
  { id: "D1", name: "Carga e Ambiente", score: 50.0 },
  { id: "D2", name: "Autonomia e Controle", score: 50.0 },
  { id: "D3", name: "Apoio da Chefia", score: 49.2 },
  { id: "D4", name: "Apoio dos Colegas", score: 49.4 },
  { id: "D5", name: "Relacionamento e Clima", score: 49.3 },
  { id: "D6", name: "Clareza de Papéis", score: 50.8 },
  { id: "D7", name: "Comunicação e Mudanças", score: 50.0 },
  { id: "D8", name: "Saúde Mental (GAD-7)", score: 33.3 },
];

export const Scene3Radar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Polygon animation (Frame 0-80)
  const polygonProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 40 },
  });

  // Title animation
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Labels animation
  const labelsOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse animation for each domain label
  const getPulse = (index: number) => {
    const startFrame = 90 + index * 8;
    if (frame >= startFrame && frame <= startFrame + 20) {
      return interpolate(frame, [startFrame, startFrame + 10, startFrame + 20], [1, 1.15, 1]);
    }
    return 1;
  };

  // Fade in
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [175, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Radar chart configuration
  const centerX = 960;
  const centerY = 480;
  const maxRadius = 200;
  const numDomains = DOMAINS.length;

  const getPoint = (index: number, value: number) => {
    const angle = (index * 360 / numDomains - 90) * (Math.PI / 180);
    const normalizedValue = value / 100;
    const r = maxRadius * normalizedValue * Math.min(polygonProgress, 1);
    return {
      x: centerX + Math.cos(angle) * r,
      y: centerY + Math.sin(angle) * r,
    };
  };

  const getLabelPoint = (index: number, distance: number = 1.35) => {
    const angle = (index * 360 / numDomains - 90) * (Math.PI / 180);
    return {
      x: centerX + Math.cos(angle) * maxRadius * distance,
      y: centerY + Math.sin(angle) * maxRadius * distance,
    };
  };

  const polygonPoints = DOMAINS
    .map((d, i) => {
      const point = getPoint(i, d.score);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Title */}
      <div
        className="absolute top-12 left-16"
        style={{ opacity: titleOpacity }}
      >
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: COLORS.foreground }}
        >
          Radar dos Domínios (0-100)
        </h1>
        <p style={{ color: COLORS.muted }}>
          Análise dos 8 pilares fundamentais da NR-1
        </p>
      </div>

      {/* Radar Chart */}
      <svg className="absolute inset-0" width="1920" height="1080">
        {/* Grid circles */}
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={maxRadius * scale}
            fill="none"
            stroke={COLORS.border}
            strokeWidth={1}
            opacity={0.4}
          />
        ))}

        {/* Grid lines */}
        {DOMAINS.map((_, i) => {
          const point = getLabelPoint(i, 1);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke={COLORS.border}
              strokeWidth={1}
              opacity={0.4}
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill={`${COLORS.primary}40`}
          stroke={COLORS.primary}
          strokeWidth={3}
          style={{
            filter: `drop-shadow(0 0 15px ${COLORS.primary}60)`,
          }}
        />

        {/* Data points */}
        {DOMAINS.map((d, i) => {
          const point = getPoint(i, d.score);
          const isLow = d.score < 40;

          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={6}
              fill={isLow ? COLORS.destructive : COLORS.primary}
              stroke={COLORS.foreground}
              strokeWidth={2}
            />
          );
        })}

        {/* Domain Labels */}
        {DOMAINS.map((d, i) => {
          const labelPoint = getLabelPoint(i, 1.45);
          const pulse = getPulse(i);
          const isLow = d.score < 40;

          return (
            <g
              key={`label-${i}`}
              opacity={labelsOpacity}
              transform={`translate(${labelPoint.x}, ${labelPoint.y}) scale(${pulse})`}
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            >
              <text
                x={0}
                y={-12}
                textAnchor="middle"
                fill={COLORS.foreground}
                fontSize="14"
                fontWeight="600"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {d.id}: {d.name}
              </text>
              <text
                x={0}
                y={10}
                textAnchor="middle"
                fill={isLow ? COLORS.destructive : COLORS.warning}
                fontSize="18"
                fontWeight="bold"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {d.score.toFixed(1)}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Screenshot Reference */}
      <div
        className="absolute bottom-12 right-12 rounded-xl overflow-hidden"
        style={{
          opacity: labelsOpacity * 0.9,
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          border: `2px solid ${COLORS.border}`,
        }}
      >
        <Img
          src={staticFile("screen-risk-index.png")}
          style={{
            width: 620,
            height: "auto",
            borderRadius: 12,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
