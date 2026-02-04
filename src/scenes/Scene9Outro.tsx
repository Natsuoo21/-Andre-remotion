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
  foreground: "#F8FAFC",
  muted: "#64748B",
  success: "#22C55E",
};

export const Scene9Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dashboard zoom out effect
  const dashboardOpacity = interpolate(frame, [0, 40], [0.4, 0], {
    extrapolateRight: "clamp",
  });

  const dashboardScale = interpolate(frame, [0, 40], [1.2, 0.8], {
    extrapolateRight: "clamp",
  });

  // Logo assembly from particles
  const particleProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 50 },
  });

  const logoOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = interpolate(frame, [40, 70], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glow pulse
  const glowPulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.3, 0.6]
  );

  // Tagline animation
  const taglineOpacity = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL animation
  const urlOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade
  const fadeOut = interpolate(frame, [145, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Fading Dashboard */}
      <div
        className="absolute inset-0"
        style={{
          opacity: dashboardOpacity,
          transform: `scale(${dashboardScale})`,
        }}
      >
        <Img
          src={staticFile("screen-dashboard.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 900,
          height: 900,
          background: `radial-gradient(circle, ${COLORS.primary}${Math.round(glowPulse * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
          opacity: glowPulse,
        }}
      />

      {/* Particles */}
      <ParticleAssembly progress={Math.min(particleProgress, 1)} />

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Logo */}
        <div
          className="relative mb-10"
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          {/* Logo Glow */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              backgroundColor: COLORS.primary,
              filter: "blur(60px)",
              opacity: glowPulse * 0.5,
              transform: "scale(1.5)",
            }}
          />

          {/* Logo Container */}
          <div className="relative flex items-center gap-8">
            <div
              className="rounded-2xl p-6 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.primary}40)`,
                border: `2px solid ${COLORS.primary}60`,
                boxShadow: `0 0 80px ${COLORS.primary}50`,
              }}
            >
              <Img
                src={staticFile("noreum-logo.png")}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                }}
              />
            </div>

            <span
              className="text-7xl font-bold tracking-wider"
              style={{
                color: COLORS.primary,
                textShadow: `0 0 60px ${COLORS.primary}80`,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              NOREUM
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-4xl font-light mb-6"
          style={{
            opacity: taglineOpacity,
            color: COLORS.foreground,
            textShadow: `0 0 30px ${COLORS.foreground}30`,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          Transformando Risco em Evidência.
        </p>

        {/* Subtitle */}
        <p
          className="text-xl mb-16"
          style={{
            opacity: taglineOpacity,
            color: COLORS.muted,
          }}
        >
          A tecnologia definitiva para a nova NR-1
        </p>

        {/* URL */}
        <p
          className="text-2xl tracking-widest"
          style={{
            opacity: urlOpacity,
            color: COLORS.muted,
          }}
        >
          noreum.com
        </p>

        {/* CTA Badge */}
        <div
          className="mt-10 px-10 py-5 rounded-full"
          style={{
            opacity: urlOpacity,
            background: `linear-gradient(135deg, ${COLORS.primary}30, ${COLORS.primary}10)`,
            border: `1px solid ${COLORS.primary}50`,
            boxShadow: `0 0 40px ${COLORS.primary}30`,
          }}
        >
          <span
            className="text-xl font-semibold"
            style={{ color: COLORS.primary }}
          >
            Gestão baseada em Evidências
          </span>
        </div>
      </div>

      {/* Corner Decorations */}
      {[
        { position: "top-8 left-8", border: "border-l-2 border-t-2", rounded: "rounded-tl-lg" },
        { position: "top-8 right-8", border: "border-r-2 border-t-2", rounded: "rounded-tr-lg" },
        { position: "bottom-8 left-8", border: "border-l-2 border-b-2", rounded: "rounded-bl-lg" },
        { position: "bottom-8 right-8", border: "border-r-2 border-b-2", rounded: "rounded-br-lg" },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.position} w-20 h-20 ${corner.border} ${corner.rounded}`}
          style={{
            borderColor: `${COLORS.primary}40`,
            opacity: urlOpacity,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const ParticleAssembly: React.FC<{ progress: number }> = ({ progress }) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      startX: (Math.random() - 0.5) * 800,
      startY: (Math.random() - 0.5) * 800,
      endX: (Math.random() - 0.5) * 100,
      endY: (Math.random() - 0.5) * 100,
      size: Math.random() * 5 + 2,
      delay: Math.random() * 0.4,
    }));
  }, []);

  if (progress >= 1) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((p, i) => {
        const particleProgress = Math.max(0, Math.min(1, (progress - p.delay) / (1 - p.delay)));
        const x = interpolate(particleProgress, [0, 1], [p.startX, p.endX]);
        const y = interpolate(particleProgress, [0, 1], [p.startY, p.endY]);
        const opacity = interpolate(particleProgress, [0, 0.5, 1], [0, 1, 0]);

        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              transform: `translate(${x}px, ${y}px)`,
              opacity,
              backgroundColor: COLORS.primary,
              boxShadow: `0 0 15px ${COLORS.primary}`,
            }}
          />
        );
      })}
    </div>
  );
};
