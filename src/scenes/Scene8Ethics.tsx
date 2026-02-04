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

export const Scene8Ethics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Cards animation
  const cardProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 18, stiffness: 60 },
  });

  // Link highlight
  const linkHighlight = frame > 80 && frame < 120
    ? interpolate(Math.sin((frame - 80) * 0.2), [-1, 1], [0, 0.3])
    : 0;

  // Table row animation
  const rowOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Status badge pulse
  const statusPulse = frame > 140
    ? interpolate(Math.sin((frame - 140) * 0.25), [-1, 1], [1, 1.1])
    : 1;

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
        className="absolute top-12 left-16"
        style={{ opacity: titleOpacity }}
      >
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: COLORS.foreground }}
        >
          Canal de Denúncias
        </h1>
        <p style={{ color: COLORS.muted }}>
          Blindagem Ética e Jurídica
        </p>
      </div>

      {/* Main Content */}
      <div
        className="absolute left-16 right-16 top-40"
        style={{ opacity: Math.max(cardProgress, 0) }}
      >
        {/* Public Link Card */}
        <div
          className="rounded-2xl p-6 mb-6 relative overflow-hidden"
          style={{
            backgroundColor: COLORS.sidebar,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          {/* Highlight Glow */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: COLORS.primary,
              opacity: linkHighlight,
            }}
          />

          <div className="relative z-10">
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: COLORS.foreground }}
            >
              Link Público do Canal
            </h2>
            <p
              className="text-sm mb-4"
              style={{ color: COLORS.muted }}
            >
              Compartilhe este link com seus colaboradores para que possam fazer denúncias anônimas
            </p>

            <div className="flex items-center gap-4">
              <div
                className="flex-1 px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: COLORS.background,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <span
                  className="text-sm"
                  style={{ color: COLORS.muted }}
                >
                  https://noreum-frontend.onrender.com/denuncia/5880da9d-bcff-41a5-b732-c902dd81a887
                </span>
              </div>

              <button
                className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium"
                style={{
                  backgroundColor: `${COLORS.foreground}10`,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.foreground,
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copiar
              </button>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: COLORS.sidebar,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div className="p-6 pb-4">
            <h2
              className="text-xl font-semibold mb-1"
              style={{ color: COLORS.foreground }}
            >
              Denúncias Recebidas
            </h2>
            <p
              className="text-sm"
              style={{ color: COLORS.primary }}
            >
              Todas as denúncias são anônimas e confidenciais
            </p>
          </div>

          {/* Table Header */}
          <div
            className="grid grid-cols-5 px-6 py-3"
            style={{
              backgroundColor: `${COLORS.foreground}05`,
              borderTop: `1px solid ${COLORS.border}`,
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            {["Data", "Assunto", "Email", "Status", "Ações"].map((header, i) => (
              <span
                key={i}
                className="text-sm font-semibold"
                style={{ color: COLORS.muted }}
              >
                {header}
              </span>
            ))}
          </div>

          {/* Table Row */}
          <div
            className="grid grid-cols-5 px-6 py-4 items-center"
            style={{ opacity: rowOpacity }}
          >
            <span style={{ color: COLORS.foreground }}>19/11/2025</span>
            <span style={{ color: COLORS.foreground }}>teste</span>
            <span style={{ color: COLORS.muted }}>Anônimo</span>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium w-fit"
              style={{
                backgroundColor: `${COLORS.warning}20`,
                color: COLORS.warning,
                transform: `scale(${statusPulse})`,
              }}
            >
              Aberta
            </span>
            <span
              className="flex items-center gap-2 text-sm font-medium cursor-pointer"
              style={{ color: COLORS.primary }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Detalhes
            </span>
          </div>
        </div>
      </div>

      {/* Screenshot Reference */}
      <div
        className="absolute bottom-8 right-8 rounded-xl overflow-hidden"
        style={{
          opacity: rowOpacity * 0.6,
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        <Img
          src={staticFile("screen-ethics-reports.png")}
          style={{
            width: 400,
            height: "auto",
            borderRadius: 12,
          }}
        />
      </div>

      {/* Security Badges */}
      <div
        className="absolute bottom-12 left-16 flex items-center gap-8"
        style={{ opacity: rowOpacity }}
      >
        {[
          { icon: "🔐", text: "Confidencial" },
          { icon: "👤", text: "Anônimo" },
          { icon: "⚖️", text: "Compliance" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: `${COLORS.success}10`,
              border: `1px solid ${COLORS.success}30`,
            }}
          >
            <span>{item.icon}</span>
            <span
              className="text-sm font-medium"
              style={{ color: COLORS.success }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
