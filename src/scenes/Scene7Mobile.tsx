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

export const Scene7Mobile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phone entrance
  const phoneProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const phoneScale = interpolate(Math.min(phoneProgress, 1), [0, 1], [0.8, 1]);

  // Selfie scan animation (Frame 40-120)
  const scanY = frame > 40 && frame < 120
    ? interpolate((frame - 40) % 30, [0, 15, 30], [0, 120, 0])
    : 0;

  const scanSuccess = frame > 120;

  // Success checkmark
  const checkProgress = spring({
    frame: frame - 125,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // GAD-7 sliders animation (Frame 160-260)
  const slidersVisible = frame > 160;
  const sliderValues = [
    interpolate(frame, [170, 200], [0, 7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [185, 215], [0, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [200, 230], [0, 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  ];

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
          Coleta 100% Digital
        </h1>
        <p style={{ color: COLORS.muted }}>
          Validação Biométrica
        </p>
      </div>

      {/* Mobile Phone */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate(-50%, -50%) scale(${phoneScale})`,
          opacity: Math.max(phoneProgress, 0),
        }}
      >
        {/* Phone Glow */}
        <div
          className="absolute inset-0 rounded-[50px]"
          style={{
            backgroundColor: scanSuccess ? COLORS.success : COLORS.primary,
            filter: "blur(40px)",
            opacity: 0.3,
            transform: "scale(1.1)",
          }}
        />

        {/* Phone Frame */}
        <div
          className="relative w-72 h-[580px] rounded-[50px] overflow-hidden"
          style={{
            backgroundColor: COLORS.sidebar,
            border: `6px solid ${COLORS.border}`,
            boxShadow: scanSuccess
              ? `0 0 60px ${COLORS.success}40`
              : `0 0 60px ${COLORS.primary}30`,
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 rounded-full z-20"
            style={{ backgroundColor: COLORS.background }}
          />

          {/* Screen Content */}
          <div className="absolute inset-0 pt-14 px-5 pb-8">
            {/* Header */}
            <div className="text-center mb-4">
              <p
                className="text-xs font-bold tracking-wider"
                style={{ color: COLORS.primary }}
              >
                NOREUM
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: COLORS.foreground }}
              >
                {slidersVisible ? "Questionário GAD-7" : "Validação Biométrica"}
              </p>
            </div>

            {/* Selfie Section (Frame 0-160) */}
            {!slidersVisible && (
              <div className="flex flex-col items-center">
                {/* Selfie Frame */}
                <div
                  className="relative w-44 h-52 rounded-2xl overflow-hidden mb-4"
                  style={{
                    backgroundColor: COLORS.background,
                    border: `2px solid ${scanSuccess ? COLORS.success : COLORS.primary}40`,
                  }}
                >
                  {/* Face Silhouette */}
                  <svg
                    className="absolute inset-0 w-full h-full p-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={scanSuccess ? COLORS.success : COLORS.muted}
                    strokeWidth="0.8"
                  >
                    <circle cx="12" cy="9" r="4" />
                    <path d="M18 20v-1a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v1" />
                  </svg>

                  {/* Scan Line */}
                  {!scanSuccess && frame > 40 && (
                    <div
                      className="absolute left-0 right-0 h-1"
                      style={{
                        top: scanY,
                        background: `linear-gradient(90deg, transparent, ${COLORS.primary}, transparent)`,
                        boxShadow: `0 0 15px ${COLORS.primary}`,
                      }}
                    />
                  )}

                  {/* Success Overlay */}
                  {scanSuccess && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        opacity: Math.min(checkProgress, 1),
                        transform: `scale(${Math.min(checkProgress, 1)})`,
                      }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${COLORS.success}30` }}
                      >
                        <svg
                          className="w-10 h-10"
                          fill="none"
                          stroke={COLORS.success}
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Corner Brackets */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: scanSuccess ? COLORS.success : COLORS.primary }} />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: scanSuccess ? COLORS.success : COLORS.primary }} />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: scanSuccess ? COLORS.success : COLORS.primary }} />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: scanSuccess ? COLORS.success : COLORS.primary }} />
                </div>

                {/* Status Text */}
                <p
                  className="text-sm font-medium text-center"
                  style={{ color: scanSuccess ? COLORS.success : COLORS.muted }}
                >
                  {scanSuccess ? "Selfie validada com sucesso!" : "Posicione seu rosto no quadro"}
                </p>

                {/* Selfie Badge */}
                <div
                  className="mt-4 px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: `${COLORS.primary}20`,
                    border: `1px solid ${COLORS.primary}40`,
                  }}
                >
                  <span
                    className="text-xs font-medium"
                    style={{ color: COLORS.primary }}
                  >
                    Selfie Obrigatória
                  </span>
                </div>
              </div>
            )}

            {/* GAD-7 Sliders (Frame 160+) */}
            {slidersVisible && (
              <div className="space-y-5 mt-2">
                {[
                  "Sentindo-se nervoso(a) ou ansioso(a)?",
                  "Não conseguindo parar de se preocupar?",
                  "Tendo dificuldade para relaxar?",
                ].map((question, i) => (
                  <div key={i} className="space-y-2">
                    <p
                      className="text-xs"
                      style={{ color: COLORS.foreground }}
                    >
                      {question}
                    </p>

                    {/* Slider */}
                    <div className="relative">
                      <div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: COLORS.border }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(sliderValues[i] / 10) * 100}%`,
                            backgroundColor: COLORS.primary,
                          }}
                        />
                      </div>

                      {/* Thumb */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
                        style={{
                          left: `calc(${(sliderValues[i] / 10) * 100}% - 10px)`,
                          backgroundColor: COLORS.foreground,
                          boxShadow: `0 0 10px ${COLORS.primary}`,
                        }}
                      />
                    </div>

                    {/* Value */}
                    <div className="flex justify-between text-xs">
                      <span style={{ color: COLORS.muted }}>0</span>
                      <span
                        className="font-bold"
                        style={{ color: COLORS.primary }}
                      >
                        {Math.round(sliderValues[i])}
                      </span>
                      <span style={{ color: COLORS.muted }}>10</span>
                    </div>
                  </div>
                ))}

                {/* Submit Button */}
                <div
                  className="mt-6 py-3 rounded-xl text-center"
                  style={{
                    backgroundColor: COLORS.primary,
                    opacity: frame > 240 ? 1 : 0.5,
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: COLORS.foreground }}
                  >
                    Enviar Respostas
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div
        className="absolute bottom-20 left-16 right-16 flex justify-center gap-12"
        style={{ opacity: titleOpacity }}
      >
        {[
          { icon: "🔒", text: "100% Anônimo" },
          { icon: "📱", text: "Mobile First" },
          { icon: "✓", text: "Biometria" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-2xl">{item.icon}</span>
            <span style={{ color: COLORS.muted }}>{item.text}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
