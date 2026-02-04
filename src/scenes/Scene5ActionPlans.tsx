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

// Action plan text (typed out)
const ACTION_PLAN_TEXT = "Implementar programa de apoio psicológico imediato, oferecer suporte individualizado para colaboradores em alto risco, criar canal de acolhimento psicológico, promover ações de redução de estresse no ambiente de trabalho, considerar avaliação médica ocupacional e implementar políticas de prevenção de burnout e transtornos mentais relacionados ao trabalho.";

export const Scene5ActionPlans: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Card slide in
  const cardProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const cardY = interpolate(Math.min(cardProgress, 1), [0, 1], [50, 0]);

  // Typing effect for action plan (Frame 80-250)
  const charsToShow = Math.floor(
    interpolate(frame, [80, 250], [0, ACTION_PLAN_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Risk badge animation
  const badgeOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Highlight animation
  const highlightOpacity = interpolate(frame, [250, 270], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(frame, [295, 300], [1, 0], {
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
          Plano de Ação Sugerido
        </h1>
        <p style={{ color: COLORS.muted }}>
          Blindagem Jurídica e Bem-estar
        </p>
      </div>

      {/* Main Card - Área Técnica */}
      <div
        className="absolute left-16 right-16 top-36"
        style={{
          opacity: Math.max(cardProgress, 0),
          transform: `translateY(${cardY}px)`,
        }}
      >
        {/* Critical Risk Section */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            backgroundColor: `${COLORS.destructive}10`,
            border: `1px solid ${COLORS.destructive}30`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke={COLORS.destructive}
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2
              className="text-xl font-semibold"
              style={{ color: COLORS.destructive }}
            >
              Área Técnica - Riscos Críticos
            </h2>
          </div>

          <p
            className="text-sm mb-4"
            style={{ color: COLORS.muted }}
          >
            Domínios que requerem ação imediata devido ao alto nível de risco identificado
          </p>

          {/* Saúde Mental Card */}
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: COLORS.sidebar,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-lg font-semibold"
                style={{ color: COLORS.foreground }}
              >
                Saúde Mental – GAD-7
              </h3>
              <span
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${COLORS.destructive}20`,
                  color: COLORS.destructive,
                  opacity: badgeOpacity,
                }}
              >
                35.7% - Alto Risco
              </span>
            </div>

            <p
              className="text-sm mb-4"
              style={{ color: COLORS.muted }}
            >
              O índice de Saúde Mental (GAD-7 adaptado) está em nível crítico, indicando alto risco de sofrimento psíquico relacionado à ansiedade.
            </p>

            {/* Action Plan Box */}
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: `${COLORS.warning}10`,
                border: `1px solid ${COLORS.warning}30`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke={COLORS.warning}
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
                </svg>
                <span
                  className="font-medium"
                  style={{ color: COLORS.warning }}
                >
                  Plano de ação sugerido:
                </span>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: COLORS.foreground }}
              >
                {ACTION_PLAN_TEXT.substring(0, charsToShow)}
                {charsToShow < ACTION_PLAN_TEXT.length && (
                  <span
                    className="inline-block w-0.5 h-4 ml-1"
                    style={{
                      backgroundColor: COLORS.warning,
                      opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                    }}
                  />
                )}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Screenshot Reference */}
      <div
        className="absolute bottom-8 right-8 rounded-xl overflow-hidden"
        style={{
          opacity: highlightOpacity * 0.6,
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        <Img
          src={staticFile("screen-analysis.png")}
          style={{
            width: 400,
            height: "auto",
            borderRadius: 12,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
